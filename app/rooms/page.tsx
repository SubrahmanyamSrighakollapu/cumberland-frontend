import { buildRouteMetadata } from "@/utils/seo";
import { getAllPublishedRoomsServer, BackendUnavailableError } from "@/utils/publicDataLoader";
import RoomsExplorerClient from "@/components/rooms/RoomsExplorerClient";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RoomDetail } from "@/data/rooms";

export const metadata = buildRouteMetadata({
  title: "Motel Rooms in Cessnock | Cumberland Motor Inn",
  description:
    "Explore rooms at Cumberland Motor Inn in Cessnock. Compare room features, view photos and check availability for your Hunter Valley stay.",
  canonical: "https://www.cumberlandmotorinn.com.au/rooms",
  socialImage: {
    url: "/images/cumberland-courtyard-accommodation-day.jpg",
    alt: "Guest rooms and courtyard accommodation at Cumberland Motor Inn",
  },
});

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
