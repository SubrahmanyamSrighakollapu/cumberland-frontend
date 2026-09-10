"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import RoomHeading from "@/components/rooms/RoomHeading";
import RoomGallery from "@/components/rooms/RoomGallery";
import RoomOverview from "@/components/rooms/RoomOverview";
import RoomAmenities from "@/components/rooms/RoomAmenities";
import RoomStayInformation from "@/components/rooms/RoomStayInformation";
import { RelatedRooms } from "@/components/rooms/RelatedRooms";
import { RoomCta } from "@/components/rooms/RoomCta";
import { apiFetch } from "@/utils/apiClient";
import {
  RoomDetail,
  apiRoomToDetail,
  fallbackRoomBySlug,
} from "@/utils/roomDataClient";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export default function RoomDetailPage({ params }: RoomPageProps) {
  const routeParams = useParams<{ slug: string }>();
  const slugParam = (params as any)?.slug || routeParams?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const [apiRoom, setApiRoom] = useState<RoomDetail | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    void (async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/rooms/${encodeURIComponent(slug)}`);
        const item = res?.data;
        if (!cancelled) {
          setApiRoom(item ? apiRoomToDetail(item) : null);
        }
      } catch {
        if (!cancelled) setApiRoom(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const display = useMemo<RoomDetail | null>(() => {
    if (apiRoom) return apiRoom;
    if (apiRoom === null && !loading) {
      return fallbackRoomBySlug(slug) ?? null;
    }
    if (apiRoom === undefined && !loading) {
      return fallbackRoomBySlug(slug) ?? null;
    }
    return null;
  }, [apiRoom, loading, slug]);

  useEffect(() => {
    if (!loading && display) {
      const title =
        display.seoTitle || `${display.name} | Cumberland Motor Inn`;
      document.title = title;
      let meta = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      );
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content =
        display.seoDescription || display.shortDescription || "";
    }
  }, [loading, display]);

  if (!slug) notFound();
  if (!loading && !display) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#50544E]">
      <PublicHeader />

      <main className="flex-1">
        {loading && !display ? (
          <div className="py-24 text-center text-stone-500 text-sm">
            Loading room…
          </div>
        ) : (
          display && (
          <>
            <RoomHeading room={display} />
            <RoomGallery room={display} />
            <RoomOverview room={display} />
            <RoomAmenities room={display} />
            <RoomStayInformation room={display} />
            <RelatedRooms
              currentSlug={display.slug}
              relatedIds={display.relatedRoomIds}
            />
            <RoomCta />
          </>
        )
      )}
      </main>

      <PublicFooter />
    </div>
  );
}
