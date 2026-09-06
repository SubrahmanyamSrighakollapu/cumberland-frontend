import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import RoomHeading from "@/components/rooms/RoomHeading";
import RoomGallery from "@/components/rooms/RoomGallery";
import RoomOverview from "@/components/rooms/RoomOverview";
import RoomAmenities from "@/components/rooms/RoomAmenities";
import RoomStayInformation from "@/components/rooms/RoomStayInformation";
import { RelatedRooms } from "@/components/rooms/RelatedRooms";
import { RoomCta } from "@/components/rooms/RoomCta";
import { getRoomBySlug, getAllRoomSlugs } from "@/data/rooms";

interface RoomPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllRoomSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    return {
      title: "Room Not Found | Cumberland Motor Inn",
    };
  }

  return {
    title: room.seoTitle || `${room.name} | Cumberland Motor Inn`,
    description:
      room.seoDescription ||
      room.shortDescription ||
      `Book ${room.name} at Cumberland Motor Inn. Experience peaceful coastal accommodation and modern room amenities.`,
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#50544E]">
      <PublicHeader />

      <main className="flex-1">
        {/* 1. Header with Breadcrumb, Title, Facts & Price */}
        <RoomHeading room={room} />

        {/* 2. Photo Mosaic Gallery & Lightbox */}
        <RoomGallery room={room} />

        {/* 3. Introduction, Feature Tiles & Reservation Card */}
        <RoomOverview room={room} />

        {/* 4. Amenities Section */}
        <RoomAmenities room={room} />

        {/* 5. Stay Information Accordion & Help Panel */}
        <RoomStayInformation room={room} />

        {/* 6. Related Rooms Section */}
        <RelatedRooms currentSlug={room.slug} relatedIds={room.relatedRoomIds} />

        {/* 7. Bottom Booking CTA Strip */}
        <RoomCta />
      </main>

      <PublicFooter />
    </div>
  );
}
