import PublicHeader from "@/components/layout/PublicHeader";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FeaturedRoomsSection from "@/components/home/FeaturedRoomsSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";
import LocationSection from "@/components/home/LocationSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";

export const metadata = buildRouteMetadata({
  title: "Motel Accommodation in Cessnock | Cumberland Motor Inn NSW",
  description:
    "Motel Accommodation in Cessnock, Cumberland Motor Inn is located in the heart of Cessnock, the gateway to the Hunter Valley wine country.",
  canonical: "https://www.cumberlandmotorinn.com.au/",
  socialImage: {
    url: "/images/cumberland-main-exterior-day.jpg",
    alt: "Cumberland Motor Inn property exterior in Cessnock",
  },
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-body)]">
      <PublicHeader />
      <main className="flex-1">
        <HeroSection />
        <WelcomeSection />
        <FeaturedRoomsSection />
        <AmenitiesSection />
        <ExperiencesSection />
        <ReviewsSection />
        <GalleryPreviewSection />
        <LocationSection />
        <FinalCtaSection />
      </main>
      <PublicFooter />
    </div>
  );
}
