import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingSplash from "@/components/LoadingSplash";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import History from "@/pages/History";
import Sponsors from "@/pages/Sponsors";
import Bracket from "@/pages/Bracket";
import StaffLogin from "@/pages/StaffLogin";
import StaffDashboard from "@/pages/StaffDashboard";
import StaffScorekeeping from "@/pages/StaffScorekeeping";
import StaffGameScore from "@/pages/StaffGameScore";

const queryClient = new QueryClient();

/**
 * Public pages mapped by exact path. These are rendered directly so we can
 * freeze the displayed page (show the OLD page dimmed) while the splash is
 * visible, then swap to the new page before the splash fades out.
 */
const PUBLIC_PAGES: Record<string, React.ComponentType> = {
  "/":            Home,
  "/landing":     Landing,
  "/history":     History,
  "/sponsors":    Sponsors,
  "/bracket":     Bracket,
  "/staff/login": StaffLogin,
};

function renderForLocation(loc: string) {
  const Comp = PUBLIC_PAGES[loc];
  return Comp ? <Comp /> : null;
}

function Router() {
  // `location` = real browser path (updates immediately on navigation)
  const [location] = useLocation();

  // `displayLoc` = what we actually render (frozen during the splash)
  const [displayLoc, setDisplayLoc] = useState(location);
  const [showSplash, setShowSplash] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (location === displayLoc) return;

    // Cancel any in-flight transition
    timers.current.forEach(clearTimeout);
    timers.current = [];

    // Step 1 – show splash immediately (dims the OLD page still on screen)
    setShowSplash(true);

    // Step 2 – after 500 ms swap the page content under the splash
    const t1 = setTimeout(() => setDisplayLoc(location), 500);

    // Step 3 – after 650 ms begin fading the splash out → new page brightens in
    const t2 = setTimeout(() => setShowSplash(false), 650);

    timers.current = [t1, t2];
    return () => timers.current.forEach(clearTimeout);
  }, [location]);  // intentionally omit displayLoc — we only react to real nav

  const page = renderForLocation(displayLoc);

  return (
    <>
      {/* Splash sits above everything; AnimatePresence handles its exit animation */}
      <AnimatePresence>
        {showSplash && <LoadingSplash key="splash" />}
      </AnimatePresence>

      {/*
       * Render the frozen display location.
       * For staff routes with URL params (e.g. /staff/scorekeeping/:gameId)
       * renderForLocation returns null, so we fall back to Wouter's Switch
       * which reads the real browser URL (already correct for those routes).
       */}
      {page ?? (
        <Switch>
          <Route path="/staff/dashboard"            component={StaffDashboard} />
          <Route path="/staff/scorekeeping"         component={StaffScorekeeping} />
          <Route path="/staff/scorekeeping/:gameId" component={StaffGameScore} />
          <Route component={NotFound} />
        </Switch>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
