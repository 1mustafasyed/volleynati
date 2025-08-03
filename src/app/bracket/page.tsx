"use client";

import { useState, useEffect } from "react";
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
  bracket_id: number | null;
  updated_by: string | null;
  updated_at: string;
}

export default function BracketPage() {
  const [activeTab, setActiveTab] = useState("Games");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "Games", label: "Games" },
    { id: "Standings", label: "Standings" },
    { id: "Bracket", label: "Bracket" }
  ];

  // Transform timestamp to 12-hour format
  const formatStartTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
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
  const transformGamesData = (rawGames: any[]) => {
    return rawGames.map(game => ({
      ...game,
      start_time_formatted: game.start_time ? formatStartTime(game.start_time) : 'TBD',
      team1_name: game.team1_name || `Team ${game.team1_id?.slice(0, 8)}`,
      team2_name: game.team2_name || `Team ${game.team2_id?.slice(0, 8)}`
    }));
  };

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
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

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
                      <div className="mb-4 text-center">
                        <p className="text-sm text-gray-600">Found {games.length} games</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {games.map((game_with_teams) => (
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
                <h2 className="text-3xl font-bold text-gray-900">Tournament Standings</h2>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Standings interface coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === "Bracket" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Tournament Bracket</h2>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Bracket interface coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
