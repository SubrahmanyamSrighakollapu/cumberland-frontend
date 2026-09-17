import PublicHeader from "@/components/layout/PublicHeader";
import AboutHero from "@/components/about/AboutHero";
import OurStorySection from "@/components/about/OurStorySection";
import WhyChooseUsSection from "@/components/about/WhyChooseUsSection";
import CumberlandExperienceSection from "@/components/about/CumberlandExperienceSection";
import AboutTestimonialSection from "@/components/about/AboutTestimonialSection";
import AboutFinalCta from "@/components/about/AboutFinalCta";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildRouteMetadata({
  title: "About Cumberland Motor Inn | Motel in Cessnock",
  description:
    "Get to know Cumberland Motor Inn in Cessnock, a comfortable base for exploring the Hunter Valley. Discover our accommodation, facilities and location.",
  keywords: [
    "about Cumberland Motor Inn",
    "Cumberland Motor Inn Cessnock",
    "Cessnock motel",
    "motel in Cessnock NSW",
    "accommodation in the Hunter Valley region",
    "staying at Cumberland Motor Inn",
    "Cessnock accommodation facilities",
    "Cumberland Motor Inn location",
    "Hunter Valley gateway motel",
    "Cessnock motel amenities",
    "motel lodging Cessnock",
  ],
  canonical: "https://www.cumberlandmotorinn.com.au/about",
  socialImage: {
    url: "/images/cumberland-main-exterior-day.jpg",
    alt: "Cumberland Motor Inn grounds and motel reception in Cessnock",
  },
});

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-body)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
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
