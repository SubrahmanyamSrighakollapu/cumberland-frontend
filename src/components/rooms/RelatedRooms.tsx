"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RoomDetail, getAllRooms } from "@/data/rooms";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

interface RelatedRoomsProps {
  currentSlug: string;
  relatedIds?: string[];
}

export const RelatedRooms: React.FC<RelatedRoomsProps> = ({
  currentSlug,
  relatedIds,
}) => {
  const allRooms = getAllRooms();
  let related: RoomDetail[] = [];

  if (relatedIds && relatedIds.length > 0) {
    related = relatedIds
      .map((id) => allRooms.find((r) => r.id === id || r.slug === id))
      .filter((r): r is RoomDetail => r !== undefined && r.slug !== currentSlug);
  }

  // Fallback: pick rooms from dataset excluding current room
  if (related.length < 3) {
    const candidates = allRooms.filter(
      (r) => r.slug !== currentSlug && !related.some((exist) => exist.id === r.id)
    );
    related = [...related, ...candidates].slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="bg-[#F7F4EE] py-16 md:py-20 border-t border-[#D9D0C4]/60">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {related.map((room, idx) => (
            <Reveal
              key={room.id}
              direction="up"
              delay={100 + idx * 90}
              className="h-full"
            >
              <div className="bg-white rounded-xl border border-[#D9D0C4]/60 overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full w-full justify-between">
                <div>
                  {/* Card Image */}
                  <ImageReveal className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={room.gallery[0]?.src || "/images/hero_background.jpg"}
                      alt={room.gallery[0]?.alt || room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </ImageReveal>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col">
                    <h3 className="text-2xl text-[#17352D] font-cormorant font-semibold mb-2 line-clamp-1 min-h-[2rem] flex items-center">
                      {room.name}
                    </h3>
                    <p className="text-[#50544E] text-sm font-manrope mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {room.shortDescription}
                    </p>

                    {/* Key specs */}
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

                    {/* Room Amenities Pills */}
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

                {/* Price & Action */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#D9D0C4]/40 shrink-0 h-[64px] bg-[#faf8f5]/50 mt-auto">
                  <div>
                    <span className="text-xs text-[#50544E] font-manrope block leading-none">
                      From
                    </span>
                    <span className="text-xl font-cormorant font-bold text-[#17352D]">
                      {room.currency}{room.price}
                    </span>
                    <span className="text-xs text-[#50544E] font-manrope ml-1">
                      / night
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
