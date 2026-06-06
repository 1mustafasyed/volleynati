import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
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
  group_name: string | null;
  updated_by: string | null;
  updated_at: string;
  game_id: string;
}

export default function GameScoreUpdatePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showEndGameConfirmation, setShowEndGameConfirmation] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<Array<{team: 'team1' | 'team2', previousScore: number, newScore: number}>>([]);
  const [, setLocation] = useLocation();

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

  const transformGameData = (rawGame: Game) => ({
    ...rawGame,
    start_time_formatted: formatStartTime(rawGame.start_time),
    team1_name: rawGame.team1_name || `Team ${rawGame.team1_id || 'Unknown'}`,
    team2_name: rawGame.team2_name || `Team ${rawGame.team2_id || 'Unknown'}`,
  });

  useEffect(() => {
    const fetchGame = async () => {
      if (!supabase || !gameId) return;

      try {
        const { data, error } = await supabase
          .from('game_with_teams')
          .select('*')
          .eq('game_id', gameId)
          .single();

        if (error) {
          console.error('Error fetching game:', error);
          setLoading(false);
          return;
        } else if (data) {
          setGame(transformGameData(data));
        }
      } catch {
        console.error('Error fetching game: Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  const updateGameScore = async (team: 'team1' | 'team2') => {
    if (!supabase || !game) return;
    setUpdating(true);

    try {
      const previousScore = team === 'team1' ? game.score1 : game.score2;
      const newScore = previousScore + 1;

      setScoreHistory(prev => [...prev, { team, previousScore, newScore }]);

      const gameIdToUpdate = game.game_id || game.id;

      const { error } = await supabase
        .from('games')
        .update({
          [team === 'team1' ? 'score1' : 'score2']: newScore,
          updated_at: new Date().toISOString()
        })
        .eq('id', gameIdToUpdate);

      if (error) {
        console.error('Error updating score:', error);
        setScoreHistory(prev => prev.slice(0, -1));
      } else {
        setGame(prevGame =>
          prevGame ? { ...prevGame, [team === 'team1' ? 'score1' : 'score2']: newScore } : null
        );
      }
    } catch {
      console.error('Error updating score: Unknown error');
      setScoreHistory(prev => prev.slice(0, -1));
    } finally {
      setUpdating(false);
    }
  };

  const undoLastScore = async () => {
    if (!supabase || !game || scoreHistory.length === 0) return;
    setUpdating(true);

    try {
      const lastChange = scoreHistory[scoreHistory.length - 1];
      const newScore1 = lastChange.team === 'team1' ? lastChange.previousScore : game.score1;
      const newScore2 = lastChange.team === 'team2' ? lastChange.previousScore : game.score2;
      const gameIdToUpdate = game.game_id || game.id;

      const { error } = await supabase
        .from('games')
        .update({ score1: newScore1, score2: newScore2, updated_at: new Date().toISOString() })
        .eq('id', gameIdToUpdate);

      if (error) {
        console.error('Error undoing score:', error);
      } else {
        setGame(prevGame => prevGame ? { ...prevGame, score1: newScore1, score2: newScore2 } : null);
        setScoreHistory(prev => prev.slice(0, -1));
      }
    } catch {
      console.error('Error undoing score: Unknown error');
    } finally {
      setUpdating(false);
    }
  };

  const confirmEndGame = async () => {
    if (!supabase || !game) return;
    setUpdating(true);

    try {
      const gameIdToUpdate = game.game_id || game.id;
      const { error } = await supabase
        .from('games')
        .update({ status: 'Completed', updated_at: new Date().toISOString() })
        .eq('id', gameIdToUpdate)
        .select();

      if (error) {
        console.error('Error ending game:', error);
      } else {
        setGame(prevGame => prevGame ? { ...prevGame, status: 'Completed' } : null);
        setLocation('/staff/scorekeeping');
      }
    } catch {
      console.error('Error ending game: Unknown error');
    } finally {
      setUpdating(false);
      setShowEndGameConfirmation(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <p className="text-gray-600">Loading game...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Game not found</p>
          <Button asChild className="mt-4">
            <Link href="/staff/scorekeeping">← Back to Scorekeeping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Update Game Score</h1>
          <Button variant="outline" asChild className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/staff/scorekeeping">Back</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{game.game_type}</span>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{game.group_name || 'Group Unknown'}</span>
            </div>
            <div className="text-sm text-gray-600">
              Game #{game.id ? game.id.slice(0, 8) : 'Unknown'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => updateGameScore('team1')}
            disabled={updating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-8 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl font-bold mb-2">{game.team1_name}</div>
            <div className="text-6xl font-bold mb-4">{game.score1}</div>
            <div className="text-lg">Click to add 1 point</div>
          </button>

          <button
            onClick={() => updateGameScore('team2')}
            disabled={updating}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-8 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl font-bold mb-2">{game.team2_name}</div>
            <div className="text-6xl font-bold mb-4">{game.score2}</div>
            <div className="text-lg">Click to add 1 point</div>
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={undoLastScore}
            disabled={updating || scoreHistory.length === 0}
            className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Undo Last Score
          </button>

          <button
            onClick={() => setShowEndGameConfirmation(true)}
            disabled={updating}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors"
          >
            End Game
          </button>
        </div>

        {showEndGameConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">End Game Confirmation</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to end this game? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowEndGameConfirmation(false)}
                  disabled={updating}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEndGame}
                  disabled={updating}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {updating ? 'Ending...' : 'Yes, End Game'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
