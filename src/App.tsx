import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PersonalLoans from "./pages/PersonalLoans";
import CarLoanRefinance from "./pages/CarLoanRefinance";
import ShortTermRelief from "./pages/ShortTermRelief";
import Heloc from "./pages/Heloc";
import MailOffer from "./pages/MailOffer";
import ForLenders from "./pages/ForLenders";
import ForDealers from "./pages/ForDealers";
import CheckRate from "./pages/CheckRate";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

// Create a single QueryClient instance for your entire app
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/for-lenders" element={<ForLenders />} />
          <Route path="/for-dealers" element={<ForDealers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/check-rate" element={<CheckRate />} />
          <Route path="/personal-loans" element={<PersonalLoans />} />
          <Route path="/car-loan-refinance" element={<CarLoanRefinance />} />
          <Route path="/short-term-relief" element={<ShortTermRelief />} />
          <Route path="/heloc" element={<Heloc />} />
          <Route path="/mail-offer" element={<MailOffer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
