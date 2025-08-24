"use client";

import { useState, useEffect, useCallback } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { supabase } from "@/lib/supabase";

interface Game {
  id: string;
  team1_id: string;
  team2_id: string;
  team1_name: string | null;
  team2_name: string | null;
  score1: number;
  score2: number;
  status: string;
  start_time: string | null;
  start_time_formatted: string;
  game_type: string;
  bracket_id: string | null;
  bracket_name: string | null;
  group_name: string | null;
  updated_by: string | null;
  updated_at: string;
}

interface TeamStanding {
  team_id: string;
  team_name: string;
  group_name: string;
  wins: number;
  losses: number;
  points_scored: number;
  points_allowed: number;
  point_differential: number;
  games_played: number;
}

export default function BracketPage() {
  const [activeTab, setActiveTab] = useState("Games");
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [groupStageCompleted, setGroupStageCompleted] = useState(false);

  const tabs = [
    { id: "Games", label: "Games" },
    { id: "Standings", label: "Standings" },
    { id: "Bracket", label: "Bracket" }
  ];

  // Transform timestamp to 12-hour format with date
  const formatStartTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      let datePrefix = '';
      if (date.toDateString() === today.toDateString()) {
        datePrefix = 'Today, ';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        datePrefix = 'Tomorrow, ';
      } else {
        datePrefix = date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }) + ', ';
      }
      
      return datePrefix + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return timestamp; // Return original if parsing fails
    }
  };

  // Transform games data with formatted timestamps
  const transformGamesData = useCallback((rawGames: Game[]) => {
    return rawGames.map(game => ({
      ...game,
      start_time_formatted: game.start_time ? formatStartTime(game.start_time) : 'TBD',
      team1_name: game.team1_name || `Team ${game.team1_id?.slice(0, 8)}`,
      team2_name: game.team2_name || `Team ${game.team2_id?.slice(0, 8)}`
    }));
  }, []);

  // Sort games by start time (chronological order)
  const sortGamesByTime = useCallback((gamesToSort: Game[]) => {
    return [...gamesToSort].sort((a, b) => {
      // Handle null start times - put them at the end
      if (!a.start_time && !b.start_time) return 0;
      if (!a.start_time) return 1;
      if (!b.start_time) return -1;
      
      // Sort by start time (earliest first)
      return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
    });
  }, []);

  // Filter games based on selected group and sort by time
  useEffect(() => {
    let filtered = games;
    if (selectedGroup !== "all") {
      filtered = games.filter(game => game.group_name === selectedGroup);
    }
    
    // Sort filtered games by time
    const sortedFilteredGames = sortGamesByTime(filtered);
    setFilteredGames(sortedFilteredGames);
  }, [games, selectedGroup, sortGamesByTime]);

  // Organize games by bracket rounds
  const organizeBracketGames = useCallback((games: Game[]) => {
    const bracketGames = {
      groupStage: games.filter(game => game.bracket_name === 'Group Stage'),
      playIn: games.filter(game => game.bracket_name === 'Play-In'),
      quarterFinal: games.filter(game => game.bracket_name === 'Quarterfinal'),
      semiFinal: games.filter(game => game.bracket_name === 'Semifinal'),
      final: games.filter(game => game.bracket_name === 'Final')
    };
    return bracketGames;
  }, []);

  // Calculate team standings
  const calculateStandings = useCallback((games: Game[]) => {
    const teamStats: { [key: string]: TeamStanding } = {};

    // Initialize team stats from teams table data
    games.forEach(game => {
      if (game.team1_name && game.team2_name) {
        // Initialize team1 if not exists
        if (!teamStats[game.team1_id]) {
          teamStats[game.team1_id] = {
            team_id: game.team1_id,
            team_name: game.team1_name,
            group_name: game.group_name || 'Unknown',
            wins: 0,
            losses: 0,
            points_scored: 0,
            points_allowed: 0,
            point_differential: 0,
            games_played: 0
          };
        }
        
        // Initialize team2 if not exists
        if (!teamStats[game.team2_id]) {
          teamStats[game.team2_id] = {
            team_id: game.team2_id,
            team_name: game.team2_name,
            group_name: game.group_name || 'Unknown',
            wins: 0,
            losses: 0,
            points_scored: 0,
            points_allowed: 0,
            point_differential: 0,
            games_played: 0
          };
        }

        // Update stats for all games (not just completed ones)
        const team1 = teamStats[game.team1_id];
        const team2 = teamStats[game.team2_id];

        // Update points
        team1.points_scored += game.score1;
        team1.points_allowed += game.score2;
        team2.points_scored += game.score2;
        team2.points_allowed += game.score1;

        // Update wins/losses only for completed games
        if (game.status === 'Completed') {
          if (game.score1 > game.score2) {
            team1.wins += 1;
            team2.losses += 1;
          } else {
            team2.wins += 1;
            team1.losses += 1;
          }
        }

        // Update games played for all games
        team1.games_played += 1;
        team2.games_played += 1;
      }
    });

    // Calculate point differentials
    Object.values(teamStats).forEach(team => {
      team.point_differential = team.points_scored - team.points_allowed;
    });

    // Convert to array and sort by ranking criteria
    const standingsArray = Object.values(teamStats).sort((a, b) => {
      // First: Wins (descending)
      if (a.wins !== b.wins) {
        return b.wins - a.wins;
      }
      // Second: Point differential (descending)
      if (a.point_differential !== b.point_differential) {
        return b.point_differential - a.point_differential;
      }
      // Third: Points scored (descending)
      if (a.points_scored !== b.points_scored) {
        return b.points_scored - a.points_scored;
      }
      // Finally: Team name (alphabetical)
      return a.team_name.localeCompare(b.team_name);
    });

    return standingsArray;
  }, []);

  // Check if all group stage games are completed
  const areAllGroupGamesCompleted = useCallback((games: Game[]) => {
    const groupGames = games.filter(game => 
      game.bracket_name === 'Group Stage' || 
      (game.group_name && ['Group A', 'Group B', 'Group C', 'Group D'].includes(game.group_name))
    );
    
    if (groupGames.length === 0) return false;
    
    return groupGames.every(game => game.status === 'Completed');
  }, []);

  // Get static group standings (only calculated once when all group games are done)
  const getStaticGroupStandings = useCallback((games: Game[]) => {
    // Only include teams from Groups A-D in the standings
    const groupTeams = games.filter(game => 
      game.group_name && ['Group A', 'Group B', 'Group C', 'Group D'].includes(game.group_name)
    );
    
    return calculateStandings(groupTeams);
  }, [calculateStandings]);

  // Manual lock function for admin purposes
  const lockStandingsToStatic = useCallback(() => {
    setGroupStageCompleted(true);
    const staticStandings = getStaticGroupStandings(games);
    setStandings(staticStandings);
    console.log('✅ Standings manually locked to static mode');
  }, [games, getStaticGroupStandings]);

  // Fetch games from Supabase
  useEffect(() => {
    const fetchGames = async () => {
      console.log("Fetching games from Supabase...");
      console.log("Supabase client:", supabase);
      
      if (!supabase) {
        console.error("Supabase client not initialized");
        console.log("Environment variables:", {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "Missing"
        });
        setLoading(false);
        return;
      }

      try {
        // First, let's test the connection
        console.log("Testing Supabase connection...");
        const { data: testData, error: testError } = await supabase
          .from('games')
          .select('count')
          .limit(1);
        
        console.log("Test query result:", { testData, testError });

        console.log("Making Supabase query...");
        const { data, error } = await supabase
          .from('game_with_teams')
          .select('*');

        console.log("Supabase response:", { data, error });

        if (error) {
          console.error('Error fetching games:', error);
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
        } else {
          console.log('Games fetched successfully:', data);
          console.log('Number of games:', data?.length);
          console.log('Sample game data structure:', data?.[0]);
          console.log('Sample team1_name:', data?.[0]?.team1_name);
          console.log('Sample team2_name:', data?.[0]?.team2_name);
          console.log('Data type:', typeof data);
          console.log('Is data array?', Array.isArray(data));
          const transformedGames = transformGamesData(data || []);
          console.log('Transformed games:', transformedGames);
          console.log('Transformed games length:', transformedGames.length);
          setGames(transformedGames);
          
          // Check if group stage is completed and set standings accordingly
          const groupStageDone = areAllGroupGamesCompleted(transformedGames);
          setGroupStageCompleted(groupStageDone);
          
          if (groupStageDone) {
            // Group stage is complete - use static standings
            const staticStandings = getStaticGroupStandings(transformedGames);
            setStandings(staticStandings);
            console.log('✅ Group stage completed - standings are now static');
          } else {
            // Group stage still in progress - calculate dynamic standings
            const calculatedStandings = calculateStandings(transformedGames);
            setStandings(calculatedStandings);
            console.log('🔄 Group stage in progress - standings are dynamic');
          }
          
          // Debug: Check what groups we're getting
          console.log('Available groups from games:', [...new Set(transformedGames.map(game => game.group_name))]);
          console.log('Standings calculated:', standings);
          console.log('Teams per group:', standings.reduce((acc, team) => {
            acc[team.group_name] = (acc[team.group_name] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number }));
          
          // Extract unique groups from the view for the filter dropdown
          const groups = [...new Set(transformedGames.map(game => game.group_name).filter((name): name is string => Boolean(name)))].sort();
          setAvailableGroups(groups);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [transformGamesData, areAllGroupGamesCompleted, getStaticGroupStandings, calculateStandings, standings]);

  // Real-time subscription for live score updates
  useEffect(() => {
    if (!supabase) return;

    console.log("Setting up real-time subscription for live score updates...");
    
    // Subscribe to score changes in the games table
    const subscription = supabase
      .channel('live-score-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'games'
        },
        (payload) => {
          console.log('🔴 Live score update received:', payload);
          
          // Only refresh if it's a score-related update
          if (payload.new && payload.old) {
            const newGame = payload.new;
            const oldGame = payload.old;
            
            // Check if scores actually changed
            if (newGame.score1 !== oldGame.score1 || newGame.score2 !== oldGame.score2) {
              console.log('⚽ Score change detected, refreshing games...');
              
              // Refresh games data to show updated scores
              const refreshGames = async () => {
                if (!supabase) return;
                
                try {
                  const { data, error } = await supabase
                    .from('game_with_teams')
                    .select('*');
                  
                  if (!error && data) {
                    const transformedGames = transformGamesData(data || []);
                    setGames(transformedGames);
                    
                    // Only recalculate standings if group stage is not completed
                    if (!groupStageCompleted) {
                      const calculatedStandings = calculateStandings(transformedGames);
                      setStandings(calculatedStandings);
                      console.log('🔄 Standings updated (group stage in progress)');
                    } else {
                      console.log('✅ Standings remain static (group stage completed)');
                    }
                    
                    console.log('✅ Games refreshed with live score updates');
                  }
                } catch (error) {
                  console.error('❌ Error refreshing games after score update:', error);
                }
              };
              
              refreshGames();
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('Live score subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log("Cleaning up live score subscription...");
      subscription.unsubscribe();
    };
  }, [transformGamesData, calculateStandings, groupStageCompleted]); // Only depend on relevant functions and state

  return (
    <div className="min-h-screen bg-white text-black">
      <HamburgerMenu />
      
      {/* Tab Navigation - positioned below menu */}
      <div className="px-4 pt-16 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Tab Menu */}
          <div className="bg-gray-100 rounded-lg p-1 mb-8">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[60vh]">
            {activeTab === "Games" && (
              <div className="space-y-6">
                {/* Status Banner */}
                {groupStageCompleted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-green-900">Group Stage Completed</h4>
                        <p className="text-sm text-green-700">
                          All Groups A-D games are finished. Standings are now locked and teams advancing to playoffs will appear in playoff brackets.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-50 rounded-lg p-8">
                  {loading ? (
                    <div className="text-center">
                      <p className="text-gray-500">Loading games...</p>
                    </div>
                  ) : games.length === 0 ? (
                    <div className="text-center">
                      <p className="text-gray-500">No games found</p>
                      <p className="text-sm text-gray-400 mt-2">Debug: Games array length is 0</p>
                    </div>
                  ) : (
                    <div>
                      {/* Group Filter */}
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <label htmlFor="group-filter" className="text-sm font-semibold text-blue-900">
                              Filter by Group:
                            </label>
                            <select
                              id="group-filter"
                              value={selectedGroup}
                              onChange={(e) => setSelectedGroup(e.target.value)}
                              className="px-4 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
                            >
                              <option value="all">All Groups</option>
                              {availableGroups.map((group) => (
                                <option key={group} value={group}>
                                  {group}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-blue-700 font-medium">
                              {filteredGames.length} of {games.length} games
                            </span>
                            {selectedGroup !== "all" && (
                              <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full">
                                {selectedGroup}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 text-center">
                        <p className="text-sm text-gray-600">
                          Found {filteredGames.length} games • Sorted chronologically by start time
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredGames.map((game_with_teams) => (
                          <div
                            key={game_with_teams.id}
                            className="bg-gray-100 border border-gray-400 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                          >
                            {/* Game Status */}
                            <div className="flex justify-between items-center mb-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                game_with_teams.status === 'Live' 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-gray-500 text-white'
                              }`}>
                                {game_with_teams.status}
                              </span>
                              <span className="text-gray-600 text-xs font-medium">
                                {game_with_teams.start_time_formatted}
                              </span>
                            </div>

                            {/* Teams and Scores */}
                            <div className="space-y-3">
                              {/* Team 1 */}
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm truncate max-w-[80%]">
                                  {game_with_teams.team1_name}
                                </span>
                                <span className="text-lg font-bold text-blue-600">
                                  {game_with_teams.score1}
                                </span>
                              </div>

                              {/* VS */}
                              <div className="text-center text-gray-500 text-xs font-medium">
                                VS
                              </div>

                              {/* Team 2 */}
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm truncate max-w-[80%]">
                                  {game_with_teams.team2_name}
                                </span>
                                <span className="text-lg font-bold text-blue-600">
                                  {game_with_teams.score2}
                                </span>
                              </div>
                            </div>

                            {/* Group Name */}
                            <div className="mt-3 pt-3 border-t border-gray-300">
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                {game_with_teams.group_name || 'Group Unknown'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Standings" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">Tournament Standings</h2>
                  
                  {/* Status Indicator */}
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    groupStageCompleted 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    {groupStageCompleted ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Group Stage Completed - Standings Locked
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        Group Stage In Progress - Standings Live
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Admin Controls */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Admin Controls</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {groupStageCompleted 
                          ? 'Standings are currently locked and cannot be changed.'
                          : 'Standings are currently live. Lock them when group stage is complete.'
                        }
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!groupStageCompleted && (
                        <button
                          onClick={lockStandingsToStatic}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          Lock Standings
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {loading ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">Loading standings...</p>
                  </div>
                ) : standings.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No standings available yet</p>
                    <p className="text-sm text-gray-400 mt-2">Complete some games to see standings</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Group Standings */}
                    {availableGroups.map((groupName) => {
                      const groupStandings = standings.filter(team => team.group_name === groupName);
                      
                      if (groupStandings.length === 0) return null;
                      
                      return (
                        <div key={groupName} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                            <h3 className="text-xl font-bold">{groupName}</h3>
                            <p className="text-sm opacity-90">
                              {groupStandings.length} teams
                            </p>
                          </div>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rank
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Team
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    W
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    L
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    GP
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    PF
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    PA
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Diff
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {groupStandings.map((team, index) => (
                                  <tr key={team.team_id} className={`hover:bg-gray-50 ${
                                    index < 3 ? 'bg-green-100' : ''
                                  }`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      {team.team_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">
                                      {team.wins}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">
                                      {team.losses}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                      {team.games_played}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">
                                      {team.points_scored}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">
                                      {team.points_allowed}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-center font-medium ${
                                      team.point_differential > 0 ? 'text-green-600' : 
                                      team.point_differential < 0 ? 'text-red-600' : 'text-gray-900'
                                    }`}>
                                      {team.point_differential > 0 ? '+' : ''}{team.point_differential}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Info note when group stage is completed */}
                {groupStageCompleted && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Group Stage Standings Locked</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          All Groups A-D games have been completed. These standings are now final and will not change during playoffs. 
                          Teams that advance to playoffs will appear in their respective playoff brackets.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Bracket" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Tournament Bracket</h2>
                
                {loading ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">Loading bracket...</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    {/* Bracket Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Single Elimination Tournament</h3>
                      <p className="text-sm text-gray-600">12 Teams • Top 4 from each group get bye • 4 Rounds</p>
                    </div>

                    {/* Bracket Container */}
                    <div className="flex justify-between items-start space-x-8 overflow-x-auto pb-4">
                      {/* Round 1 - 4 Games (Play-in Games) */}
                      <div className="flex flex-col space-y-4 min-w-[280px]">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-orange-600">Play-in</h4>
                        </div>
                        
                        {/* 4 play-in games */}
                        <div className="space-y-4">
                          {organizeBracketGames(games).playIn.length > 0 ? (
                            organizeBracketGames(games).playIn.map((game, index) => (
                              <div key={`r1-${game.id}`} className="bg-orange-50 rounded-lg border border-orange-200 p-4 min-h-[80px] flex flex-col justify-center">
                                <div className="text-xs text-orange-600 mb-2">Play-in Game {index + 1}</div>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900">
                                      {game.team1_name || `Team ${game.team1_id?.slice(0, 8)}`}
                                    </span>
                                    <span className="text-sm font-bold text-blue-600">
                                      {game.score1}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900">
                                      {game.team2_name || `Team ${game.team2_id?.slice(0, 8)}`}
                                    </span>
                                    <span className="text-sm font-bold text-blue-600">
                                      {game.score2}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="bg-orange-50 rounded-lg border border-orange-200 p-4 min-h-[80px] flex flex-col justify-center">
                              <div className="text-xs text-orange-600 mb-2">No Play-in Games Yet</div>
                              <div className="text-sm text-gray-500 text-center">Games will appear here when bracket play begins</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Round 2 - 4 Games (Top 4 from groups vs Play-in winners) */}
                      <div className="flex flex-col space-y-4 min-w-[280px]">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-blue-600">Quarter Finals</h4>
                        </div>
                        
                        {/* 4 games (top seeds vs play-in winners) */}
                        <div className="space-y-4">
                          {organizeBracketGames(games).quarterFinal.map((game, index) => (
                            <div key={`r2-${game.id}`} className="bg-blue-50 rounded-lg border border-blue-200 p-4 min-h-[80px] flex flex-col justify-center">
                              <div className="text-xs text-blue-500 mb-2">Game {index + 1}</div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-900">
                                    {game.team1_name || `Team ${game.team1_id?.slice(0, 8)}`}
                                  </span>
                                  <span className="text-sm font-bold text-blue-600">
                                    {game.score1}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-900">
                                    {game.team2_name || `Team ${game.team2_id?.slice(0, 8)}`}
                                  </span>
                                  <span className="text-sm font-bold text-blue-600">
                                    {game.score2}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Round 3 - 2 Games (Semi Finals) */}
                      <div className="flex flex-col space-y-4 min-w-[280px]">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-green-600">Semi Finals</h4>
                        </div>
                        
                        {/* Semi Finals */}
                        <div className="space-y-4">
                          {organizeBracketGames(games).semiFinal.map((game, index) => (
                            <div key={`r3-${game.id}`} className="bg-green-50 rounded-lg border border-green-200 p-4 min-h-[80px] flex flex-col justify-center">
                              <div className="text-xs text-green-500 mb-2">Semi Final {index + 1}</div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-900">
                                    {game.team1_name || `Team ${game.team1_id?.slice(0, 8)}`}
                                  </span>
                                  <span className="text-sm font-bold text-blue-600">
                                    {game.score1}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-900">
                                    {game.team2_name || `Team ${game.team2_id?.slice(0, 8)}`}
                                  </span>
                                  <span className="text-sm font-bold text-blue-600">
                                    {game.score2}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Championship */}
                      <div className="flex flex-col space-y-4 min-w-[280px]">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-red-600">Championship</h4>
                        </div>
                        
                        {organizeBracketGames(games).final.map((game) => (
                          <div key={`championship-${game.id}`} className="bg-red-50 rounded-lg border border-red-200 p-4 min-h-[80px] flex flex-col justify-center">
                            <div className="text-xs text-red-500 mb-2">Championship Game</div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">
                                  {game.team1_name || `Team ${game.team1_id?.slice(0, 8)}`}
                                </span>
                                <span className="text-sm font-bold text-blue-600">
                                  {game.score1}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">
                                  {game.team2_name || `Team ${game.team2_id?.slice(0, 8)}`}
                                </span>
                                <span className="text-sm font-bold text-blue-600">
                                  {game.score2}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}