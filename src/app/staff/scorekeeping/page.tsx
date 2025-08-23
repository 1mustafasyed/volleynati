"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Game {
  id: string;
  game_id: string;
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
  bracket_id: number | null;
  updated_by: string | null;
  updated_at: string;
  group_name: string | null;
}

export default function ScorekeepingPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        router.push("/staff/login");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
        
      if (!user) {
        router.push("/staff/login");
        return;
      }
    };

    checkAuth();
  }, [router]);

  // Format timestamp to 12-hour format
  const formatStartTime = (timestamp: string | null) => {
    if (!timestamp) return 'TBD';
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'TBD';
    }
  };

  // Transform games data - using team names directly from the view
  const transformGamesData = (rawGames: any[]) => {
    return rawGames.map(game_with_teams => ({
      ...game_with_teams,
      start_time_formatted: formatStartTime(game_with_teams.start_time),
      // Use team names directly from the view
      team1_name: game_with_teams.team1_name,
      team2_name: game_with_teams.team2_name
    }));
  };

  // Filter games based on selected group
  useEffect(() => {
    if (selectedGroup === "all") {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.group_name === selectedGroup));
    }
  }, [games, selectedGroup]);

  // Fetch games from Supabase
  useEffect(() => {
    const fetchGames = async () => {
      if (!supabase) return;

      try {
        const { data, error } = await supabase
          .from('game_with_teams')
          .select('*');

        if (error) {
          console.error('Error fetching games:', error);
        } else {
          const transformedGames = transformGamesData(data || []);
          setGames(transformedGames);
          
          // Extract unique groups from the view for the filter dropdown
          const groups = [...new Set(transformedGames.map(game => game.group_name))].sort();
          setAvailableGroups(groups);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Update game score
  const updateGameScore = async (gameId: string, team: 'team1' | 'team2', newScore: number) => {
    if (!supabase) return;

    setUpdating(gameId);
    
    try {
      const { error } = await supabase
        .from('games')
        .update({ 
          [team === 'team1' ? 'score1' : 'score2']: newScore,
          updated_at: new Date().toISOString()
        })
        .eq('id', gameId);

      if (error) {
        console.error('Error updating score:', error);
      } else {
        // Update local state
        setGames(prevGames => 
          prevGames.map(game => 
            game.id === gameId 
              ? { ...game, [team === 'team1' ? 'score1' : 'score2']: newScore }
              : game
          )
        );
      }
    } catch (error) {
      console.error('Error updating score:', error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Scorekeeping</h1>
          <Button 
            variant="outline" 
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/staff/dashboard">
             Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Manage Game Scores</h2>
          <p className="text-gray-600">Update scores for all tournament games</p>
        </div>

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

        {filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {selectedGroup === "all" ? "No games found" : `No games found in ${selectedGroup}`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <Link
                key={game.game_id || game.id}
                href={`/staff/scorekeeping/${game.game_id || game.id}`}
                className="block"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  {/* Game Status */}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      game.status === 'Live' 
                        ? 'bg-red-500 text-white' 
                        : game.status === 'Scheduled'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {game.status}
                    </span>
                    <span className="text-gray-600 text-xs font-medium">
                      {game.start_time_formatted}
                    </span>
                  </div>

                  {/* Game Type */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {game.game_type}
                    </span>
                  </div>

                  {/* Teams and Scores */}
                  <div className="space-y-4">
                    {/* Team 1 */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm truncate max-w-[50%]">
                        {game.team1_name}
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {game.score1}
                      </span>
                    </div>

                    {/* VS */}
                    <div className="text-center text-gray-500 text-xs font-medium">
                      VS
                    </div>

                    {/* Team 2 */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm truncate max-w-[50%]">
                        {game.team2_name}
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {game.score2}
                      </span>
                    </div>
                  </div>

                  {/* Game ID */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {game.group_name || 'Group Unknown'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}