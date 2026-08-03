import { useState, useEffect, useCallback } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import BottomNav from "@/components/BottomNav";
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
  rank: number;
}

export default function BracketPage() {
  const [activeTab, setActiveTab] = useState("Games");
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);

  const tabs = [
    { id: "Games", label: "Games" },
    { id: "Standings", label: "Standings" },
    { id: "Bracket", label: "Bracket" }
  ];

  // Derive whether all group-stage games are completed from local state
  const groupStageCompleted = games.length > 0 && (() => {
    const groupGames = games.filter(game =>
      game.bracket_name === 'Group Stage' ||
      (game.group_name && ['Group A', 'Group B', 'Group C', 'Group D'].includes(game.group_name))
    );
    return groupGames.length > 0 && groupGames.every(game => game.status === 'Completed');
  })();

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

  // Fetch standings from the group_standings database function
  const fetchStandings = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.rpc('group_standings');
      if (error) {
        console.error('Error fetching standings:', error);
      } else {
        setStandings((data as TeamStanding[]) || []);
      }
    } catch (error) {
      console.error('Error fetching standings:', error);
    }
  }, []);

  // Initial data load
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
    fetchStandings();
  }, [transformGamesData, fetchStandings]);

   // Realtime subscription — patch only the updated game, re-fetch standings on status transitions
  useEffect(() => {
    if (!supabase) return;

    const subscription = supabase
      .channel('live-score-updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'games' },
        (payload) => {
          if (!payload.new) return;

          const updated = payload.new as {
            id: string;
            score1: number;
            score2: number;
            status: string;
          };
          const previous = payload.old as { status?: string } | undefined;

          // Patch only this game's scores and status into local state
          setGames(prev =>
            prev.map(g =>
               g.game_id === updated.id
                ? { ...g, score1: updated.score1, score2: updated.score2, status: updated.status }
                : g
            )
          );

          // Re-fetch standings only when a game's status transitions to or from Completed
          const prevStatus = previous?.status;
          const newStatus = updated.status;
          if (prevStatus !== newStatus && (prevStatus === 'Completed' || newStatus === 'Completed')) {
            fetchStandings();
          }
        }
      )
      .subscribe((status, error) => {
        if (status === 'SUBSCRIBED') {
          console.info('Live score updates connected.');
          return;
        }

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error('Live score updates connection failed:', { status, error });
          return;
        }

        console.info('Live score updates status:', status);
      });

    return () => { subscription.unsubscribe(); };
  }, [fetchStandings]);

  // Group standings by group_name, ordered by rank (already sorted by RPC)
  const groupedStandings = standings.reduce((acc, team) => {
    if (!acc[team.group_name]) acc[team.group_name] = [];
    acc[team.group_name].push(team);
    return acc;
  }, {} as { [key: string]: TeamStanding[] });

  return (
    <div className="min-h-screen text-[#4A3728]" style={{ backgroundColor: "#F5F0E8" }}>
      <HamburgerMenu />

      <div className="px-4 pt-8 pb-6">
        <div className="max-w-4xl mx-auto">

          {/* Tab bar */}
          <div className="rounded-lg p-1 mb-8" style={{ backgroundColor: "#E0D8CC" }}>
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200`}
                  style={
                    activeTab === tab.id
                      ? { backgroundColor: "#F5F0E8", color: "#4A3728", boxShadow: "0 1px 3px rgba(74,55,40,0.15)" }
                      : { color: "#8C7355" }
                  }
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
                  <div className="rounded-lg p-4" style={{ backgroundColor: "#E4EDE4", border: "1px solid #B0C8B0" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#5A8A5A" }}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium" style={{ color: "#2A4A2A" }}>Group Stage Completed</h4>
                        <p className="text-sm" style={{ color: "#4A6A4A" }}>
                          All group stage games are finished. Final standings are set.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!groupStageCompleted && games.length > 0 && (
                  <div className="rounded-lg p-3" style={{ backgroundColor: "#EAE4D8", border: "1px solid #C8BFA8" }}>
                    <p className="text-sm text-center" style={{ color: "#4A3728" }}>
                      Standings update automatically as games complete.
                    </p>
                  </div>
                )}

                <div className="rounded-lg p-6" style={{ backgroundColor: "#EAE4D8" }}>
                  {loading ? (
                    <div className="text-center py-8">
                      <p style={{ color: "#8C7355" }}>Loading games...</p>
                    </div>
                  ) : !supabase ? (
                    <div className="text-center py-8">
                      <p style={{ color: "#8C7355" }}>Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.</p>
                    </div>
                  ) : games.length === 0 ? (
                    <div className="text-center py-8">
                      <p style={{ color: "#8C7355" }}>No games found</p>
                    </div>
                  ) : (
                    <div>
                      {/* Group filter */}
                      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: "#E0D8CC", border: "1px solid #C8BFA8" }}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <label htmlFor="group-filter" className="text-sm font-semibold" style={{ color: "#4A3728" }}>
                              Filter by Group:
                            </label>
                            <select
                              id="group-filter"
                              value={selectedGroup}
                              onChange={(e) => setSelectedGroup(e.target.value)}
                              className="px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2"
                              style={{
                                border: "1px solid #C8BFA8",
                                backgroundColor: "#F5F0E8",
                                color: "#4A3728",
                              }}
                            >
                              <option value="all">All Groups</option>
                              {availableGroups.map((group) => (
                                <option key={group} value={group}>{group}</option>
                              ))}
                            </select>
                          </div>
                          <span className="text-sm font-medium" style={{ color: "#8C7355" }}>
                            {filteredGames.length} of {games.length} games
                          </span>
                        </div>
                      </div>

                      <div className="mb-4 text-center">
                        <p className="text-sm" style={{ color: "#8C7355" }}>
                          Found {filteredGames.length} games &bull; Sorted chronologically by start time
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredGames.map((game) => (
                          <div
                            key={game.id}
                            className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                            style={{ backgroundColor: "#F5F0E8", border: "1px solid #C8BFA8" }}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <span
                                className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                                style={{
                                  backgroundColor:
                                    game.status === 'In Progress' ? '#C0392B' :
                                    game.status === 'Completed'   ? '#5A8A5A' :
                                    '#8C7355'
                                }}
                              >
                                {game.status}
                              </span>
                              <span className="text-xs font-medium" style={{ color: "#8C7355" }}>
                                {game.start_time_formatted}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm truncate max-w-[80%]" style={{ color: "#1C1A16" }}>{game.team1_name}</span>
                                <span className="text-lg font-bold" style={{ color: "#4A3728" }}>{game.score1}</span>
                              </div>
                              <div className="text-center text-xs font-medium" style={{ color: "#8C7355" }}>VS</div>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm truncate max-w-[80%]" style={{ color: "#1C1A16" }}>{game.team2_name}</span>
                                <span className="text-lg font-bold" style={{ color: "#4A3728" }}>{game.score2}</span>
                              </div>
                            </div>

                            <div className="mt-3 pt-3" style={{ borderTop: "1px solid #C8BFA8" }}>
                              <span
                                className="text-xs px-2 py-1 rounded"
                                style={{ color: "#4A3728", backgroundColor: "#E0D8CC" }}
                              >
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
                  <p className="text-center" style={{ color: "#8C7355" }}>Loading standings...</p>
                ) : Object.keys(groupedStandings).length === 0 ? (
                  <p className="text-center" style={{ color: "#8C7355" }}>No standings data available</p>
                ) : (
                  Object.entries(groupedStandings).sort(([a], [b]) => a.localeCompare(b)).map(([groupName, teams]) => (
                    <div key={groupName} className="rounded-lg p-6" style={{ backgroundColor: "#EAE4D8" }}>
                      <h3 className="text-xl font-bold mb-4" style={{ color: "#4A3728" }}>{groupName}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr style={{ borderBottom: "1px solid #C8BFA8" }}>
                              <th className="text-left py-2 px-3 font-semibold" style={{ color: "#8C7355" }}>Team</th>
                              <th className="text-center py-2 px-3 font-semibold" style={{ color: "#8C7355" }}>W</th>
                              <th className="text-center py-2 px-3 font-semibold" style={{ color: "#8C7355" }}>L</th>
                              <th className="text-center py-2 px-3 font-semibold" style={{ color: "#8C7355" }}>PF</th>
                              <th className="text-center py-2 px-3 font-semibold" style={{ color: "#8C7355" }}>PA</th>
                              <th className="text-center py-2 px-3 font-semibold" style={{ color: "#8C7355" }}>+/-</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teams.map((team) => (
                              <tr
                                key={team.team_id}
                                style={{
                                  borderBottom: "1px solid #D4CABC",
                                  backgroundColor: team.rank === 1 ? "#F0EAD0" : "transparent"
                                }}
                              >
                                <td className="py-3 px-3 font-medium" style={{ color: "#4A3728" }}>
                                  {team.rank === 1 && <span className="mr-1" style={{ color: "#C8A84B" }}>★</span>}
                                  {team.team_name}
                                </td>
                                <td className="py-3 px-3 text-center font-bold" style={{ color: "#5A8A5A" }}>{team.wins}</td>
                                <td className="py-3 px-3 text-center font-bold" style={{ color: "#C0392B" }}>{team.losses}</td>
                                <td className="py-3 px-3 text-center" style={{ color: "#8C7355" }}>{team.points_scored}</td>
                                <td className="py-3 px-3 text-center" style={{ color: "#8C7355" }}>{team.points_allowed}</td>
                                <td
                                  className="py-3 px-3 text-center font-bold"
                                  style={{ color: team.point_differential >= 0 ? "#5A8A5A" : "#C0392B" }}
                                >
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
              <div className="rounded-lg p-8 text-center" style={{ backgroundColor: "#EAE4D8" }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#4A3728" }}>Tournament Bracket</h3>
                <p style={{ color: "#8C7355" }}>
                  {groupStageCompleted
                    ? "Bracket is now available. Check back for playoff matchups."
                    : "The bracket will be available after the group stage is completed."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
