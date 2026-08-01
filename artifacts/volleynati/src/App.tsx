import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";
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

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/landing" component={Landing} />
          <Route path="/history" component={History} />
          <Route path="/sponsors" component={Sponsors} />
          <Route path="/bracket" component={Bracket} />
          <Route path="/staff/login" component={StaffLogin} />
          <Route path="/staff/dashboard" component={StaffDashboard} />
          <Route path="/staff/scorekeeping" component={StaffScorekeeping} />
          <Route path="/staff/scorekeeping/:gameId" component={StaffGameScore} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
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
