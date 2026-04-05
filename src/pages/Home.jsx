import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { Hero } from "../components/sections/Hero";
import { FlashSale } from "../components/sections/FlashSale";
import { ServiceBanner } from "../components/sections/ServiceBanner";
import { HomeTrustBar } from "../components/sections/HomeTrustBar";
import { CategoryShowcase } from "../components/sections/CategoryShowcase";
import { FeaturedCollection } from "../components/sections/FeaturedCollection";
import { SplitBanner } from "../components/sections/SplitBanner";
import { NewArrivals } from "../components/sections/NewArrivals";
import { QuanTayPromoBanner } from "../components/sections/QuanTayPromoBanner";
import { QuanNganSection } from "../components/sections/QuanNganSection";
import { BrandStory } from "../components/sections/BrandStory";
import { Lookbook } from "../components/sections/Lookbook";
import { SocialGalleryStrip } from "../components/sections/SocialGalleryStrip";
import { CustomerReviews } from "../components/sections/CustomerReviews";
import { NewsletterSignup } from "../components/sections/NewsletterSignup";
import { InstagramFeed } from "../components/sections/InstagramFeed";
import { FAQ } from "../components/sections/FAQ";

export function Home() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="overflow-x-hidden bg-white font-sans text-neutral-900 antialiased">
      <Hero />
      <FlashSale />
      <ServiceBanner />
      <HomeTrustBar />
      <CategoryShowcase />
      <FeaturedCollection />
      <SplitBanner />
      <NewArrivals />
      <QuanTayPromoBanner />
      <QuanNganSection />
      <BrandStory />
      <Lookbook />
      <SocialGalleryStrip />
      <InstagramFeed />
      <CustomerReviews />
      <FAQ />
      <NewsletterSignup />
    </div>
  );
}
