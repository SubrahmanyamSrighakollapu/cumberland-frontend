import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import ExperiencesHero from "@/components/experiences/ExperiencesHero";
import ExperiencePillars from "@/components/experiences/ExperiencePillars";
import WineCountryIntro from "@/components/experiences/WineCountryIntro";
import LocationAdvantages from "@/components/experiences/LocationAdvantages";
import ExperiencesGrandCta from "@/components/experiences/ExperiencesGrandCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Experiences & Attractions | Cumberland Motor Inn",
  description:
    "Discover Hunter Valley experiences near Cumberland Motor Inn in Cessnock, including wine country tours, local dining, golf, and regional attractions.",
};

export default function ExperiencesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />
      <main className="flex-1">
        {/* Luxury Hero Banner */}
        <ExperiencesHero />

        {/* 3 Pillar Experience Cards (Wine Country, Eat & Drink, Things to Do) */}
        <ExperiencePillars />

        {/* Wine Country Detailed Section */}
        <WineCountryIntro />

        {/* Location Advantages / Why Base Here */}
        <LocationAdvantages />

        {/* Unified Grand Call-to-Action */}
        <ExperiencesGrandCta />
      </main>
      <PublicFooter />
    </div>
  );
}
