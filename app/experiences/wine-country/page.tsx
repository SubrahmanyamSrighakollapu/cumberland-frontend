import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import WineCountryHero from "@/components/experiences/WineCountryHero";
import WineCountryIntro from "@/components/experiences/WineCountryIntro";
import WineryExplorer from "@/components/experiences/WineryExplorer";
import WineDayPlanner from "@/components/experiences/WineDayPlanner";
import WineTravelPanel from "@/components/experiences/WineTravelPanel";
import WineCountryCta from "@/components/experiences/WineCountryCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Wine Country | Cumberland Motor Inn",
  description:
    "Discover boutique vineyards, scenic cellar doors and world-class wines within easy reach of Cumberland Motor Inn.",
};

export default function WineCountryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />
      <main className="flex-1">
        <WineCountryHero />
        <WineCountryIntro />
        <WineryExplorer />
        <WineDayPlanner />
        <WineTravelPanel />
        <WineCountryCta />
      </main>
      <PublicFooter />
    </div>
  );
}
