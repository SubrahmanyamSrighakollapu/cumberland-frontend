import PublicHeader from "@/components/layout/PublicHeader";
import WineCountryHero from "@/components/experiences/WineCountryHero";
import WineCountryIntro from "@/components/experiences/WineCountryIntro";
import WineDayPlanner from "@/components/experiences/WineDayPlanner";
import WineTravelPanel from "@/components/experiences/WineTravelPanel";
import WineCountryCta from "@/components/experiences/WineCountryCta";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildRouteMetadata({
  title: "Explore Hunter Valley Wine Country | Cumberland Motor Inn",
  description:
    "Discover Hunter Valley wine country during your Cessnock stay. Explore cellar doors and plan winery visits from your base at Cumberland Motor Inn.",
  canonical: "https://www.cumberlandmotorinn.com.au/experiences/wine-country",
  socialImage: {
    url: "/images/wine-country.png",
    alt: "Hunter Valley vineyard and cellar door tasting experience",
  },
});

export default function WineCountryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Experiences", url: "/experiences" },
          { name: "Wine Country", url: "/experiences/wine-country" },
        ]}
      />
      <PublicHeader />
      <main className="flex-1">
        <WineCountryHero />
        <WineCountryIntro />
        <WineDayPlanner />
        <WineTravelPanel />
        <WineCountryCta />
      </main>
      <PublicFooter />
    </div>
  );
}
