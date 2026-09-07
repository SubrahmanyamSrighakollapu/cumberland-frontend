import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import WineCountryIntro from "@/components/experiences/WineCountryIntro";
import EatDrinkCta from "@/components/experiences/EatDrinkCta";
import ThingsToDoCta from "@/components/experiences/ThingsToDoCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Experiences | Cumberland Motor Inn",
  description:
    "Explore unforgettable coastal experiences near Cumberland Motor Inn, from wine country tours to local dining and seaside outdoor adventures.",
};

export default function ExperiencesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-[#17352d] text-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-3 block">
              LOCAL DESTINATIONS
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal mb-4">
              Explore Our Region
            </h1>
            <p className="max-w-2xl mx-auto text-[#f7f4ee]/85 text-base sm:text-lg font-light leading-relaxed">
              From world-class vineyards and waterfront dining to scenic coastal tracks, Cumberland Motor Inn is your gateway to the best of the coast.
            </p>
          </div>
        </section>

        {/* Featured Experiences Grid */}
        <ExperiencesSection />

        <WineCountryIntro />

        <section className="py-16 sm:py-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <EatDrinkCta />
          <ThingsToDoCta />
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
