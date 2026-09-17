import PublicHeader from "@/components/layout/PublicHeader";
import ThingsToDoHero from "@/components/experiences/ThingsToDoHero";
import ThingsToDoView from "@/components/experiences/ThingsToDoView";
import ActivityDayPlanner from "@/components/experiences/ActivityDayPlanner";
import ActivityPlanningPanel from "@/components/experiences/ActivityPlanningPanel";
import ThingsToDoCta from "@/components/experiences/ThingsToDoCta";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildRouteMetadata({
  title: "Things to Do in Cessnock | Cumberland Motor Inn",
  description:
    "Explore things to do in Cessnock and the Hunter Valley, from local attractions to outdoor activities, while staying at Cumberland Motor Inn.",
  keywords: [
    "things to do in Cessnock",
    "Cessnock attractions",
    "Hunter Valley activities",
    "places to visit near Cessnock",
    "family activities in the Hunter Valley",
    "outdoor activities near Cessnock",
    "Cessnock sightseeing",
    "Hunter Valley day trips",
    "activities near Cumberland Motor Inn",
    "Hunter Valley Gardens Cessnock",
    "Werakata National Park Cessnock",
  ],
  canonical: "https://www.cumberlandmotorinn.com.au/experiences/things-to-do",
  socialImage: {
    url: "/images/thinks-to-do.png",
    alt: "Things to do and regional attractions around Cessnock",
  },
});

export default function ThingsToDoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Experiences", url: "/experiences" },
          { name: "Things to Do", url: "/experiences/things-to-do" },
        ]}
      />
      <PublicHeader />
      <main className="flex-1">
        <ThingsToDoHero />
        <ThingsToDoView />
        <ActivityDayPlanner />
        <ActivityPlanningPanel />
        <ThingsToDoCta />
      </main>
      <PublicFooter />
    </div>
  );
}
