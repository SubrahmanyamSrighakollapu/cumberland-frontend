"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import RoomCard from "./RoomCard";
import Reveal from "@/components/ui/Reveal";
import { apiFetch } from "@/utils/apiClient";
import { Room } from "@/data/home";
import {
  RoomDetail,
  fallbackFeaturedRooms,
  apiRoomToDetail,
} from "@/utils/roomDataClient";

function toHomeRoom(r: RoomDetail): Room {
  const amenityLabels = r.amenities?.slice(0, 2).map((a) => a.title) ?? [];
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.shortDescription,
    image: r.gallery[0]?.src || "",
    guests: r.guestsLabel || `${r.capacityGuests} Guests`,
    bed: r.bedConfiguration,
    amenities: [...(r.highlights?.slice(0, 3) ?? []), ...amenityLabels].slice(
      0,
      4
    ),
    price: r.price,
  };
}

export default function FeaturedRoomsSection() {
  const [apiRooms, setApiRooms] = useState<RoomDetail[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        setLoading(true);
        const res = await apiFetch(
          "/rooms?published_only=true&featured_only=true&limit=9&offset=0"
        );
        const items = Array.isArray(res?.data?.items) ? res.data.items : [];
        if (!cancelled) setApiRooms(items.map(apiRoomToDetail));
      } catch {
        if (!cancelled) setApiRooms([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const display: Room[] = useMemo(() => {
    const rooms: RoomDetail[] = (() => {
      if (apiRooms && apiRooms.length > 0) return apiRooms.slice(0, 3);
      if (apiRooms && !apiRooms.length && !loading)
        return fallbackFeaturedRooms();
      if (!apiRooms) return fallbackFeaturedRooms();
      return fallbackFeaturedRooms();
    })();
    return rooms.map(toHomeRoom);
  }, [apiRooms, loading]);

  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
                OUR ROOMS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight">
                Rooms designed for real rest.
              </h2>
            </div>

            <div>
              <Link
                href="/rooms"
                className="group inline-flex items-center justify-center gap-1.5 h-[46px] px-6 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-sm font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
              >
                <span>VIEW ALL ROOMS</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading && !apiRooms
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] w-full bg-stone-100 rounded-2xl animate-pulse"
                />
              ))
            : display.map((room, index) => (
                <Reveal
                  key={room.id}
                  direction="up"
                  staggerIndex={index}
                  duration={600}
                  className="h-full"
                >
                  <RoomCard room={room} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
