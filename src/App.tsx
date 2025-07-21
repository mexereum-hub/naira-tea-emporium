import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CartSidebar from "@/components/CartSidebar";
import SearchModal from "@/components/SearchModal";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import CategoriesPage from "./pages/Categories";
import Benefits from "./pages/Benefits";
import Subscription from "./pages/Subscription";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import CategoryImmunity from "./pages/CategoryImmunity";
import CategoryEnergy from "./pages/CategoryEnergy";
import CategorySleep from "./pages/CategorySleep";
import Gifts from "./pages/Gifts";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Track from "./pages/Track";
import Wholesale from "./pages/Wholesale";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/story" element={<Story />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/category/immunity" element={<CategoryImmunity />} />
              <Route path="/category/energy" element={<CategoryEnergy />} />
              <Route path="/category/sleep" element={<CategorySleep />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/support" element={<Support />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/track" element={<Track />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CartSidebar />
            <SearchModal />
          </BrowserRouter>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
