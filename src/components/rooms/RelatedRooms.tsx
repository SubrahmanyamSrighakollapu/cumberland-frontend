"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";
import {
  RoomDetail,
  apiRoomToDetail,
  fallbackAllRooms,
  getRelatedRoomsFromIds,
} from "@/utils/roomDataClient";

interface RelatedRoomsProps {
  currentSlug: string;
  relatedIds?: string[];
}

export const RelatedRooms: React.FC<RelatedRoomsProps> = ({
  currentSlug,
  relatedIds,
}) => {
  const [apiRooms, setApiRooms] = useState<RoomDetail[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        setLoading(true);
        const res = await apiFetch(
          "/rooms?published_only=true&limit=200&offset=0"
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

  const related = useMemo<RoomDetail[]>(() => {
    const pool =
      apiRooms && apiRooms.length > 0
        ? apiRooms
        : fallbackAllRooms();
    return getRelatedRoomsFromIds(
      relatedIds ?? [],
      pool,
      currentSlug,
      3
    );
  }, [apiRooms, relatedIds, currentSlug]);

  if (!loading && related.length === 0) return null;

  return (
    <section className="bg-[#F7F4EE] py-16 md:py-20 border-t border-[#D9D0C4]/60">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={50}>
          <div className="mb-10 text-left">
            <p className="text-[#80563E] text-xs font-semibold uppercase tracking-widest mb-2 font-manrope">
              EXPLORE MORE
            </p>
            <h2 className="text-3xl md:text-4xl text-[#17352D] font-cormorant font-normal">
              You may also like.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading && !apiRooms
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] w-full rounded-xl bg-stone-100 animate-pulse"
                />
              ))
            : related.map((room, idx) => (
                <Reveal
                  key={room.id}
                  direction="up"
                  delay={100 + idx * 90}
                  className="h-full"
                >
                  <div className="bg-white rounded-xl border border-[#D9D0C4]/60 overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full w-full justify-between">
                    <div>
                      <ImageReveal className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 shrink-0">
                        <Image
                          src={
                            room.gallery[0]?.src ||
                            normalizeAssetUrl("/images/hero_background.jpg")
                          }
                          alt={room.gallery[0]?.alt || room.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </ImageReveal>

                      <div className="p-6 flex flex-col">
                        <h3 className="text-2xl text-[#17352D] font-cormorant font-semibold mb-2 line-clamp-1 min-h-[2rem] flex items-center">
                          {room.name}
                        </h3>
                        <p className="text-[#50544E] text-sm font-manrope mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                          {room.shortDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#50544E] font-manrope mb-4 pb-3.5 border-b border-[#D9D0C4]/40 min-h-[2.25rem]">
                          <span className="flex items-center gap-1.5 font-medium">
                            <svg
                              className="w-3.5 h-3.5 text-[#80563E] shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.75}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {room.guestsLabel}
                          </span>
                          <span className="text-[#D9D0C4]">•</span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <svg
                              className="w-3.5 h-3.5 text-[#80563E] shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.75}
                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                              />
                            </svg>
                            {room.bedConfiguration}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-2 min-h-[2.75rem] content-start">
                          {room.highlights.slice(0, 3).map((highlight, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f7f4ee] text-[11px] font-medium text-[#20382f] border border-[#d9d0c4]/40 font-manrope"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#D9D0C4]/40 shrink-0 h-[64px] bg-[#faf8f5]/50 mt-auto">
                      <div>
                        <span className="text-xs text-[#50544E] font-manrope block leading-none">
                          From
                        </span>
                        <span className="text-xl font-cormorant font-bold text-[#17352D]">
                          {room.currency}
                          {room.price}
                        </span>
                        <span className="text-xs text-[#50544E] font-manrope ml-1">
                          {room.priceUnit}
                        </span>
                      </div>

                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#80563E] hover:text-[#69452F] font-manrope uppercase tracking-wider transition-colors"
                      >
                        VIEW ROOM
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
};
