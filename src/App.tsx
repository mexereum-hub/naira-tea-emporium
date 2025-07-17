import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { SearchProvider } from "@/contexts/SearchContext";
import CartSidebar from "@/components/CartSidebar";
import SearchModal from "@/components/SearchModal";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import CategoriesPage from "./pages/Categories";
import Benefits from "./pages/Benefits";
import Subscription from "./pages/Subscription";
import Blog from "./pages/Blog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CartSidebar />
            <SearchModal />
          </BrowserRouter>
        </SearchProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
