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
      return timestamp;
    }
  };

  const transformGamesData = useCallback((rawGames: Game[]) => {
    return rawGames.map(game => ({
      ...game,
      start_time_formatted: game.start_time ? formatStartTime(game.start_time) : 'TBD',
      team1_name: game.team1_name || `Team ${game.team1_id?.slice(0, 8)}`,
      team2_name: game.team2_name || `Team ${game.team2_id?.slice(0, 8)}`
    }));
  }, []);

  const sortGamesByTime = useCallback((gamesToSort: Game[]) => {
    return [...gamesToSort].sort((a, b) => {
      if (!a.start_time && !b.start_time) return 0;
      if (!a.start_time) return 1;
      if (!b.start_time) return -1;
      return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
    });
  }, []);

  useEffect(() => {
    let filtered = games;
    if (selectedGroup !== "all") {
      filtered = games.filter(game => game.group_name === selectedGroup);
    }
    const sortedFilteredGames = sortGamesByTime(filtered);
    setFilteredGames(sortedFilteredGames);
  }, [games, selectedGroup, sortGamesByTime]);

  const calculateStandings = useCallback((games: Game[]) => {
    const teamStats: { [key: string]: TeamStanding } = {};

    games.forEach(game => {
      if (game.team1_name && game.team2_name) {
        if (!teamStats[game.team1_id]) {
          teamStats[game.team1_id] = {
            team_id: game.team1_id,
            team_name: game.team1_name,
            group_name: game.group_name || 'Unknown',
            wins: 0, losses: 0, points_scored: 0,
            points_allowed: 0, point_differential: 0, games_played: 0
          };
        }

        if (!teamStats[game.team2_id]) {
          teamStats[game.team2_id] = {
            team_id: game.team2_id,
            team_name: game.team2_name,
            group_name: game.group_name || 'Unknown',
            wins: 0, losses: 0, points_scored: 0,
            points_allowed: 0, point_differential: 0, games_played: 0
          };
        }

        const team1 = teamStats[game.team1_id];
        const team2 = teamStats[game.team2_id];

        team1.points_scored += game.score1;
        team1.points_allowed += game.score2;
        team2.points_scored += game.score2;
        team2.points_allowed += game.score1;

        if (game.status === 'Completed') {
          if (game.score1 > game.score2) {
            team1.wins += 1;
            team2.losses += 1;
          } else {
            team2.wins += 1;
            team1.losses += 1;
          }
        }

        team1.games_played += 1;
        team2.games_played += 1;
      }
    });

    Object.values(teamStats).forEach(team => {
      team.point_differential = team.points_scored - team.points_allowed;
    });

    return Object.values(teamStats).sort((a, b) => {
      if (a.wins !== b.wins) return b.wins - a.wins;
      if (a.point_differential !== b.point_differential) return b.point_differential - a.point_differential;
      if (a.points_scored !== b.points_scored) return b.points_scored - a.points_scored;
      return a.team_name.localeCompare(b.team_name);
    });
  }, []);

  const areAllGroupGamesCompleted = useCallback((games: Game[]) => {
    const groupGames = games.filter(game =>
      game.bracket_name === 'Group Stage' ||
      (game.group_name && ['Group A', 'Group B', 'Group C', 'Group D'].includes(game.group_name))
    );
    if (groupGames.length === 0) return false;
    return groupGames.every(game => game.status === 'Completed');
  }, []);

  const getStaticGroupStandings = useCallback((games: Game[]) => {
    const groupTeams = games.filter(game =>
      game.group_name && ['Group A', 'Group B', 'Group C', 'Group D'].includes(game.group_name)
    );
    return calculateStandings(groupTeams);
  }, [calculateStandings]);

  useEffect(() => {
    const fetchGames = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('game_with_teams')
          .select('*');

        if (error) {
          console.error('Error fetching games:', error);
        } else {
          const transformedGames = transformGamesData(data || []);
          setGames(transformedGames);

          const groupStageDone = areAllGroupGamesCompleted(transformedGames);
          setGroupStageCompleted(groupStageDone);

          if (groupStageDone) {
            setStandings(getStaticGroupStandings(transformedGames));
          } else {
            setStandings(calculateStandings(transformedGames));
          }

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
  }, [transformGamesData, areAllGroupGamesCompleted, getStaticGroupStandings, calculateStandings]);

  useEffect(() => {
    if (!supabase) return;

    const subscription = supabase
      .channel('live-score-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games' }, (payload) => {
        if (payload.new && payload.old) {
          const newGame = payload.new as { score1: number; score2: number };
          const oldGame = payload.old as { score1: number; score2: number };
          if (newGame.score1 !== oldGame.score1 || newGame.score2 !== oldGame.score2) {
            const refreshGames = async () => {
              if (!supabase) return;
              const { data, error } = await supabase.from('game_with_teams').select('*');
              if (!error && data) {
                const transformedGames = transformGamesData(data || []);
                setGames(transformedGames);
                if (!groupStageCompleted) {
                  setStandings(calculateStandings(transformedGames));
                }
              }
            };
            refreshGames();
          }
        }
      })
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, [transformGamesData, calculateStandings, groupStageCompleted]);

  const groupedStandings = standings.reduce((acc, team) => {
    if (!acc[team.group_name]) acc[team.group_name] = [];
    acc[team.group_name].push(team);
    return acc;
  }, {} as { [key: string]: TeamStanding[] });

  return (
    <div className="min-h-screen bg-white text-black">
      <HamburgerMenu />

      <div className="px-4 pt-16 pb-6">
        <div className="max-w-4xl mx-auto">
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

          <div className="min-h-[60vh]">
            {activeTab === "Games" && (
              <div className="space-y-6">
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
                          All Groups A-D games are finished. Standings are now locked.
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
                  ) : !supabase ? (
                    <div className="text-center">
                      <p className="text-gray-500">Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.</p>
                    </div>
                  ) : games.length === 0 ? (
                    <div className="text-center">
                      <p className="text-gray-500">No games found</p>
                    </div>
                  ) : (
                    <div>
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
                              className="px-4 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                            >
                              <option value="all">All Groups</option>
                              {availableGroups.map((group) => (
                                <option key={group} value={group}>{group}</option>
                              ))}
                            </select>
                          </div>
                          <span className="text-sm text-blue-700 font-medium">
                            {filteredGames.length} of {games.length} games
                          </span>
                        </div>
                      </div>

                      <div className="mb-4 text-center">
                        <p className="text-sm text-gray-600">
                          Found {filteredGames.length} games • Sorted chronologically by start time
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredGames.map((game) => (
                          <div key={game.id} className="bg-gray-100 border border-gray-400 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                game.status === 'Live' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                              }`}>
                                {game.status}
                              </span>
                              <span className="text-gray-600 text-xs font-medium">
                                {game.start_time_formatted}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm truncate max-w-[80%]">{game.team1_name}</span>
                                <span className="text-lg font-bold text-blue-600">{game.score1}</span>
                              </div>
                              <div className="text-center text-gray-500 text-xs font-medium">VS</div>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm truncate max-w-[80%]">{game.team2_name}</span>
                                <span className="text-lg font-bold text-blue-600">{game.score2}</span>
                              </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-300">
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                {game.group_name || 'Group Unknown'}
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
              <div className="space-y-8">
                {loading ? (
                  <p className="text-center text-gray-500">Loading standings...</p>
                ) : Object.keys(groupedStandings).length === 0 ? (
                  <p className="text-center text-gray-500">No standings data available</p>
                ) : (
                  Object.entries(groupedStandings).sort(([a], [b]) => a.localeCompare(b)).map(([groupName, teams]) => (
                    <div key={groupName} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-black mb-4">{groupName}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-300">
                              <th className="text-left py-2 px-3 font-semibold text-gray-700">Team</th>
                              <th className="text-center py-2 px-3 font-semibold text-gray-700">W</th>
                              <th className="text-center py-2 px-3 font-semibold text-gray-700">L</th>
                              <th className="text-center py-2 px-3 font-semibold text-gray-700">PF</th>
                              <th className="text-center py-2 px-3 font-semibold text-gray-700">PA</th>
                              <th className="text-center py-2 px-3 font-semibold text-gray-700">+/-</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teams.map((team, index) => (
                              <tr key={team.team_id} className={`border-b border-gray-200 ${index === 0 ? 'bg-yellow-50' : ''}`}>
                                <td className="py-2 px-3 font-medium text-gray-900">
                                  {index === 0 && <span className="text-yellow-500 mr-1">★</span>}
                                  {team.team_name}
                                </td>
                                <td className="py-2 px-3 text-center text-green-600 font-bold">{team.wins}</td>
                                <td className="py-2 px-3 text-center text-red-600 font-bold">{team.losses}</td>
                                <td className="py-2 px-3 text-center text-gray-700">{team.points_scored}</td>
                                <td className="py-2 px-3 text-center text-gray-700">{team.points_allowed}</td>
                                <td className={`py-2 px-3 text-center font-bold ${team.point_differential >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {team.point_differential >= 0 ? '+' : ''}{team.point_differential}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "Bracket" && (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-black mb-4">Tournament Bracket</h3>
                <p className="text-gray-500">
                  {groupStageCompleted
                    ? "Bracket is now available. Check back for playoff matchups."
                    : "The bracket will be available after the group stage is completed."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
