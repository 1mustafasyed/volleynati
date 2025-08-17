"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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
  game_id: string; // Added game_id to the interface
}

export default function GameScoreUpdatePage({ params }: { params: { gameId: string } }) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<Array<{team: 'team1' | 'team2', previousScore: number, newScore: number}>>([]);
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

  // Transform game data
  const transformGameData = (rawGame: any) => {
    return {
      ...rawGame,
      start_time_formatted: formatStartTime(rawGame.start_time),
      // Handle team names with fallbacks
      team1_name: rawGame.team1_name || `Team ${rawGame.team1_id || 'Unknown'}`,
      team2_name: rawGame.team2_name || `Team ${rawGame.team2_id || 'Unknown'}`,
    };
  };

  // Fetch specific game
  useEffect(() => {
    const fetchGame = async () => {
      if (!supabase) return;

      try {
        // Try to find the game using the ID from the URL
        const { data, error } = await supabase
          .from('game_with_teams')
          .select('*')
          .eq('id', params.gameId)
          .single();

        if (error) {
          console.error('Error fetching game:', error);
        } else if (data) {
          const transformedGame = transformGameData(data);
          setGame(transformedGame);
        } else {
          console.log('No game found with ID:', params.gameId);
        }
      } catch (error) {
        console.error('Error fetching game:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [params.gameId]);

  // Update game score
  const updateGameScore = async (team: 'team1' | 'team2') => {
    if (!supabase || !game) return;

    setUpdating(true);
    
    try {
      const previousScore = team === 'team1' ? game.score1 : game.score2;
      const newScore = previousScore + 1;
      
      // Track this change in history
      setScoreHistory(prev => [...prev, {
        team,
        previousScore,
        newScore
      }]);
      
      // Use game_id from the view to update the games table
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
        // Remove the history entry if update failed
        setScoreHistory(prev => prev.slice(0, -1));
      } else {
        // Update local state
        setGame(prevGame => 
          prevGame ? {
            ...prevGame,
            [team === 'team1' ? 'score1' : 'score2']: newScore
          } : null
        );
      }
    } catch (error) {
      console.error('Error updating score:', error);
      // Remove the history entry if update failed
      setScoreHistory(prev => prev.slice(0, -1));
    } finally {
      setUpdating(false);
    }
  };

  // Undo last score change
  const undoLastScore = async () => {
    if (!supabase || !game || scoreHistory.length === 0) return;

    setUpdating(true);
    
    try {
      // Get the last change from history
      const lastChange = scoreHistory[scoreHistory.length - 1];
      
      // Calculate new scores based on the last change
      const newScore1 = lastChange.team === 'team1' ? lastChange.previousScore : game.score1;
      const newScore2 = lastChange.team === 'team2' ? lastChange.previousScore : game.score2;
      
      const gameIdToUpdate = game.game_id || game.id;
      
      const { error } = await supabase
        .from('games')
        .update({ 
          score1: newScore1,
          score2: newScore2,
          updated_at: new Date().toISOString()
        })
        .eq('id', gameIdToUpdate);

      if (error) {
        console.error('Error undoing score:', error);
      } else {
        // Update local state
        setGame(prevGame => 
          prevGame ? {
            ...prevGame,
            score1: newScore1,
            score2: newScore2
          } : null
        );
        
        // Remove the last change from history
        setScoreHistory(prev => prev.slice(0, -1));
      }
    } catch (error) {
      console.error('Error undoing score:', error);
    } finally {
      setUpdating(false);
    }
  };

  // End the game
  const endGame = async () => {
    if (!supabase || !game) return;

    setUpdating(true);
    
    try {
      const gameIdToUpdate = game.game_id || game.id;
      
      const { error } = await supabase
        .from('games')
        .update({ 
          status: 'Completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', gameIdToUpdate);

      if (error) {
        console.error('Error ending game:', error);
      } else {
        // Update local state
        setGame(prevGame => 
          prevGame ? {
            ...prevGame,
            status: 'Completed'
          } : null
        );
        
        // Redirect back to scorekeeping list
        window.location.href = '/staff/scorekeeping';
      }
    } catch (error) {
      console.error('Error ending game:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Game not found</p>
          <Button asChild className="mt-4">
            <Link href="/staff/scorekeeping">
              ← Back to Scorekeeping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Update Game Score</h1>
          <Button 
            variant="outline" 
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/staff/scorekeeping">
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Game Info Header */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {game.game_type}
              </span>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {game.group_name || 'Group Unknown'}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Game #{game.id ? game.id.slice(0, 8) : 'Unknown'}
            </div>
          </div>
        </div>

        {/* Score Update Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team 1 Button */}
          <button
            onClick={() => updateGameScore('team1')}
            disabled={updating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-8 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl font-bold mb-2">{game.team1_name}</div>
            <div className="text-6xl font-bold mb-4">{game.score1}</div>
            <div className="text-lg">Click to add 1 point</div>
          </button>

          {/* Team 2 Button */}
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

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => undoLastScore()}
            disabled={updating || scoreHistory.length === 0}
            className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Undo Last Score
          </button>
          
          <button
            onClick={() => endGame()}
            disabled={updating}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors"
          >
            End Game
          </button>
        </div>
      </div>
    </div>
  );
} 