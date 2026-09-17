import type { Metadata } from "next";
import { buildRouteMetadata } from "@/utils/seo";
import { getAllPublishedRoomsServer, BackendUnavailableError } from "@/utils/publicDataLoader";
import RoomsExplorerClient from "@/components/rooms/RoomsExplorerClient";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RoomDetail } from "@/data/rooms";

export async function generateMetadata(): Promise<Metadata> {
  let rooms: RoomDetail[] = [];
  try {
    rooms = await getAllPublishedRoomsServer();
  } catch (err: unknown) {
    if (err instanceof BackendUnavailableError) {
      rooms = [];
    } else {
      throw err;
    }
  }

  const roomNameKeywords =
    rooms.length > 0
      ? rooms.map((r) => `${r.name} Cessnock`)
      : ["Deluxe Queen Room Cessnock", "Deluxe Twin Room Cessnock", "Family Room Cessnock"];

  const keywords = [
    "Cessnock motel rooms",
    "rooms in Cessnock",
    "accommodation options in Cessnock",
    "Cumberland Motor Inn rooms",
    ...roomNameKeywords,
    "rooms for couples in Cessnock",
    "family rooms in Cessnock",
    "shared accommodation rooms in Cessnock",
    "business travel accommodation Cessnock",
    "Cessnock room availability",
    "Cessnock room rates",
    "book motel rooms in Cessnock",
  ];

  return buildRouteMetadata({
    title: "Motel Rooms in Cessnock | Cumberland Motor Inn",
    description:
      "Explore rooms at Cumberland Motor Inn in Cessnock. Compare room features, view photos and check availability for your Hunter Valley stay.",
    keywords,
    canonical: "https://www.cumberlandmotorinn.com.au/rooms",
    socialImage: {
      url: "/images/cumberland-courtyard-accommodation-day.jpg",
      alt: "Guest rooms and courtyard accommodation at Cumberland Motor Inn",
    },
  });
}

export default async function RoomsPage() {
  let initialRooms: RoomDetail[] = [];
  try {
    initialRooms = await getAllPublishedRoomsServer();
  } catch (err: unknown) {
    if (!(err instanceof BackendUnavailableError)) {
      throw err;
    }
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Rooms", url: "/rooms" },
        ]}
      />
      <RoomsExplorerClient initialRooms={initialRooms} />
    </>
  );
}
