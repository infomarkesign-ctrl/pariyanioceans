import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import {
  CartPage,
  CheckoutPage,
  ProductListingPage,
  ProductPage,
  SitePage,
} from "./pages/SitePage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function ProductRoute() {
  const { name } = useParams();
  return <ProductPage title={name ? decodeURIComponent(name) : "Product"} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Index />} />
            <Route
              path="/about"
              element={<SitePage pageKey="about" title="About Us" />}
            />
            <Route path="/products" element={<ProductListingPage />} />
            <Route
              path="/products/meat"
              element={<ProductListingPage category="Meat" />}
            />
            <Route
              path="/products/poultry"
              element={<ProductListingPage category="Poultry" />}
            />
            <Route
              path="/products/fish"
              element={<ProductListingPage category="Fish" />}
            />
            <Route
              path="/products/seafood"
              element={<ProductListingPage category="Seafood" />}
            />
            <Route
              path="/products/processed"
              element={<ProductListingPage category="Processed" />}
            />
            <Route path="/product/:name" element={<ProductRoute />} />
            <Route
              path="/quality-hygiene"
              element={
                <SitePage pageKey="quality-hygiene" title="Quality & Hygiene" />
              }
            />
            <Route
              path="/sourcing"
              element={
                <SitePage pageKey="sourcing" title="Sourcing & Procurement" />
              }
            />
            <Route
              path="/facilities"
              element={<SitePage pageKey="facilities" title="Our Facilities" />}
            />
            <Route
              path="/why-choose-us"
              element={
                <SitePage pageKey="why-choose-us" title="Why Choose Us" />
              }
            />
            <Route
              path="/commitment"
              element={<SitePage pageKey="commitment" title="Our Commitment" />}
            />
            <Route
              path="/sustainability"
              element={
                <SitePage pageKey="sustainability" title="Sustainability" />
              }
            />
            <Route
              path="/food-safety"
              element={<SitePage pageKey="food-safety" title="Food Safety" />}
            />
            <Route
              path="/certifications"
              element={
                <SitePage
                  pageKey="certifications"
                  title="Certifications & Compliance"
                />
              }
            />
            <Route
              path="/faq"
              element={
                <SitePage pageKey="faq" title="Frequently Asked Questions" />
              }
            />
            <Route
              path="/blog"
              element={<SitePage pageKey="blog" title="Blog / News" />}
            />
            <Route
              path="/contact"
              element={<SitePage pageKey="contact" title="Contact Us" />}
            />
            <Route
              path="/careers"
              element={<SitePage pageKey="careers" title="Careers" />}
            />
            <Route
              path="/privacy"
              element={<SitePage pageKey="privacy" title="Privacy Policy" />}
            />
            <Route
              path="/terms"
              element={<SitePage pageKey="terms" title="Terms & Conditions" />}
            />
            <Route
              path="/disclaimer"
              element={<SitePage pageKey="disclaimer" title="Disclaimer" />}
            />
            <Route
              path="/shipping"
              element={
                <SitePage
                  pageKey="shipping"
                  title="Shipping & Delivery Policy"
                />
              }
            />
            <Route
              path="/returns"
              element={
                <SitePage pageKey="returns" title="Return & Refund Policy" />
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<SitePage title="My Account" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
