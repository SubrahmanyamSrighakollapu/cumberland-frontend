import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryExplorer from "@/components/gallery/GalleryExplorer";
import MoreToExplore from "@/components/gallery/MoreToExplore";
import GalleryFinalCta from "@/components/gallery/GalleryFinalCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Gallery | Cumberland Motor Inn",
  description:
    "Explore rooms, facilities, dining, experiences and the beautiful Cessnock & Hunter Valley surroundings of Cumberland Motor Inn.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-body)]">
      <PublicHeader />
      <main className="flex-1">
        <GalleryHero />
        <GalleryExplorer />
        <MoreToExplore />
        <GalleryFinalCta />
      </main>
      <PublicFooter />
    </div>
  );
}
