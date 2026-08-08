import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

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
  bracket_name: string | null;
  court: string | null;
}

export default function ScorekeepingPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGameSection, setSelectedGameSection] = useState<string>("Group A");
  const [, setLocation] = useLocation();
  const playoffRounds = ["Play-In", "Quarterfinal", "Semifinal", "Final"];
  const gameSections = ["Group A", "Group B", "Group C", "Group D", "Playoffs"];

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        setLocation("/staff/login");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLocation("/staff/login");
        return;
      }
    };

    checkAuth();
  }, [setLocation]);

  const formatStartTime = (timestamp: string | null) => {
    if (!timestamp) return 'TBD';
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch {
      return 'TBD';
    }
  };

  const transformGamesData = (rawGames: Game[]) => {
    return rawGames.map(game => ({
      ...game,
      start_time_formatted: formatStartTime(game.start_time),
      team1_name: game.team1_name,
      team2_name: game.team2_name
    }));
  };

  useEffect(() => {
    const filtered = selectedGameSection === "Playoffs"
      ? games.filter(game => game.bracket_name !== null && playoffRounds.includes(game.bracket_name))
      : games.filter(game => game.group_name === selectedGameSection);
    setFilteredGames(filtered);
  }, [games, selectedGameSection]);

  const fetchGames = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from('game_with_teams').select('*');
      if (error) {
        console.error('Error fetching games:', error);
        return;
      }
      const transformedGames = transformGamesData(data || []);
      setGames(transformedGames);
    } catch {
      console.error('Error fetching games: Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    if (!supabase) return;

    const subscription = supabase
      .channel('staff-scorekeeping-games')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'games' },
        () => {
          console.info('New game created; refreshing scorekeeping list.');
          fetchGames();
        }
      )
      .subscribe((status, error) => {
        if (status === 'SUBSCRIBED') {
          console.info('Staff scorekeeping live updates connected.');
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error('Staff scorekeeping live updates failed:', { status, error });
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchGames]);

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
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Scorekeeping</h1>
          <Button
            variant="outline"
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/staff/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Manage Game Scores</h2>
          <p className="text-gray-600">Update scores for all tournament games</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="game-section-filter" className="text-sm font-semibold text-blue-900">
                Show:
              </label>
              <select
                id="game-section-filter"
                value={selectedGameSection}
                onChange={(e) => setSelectedGameSection(e.target.value)}
                className="px-4 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              >
                {gameSections.map((section) => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
            <span className="text-sm text-blue-700 font-medium">
              {filteredGames.length} of {games.length} games
            </span>
          </div>
        </div>

        {filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {selectedGameSection === "Playoffs"
                ? "No playoff games found"
                : `No games found in ${selectedGameSection}`}
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

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {game.game_type}
                    </span>
                    {game.court && (
                      <span className="text-xs text-green-800 bg-green-100 px-2 py-1 rounded">
                        {game.court}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm truncate max-w-[50%]">{game.team1_name}</span>
                      <span className="text-lg font-bold text-blue-600">{game.score1}</span>
                    </div>
                    <div className="text-center text-gray-500 text-xs font-medium">VS</div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm truncate max-w-[50%]">{game.team2_name}</span>
                      <span className="text-lg font-bold text-blue-600">{game.score2}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {game.bracket_name && playoffRounds.includes(game.bracket_name)
                        ? game.bracket_name
                        : game.group_name || 'Group Unknown'}
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
