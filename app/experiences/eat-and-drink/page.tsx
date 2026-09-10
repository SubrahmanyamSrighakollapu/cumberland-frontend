import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import EatDrinkHero from "@/components/experiences/EatDrinkHero";
import FeaturedDiningExperience from "@/components/experiences/FeaturedDiningExperience";
import DiningExplorer from "@/components/experiences/DiningExplorer";
import LocalFlavoursItinerary from "@/components/experiences/LocalFlavoursItinerary";
import DiningRecommendationPanel from "@/components/experiences/DiningRecommendationPanel";
import EatDrinkCta from "@/components/experiences/EatDrinkCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Eat & Drink | Cumberland Motor Inn",
  description:
    "Explore local cafés, vineyard bistros and relaxed pubs near Cumberland Motor Inn, with dining inspiration for every part of your stay.",
};

export default function EatAndDrinkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />
      <main className="flex-1">
        <EatDrinkHero />
        <FeaturedDiningExperience />
        <DiningExplorer />
        <LocalFlavoursItinerary />
        <DiningRecommendationPanel />
        <EatDrinkCta />
      </main>
      <PublicFooter />
    </div>
  );
}
