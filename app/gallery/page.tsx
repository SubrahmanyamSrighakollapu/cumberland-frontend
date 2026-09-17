import PublicHeader from "@/components/layout/PublicHeader";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryExplorer from "@/components/gallery/GalleryExplorer";
import MoreToExplore from "@/components/gallery/MoreToExplore";
import GalleryFinalCta from "@/components/gallery/GalleryFinalCta";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildRouteMetadata({
  title: "Motel Photos & Gallery | Cumberland Motor Inn Cessnock",
  description:
    "Browse photos of Cumberland Motor Inn in Cessnock. Explore our rooms, motel grounds and facilities before planning your Hunter Valley stay.",
  keywords: [
    "Cumberland Motor Inn photos",
    "Cumberland Motor Inn gallery",
    "Cessnock motel photos",
    "Cumberland Motor Inn room photos",
    "Cessnock accommodation pictures",
    "Deluxe Queen Room photos",
    "Deluxe Twin Room photos",
    "Family Room photos",
    "Cumberland Motor Inn facilities",
    "Cumberland Motor Inn pool photos",
    "Cumberland Motor Inn parking photos",
    "Cessnock motel courtyard photos",
  ],
  canonical: "https://www.cumberlandmotorinn.com.au/gallery",
  socialImage: {
    url: "/images/cumberland-main-exterior-day.jpg",
    alt: "Photographs of Cumberland Motor Inn rooms and facilities",
  },
});

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-body)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ]}
      />
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
