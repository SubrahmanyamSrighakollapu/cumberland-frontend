import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import AboutHero from "@/components/about/AboutHero";
import OurStorySection from "@/components/about/OurStorySection";
import WhyChooseUsSection from "@/components/about/WhyChooseUsSection";
import CumberlandExperienceSection from "@/components/about/CumberlandExperienceSection";
import AboutTestimonialSection from "@/components/about/AboutTestimonialSection";
import AboutFinalCta from "@/components/about/AboutFinalCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "About Us | Cumberland Motor Inn",
  description:
    "Discover Cumberland Motor Inn, a welcoming coastal stay offering comfortable rooms, thoughtful facilities and friendly local hospitality.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-body)]">
      <PublicHeader />
      <main className="flex-1">
        <AboutHero />
        <OurStorySection />
        <WhyChooseUsSection />
        <CumberlandExperienceSection />
        <AboutTestimonialSection />
        <AboutFinalCta />
      </main>
      <PublicFooter />
    </div>
  );
}
