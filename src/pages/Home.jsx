import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { Hero } from "../components/sections/Hero";
import { CategoryShowcase } from "../components/sections/CategoryShowcase";
import { FeaturedCollection } from "../components/sections/FeaturedCollection";
import { SplitBanner } from "../components/sections/SplitBanner";
import { NewArrivals } from "../components/sections/NewArrivals";
import { QuanTayPromoBanner } from "../components/sections/QuanTayPromoBanner";
import { QuanNganSection } from "../components/sections/QuanNganSection";
import { BrandStory } from "../components/sections/BrandStory";
import { Lookbook } from "../components/sections/Lookbook";
import { CustomerReviews } from "../components/sections/CustomerReviews";
import { NewsletterSignup } from "../components/sections/NewsletterSignup";

export function Home() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <Hero />
      <CategoryShowcase />
      <FeaturedCollection />
      <SplitBanner />
      <NewArrivals />
      <QuanTayPromoBanner />
      <QuanNganSection />
      <BrandStory />
      <Lookbook />
      <CustomerReviews />
      <NewsletterSignup />
    </div>
  );
}
