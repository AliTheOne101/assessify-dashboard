import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assessments from "./pages/Assessments";
import AssessmentTake from "./pages/AssessmentTake";
import CompletedAssessments from "./pages/CompletedAssessments";
import CompletedAssessmentView from "./pages/CompletedAssessmentView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessment/:id" element={<AssessmentTake />} />
          <Route path="/completed-assessments" element={<CompletedAssessments />} />
          <Route path="/completed-assessment/:id" element={<CompletedAssessmentView />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;