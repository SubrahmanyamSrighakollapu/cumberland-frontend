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
