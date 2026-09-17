import PublicHeader from "@/components/layout/PublicHeader";
import EatDrinkHero from "@/components/experiences/EatDrinkHero";
import FeaturedDiningExperience from "@/components/experiences/FeaturedDiningExperience";
import LocalFlavoursItinerary from "@/components/experiences/LocalFlavoursItinerary";
import DiningRecommendationPanel from "@/components/experiences/DiningRecommendationPanel";
import EatDrinkCta from "@/components/experiences/EatDrinkCta";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildRouteMetadata({
  title: "Places to Eat in Cessnock | Cumberland Motor Inn",
  description:
    "Find inspiration for eating out in Cessnock and the Hunter Valley. Explore local cafes, restaurants and dining options during your Cumberland Motor Inn stay.",
  keywords: [
    "places to eat in Cessnock",
    "Cessnock dining",
    "restaurants in Cessnock",
    "cafés in Cessnock",
    "Hunter Valley dining",
    "food and drink near Cumberland Motor Inn",
    "dining during a Cessnock stay",
    "local food experiences in the Hunter Valley",
    "Cessnock pub dining",
    "cafes near Cessnock motel",
  ],
  canonical: "https://www.cumberlandmotorinn.com.au/experiences/eat-and-drink",
  socialImage: {
    url: "/images/eat-drink.png",
    alt: "Dining and cafes near Cumberland Motor Inn in Cessnock",
  },
});

export default function EatAndDrinkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Experiences", url: "/experiences" },
          { name: "Eat & Drink", url: "/experiences/eat-and-drink" },
        ]}
      />
      <PublicHeader />
      <main className="flex-1">
        <EatDrinkHero />
        <FeaturedDiningExperience />
        <LocalFlavoursItinerary />
        <DiningRecommendationPanel />
        <EatDrinkCta />
      </main>
      <PublicFooter />
    </div>
  );
}
