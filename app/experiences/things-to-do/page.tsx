import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import ThingsToDoHero from "@/components/experiences/ThingsToDoHero";
import ThingsToDoView from "@/components/experiences/ThingsToDoView";
import ActivityDayPlanner from "@/components/experiences/ActivityDayPlanner";
import ActivityPlanningPanel from "@/components/experiences/ActivityPlanningPanel";
import ThingsToDoCta from "@/components/experiences/ThingsToDoCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Things to Do | Cumberland Motor Inn",
  description:
    "Discover scenic walks, golf, family attractions, hot air ballooning and cultural experiences near Cumberland Motor Inn, with ideas to help you plan your stay.",
};

export default function ThingsToDoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
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
