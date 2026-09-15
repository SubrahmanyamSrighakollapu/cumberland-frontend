import PublicHeader from "@/components/layout/PublicHeader";
import ExperiencesHero from "@/components/experiences/ExperiencesHero";
import ExperiencePillars from "@/components/experiences/ExperiencePillars";
import WineCountryIntro from "@/components/experiences/WineCountryIntro";
import LocationAdvantages from "@/components/experiences/LocationAdvantages";
import ExperiencesGrandCta from "@/components/experiences/ExperiencesGrandCta";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildRouteMetadata({
  title: "Cessnock & Hunter Valley Experiences | Cumberland Motor Inn",
  description:
    "Plan your stay with things to do around Cessnock and the Hunter Valley. Explore wineries, local dining and attractions from Cumberland Motor Inn.",
  canonical: "https://www.cumberlandmotorinn.com.au/experiences",
  socialImage: {
    url: "/images/wine-country.png",
    alt: "Hunter Valley wine country and Cessnock regional experiences",
  },
});

export default function ExperiencesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Experiences", url: "/experiences" },
        ]}
      />
      <PublicHeader />
      <main className="flex-1">
        <ExperiencesHero />
        <ExperiencePillars />
        <WineCountryIntro />
        <LocationAdvantages />
        <ExperiencesGrandCta />
      </main>
      <PublicFooter />
    </div>
  );
}
