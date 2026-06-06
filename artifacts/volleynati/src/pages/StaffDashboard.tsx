import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function StaffDashboardPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
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

      setUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [setLocation]);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setLocation("/staff/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Staff Dashboard</h1>
          <div className="flex flex-col items-end space-y-2">
            <span className="text-sm">Welcome, {user?.email}</span>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-md">
            <h3 className="text-xl font-semibold mb-4">Scorekeeping</h3>
            <p className="text-gray-600 mb-4">
              Update game scores and manage tournament progress.
            </p>
            <Button asChild className="w-full">
              <Link href="/staff/scorekeeping">
                Manage Scores
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
