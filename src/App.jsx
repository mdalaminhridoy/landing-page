import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import ProductsSection from "./components/ProductsSection";
import PromotionalSection from "./components/PromotionalSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // লগইন থাকলে count বাড়বে, না থাকলে alert দেখাবে
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please login first to add products to your cart.");
      return;
    }
    setCount((prev) => prev + 1);
  };

  const handleToggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
    // logout করলে cart count রিসেট হবে
    if (isLoggedIn) setCount(0);
  };

  return (
    <>
      <Navbar
        count={count}
        isLoggedIn={isLoggedIn}
        onToggleLogin={handleToggleLogin}
      />
      <main>
        <Hero />
        <FeaturesSection />
        <ProductsSection onAddToCart={handleAddToCart} />
        <PromotionalSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}