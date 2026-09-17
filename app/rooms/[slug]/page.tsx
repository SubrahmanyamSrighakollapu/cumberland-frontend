import { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildRouteMetadata, generateRoomKeywords } from "@/utils/seo";
import { getPublishedRoomBySlugServer, BackendUnavailableError } from "@/utils/publicDataLoader";
import { fallbackRoomBySlug, RoomDetail } from "@/utils/roomDataClient";
import RoomDetailClient from "@/components/rooms/RoomDetailClient";
import { BreadcrumbJsonLd, RoomAccommodationJsonLd } from "@/components/seo/JsonLd";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

async function getRoomForSlug(slug: string): Promise<RoomDetail | null> {
  try {
    return await getPublishedRoomBySlugServer(slug);
  } catch (err: unknown) {
    if (err instanceof BackendUnavailableError) {
      return fallbackRoomBySlug(slug) || null;
    }
    throw err;
  }
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) return {};

  const room = await getRoomForSlug(slug);
  if (!room) {
    return {
      title: "Room Not Found | Cumberland Motor Inn",
      description: "The requested accommodation room could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title =
    room.seoTitle && room.seoTitle !== room.name
      ? room.seoTitle.includes("Cumberland Motor Inn")
        ? room.seoTitle
        : `${room.seoTitle} | Cumberland Motor Inn`
      : `${room.name} in Cessnock | Cumberland Motor Inn`;

  const bedInfo = room.bedConfiguration ? `, ${room.bedConfiguration}` : "";
  const guestInfo = room.guestsLabel ? `, ${room.guestsLabel}` : "";

  const description =
    room.seoDescription && room.seoDescription.length > 20
      ? room.seoDescription
      : `Explore the ${room.name} at Cumberland Motor Inn in Cessnock${guestInfo}${bedInfo}. View photos, room features and availability for your Hunter Valley stay.`;

  const socialImage =
    room.gallery && room.gallery.length > 0
      ? { url: room.gallery[0].src, alt: room.gallery[0].alt || room.name }
      : {
          url: "/images/cumberland-main-exterior-day.jpg",
          alt: "Cumberland Motor Inn property exterior in Cessnock",
        };

  const keywords = generateRoomKeywords(room);

  return buildRouteMetadata({
    title,
    description,
    keywords,
    canonical: `https://www.cumberlandmotorinn.com.au/rooms/${slug}`,
    socialImage,
  });
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) notFound();

  const room = await getRoomForSlug(slug);
  if (!room) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Rooms", url: "/rooms" },
          { name: room.name, url: `/rooms/${room.slug}` },
        ]}
      />
      <RoomAccommodationJsonLd room={room} />
      <RoomDetailClient room={room} />
    </>
  );
}
