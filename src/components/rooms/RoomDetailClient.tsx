"use client";

import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import RoomHeading from "@/components/rooms/RoomHeading";
import RoomGallery from "@/components/rooms/RoomGallery";
import RoomOverview from "@/components/rooms/RoomOverview";
import RoomAmenities from "@/components/rooms/RoomAmenities";
import RoomStayInformation from "@/components/rooms/RoomStayInformation";
import { RelatedRooms } from "@/components/rooms/RelatedRooms";
import { RoomCta } from "@/components/rooms/RoomCta";
import { RoomDetail } from "@/utils/roomDataClient";

export interface RoomDetailClientProps {
  room: RoomDetail;
}

export default function RoomDetailClient({ room }: RoomDetailClientProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#50544E]">
      <PublicHeader />

      <main className="flex-1">
        <RoomHeading room={room} />
        <RoomGallery room={room} />
        <RoomOverview room={room} />
        <RoomAmenities room={room} />
        <RoomStayInformation room={room} />
        <RelatedRooms
          currentSlug={room.slug}
          relatedIds={room.relatedRoomIds}
        />
        <RoomCta />
      </main>

      <PublicFooter />
    </div>
  );
}
