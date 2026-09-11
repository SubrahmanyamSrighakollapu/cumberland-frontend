"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";
import {
  RoomDetail,
  fallbackAllRooms,
  apiRoomToDetail,
} from "@/utils/roomDataClient";

export default function RoomsPage() {
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
        if (!cancelled) {
          setApiRooms(items.map(apiRoomToDetail));
        }
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

  const display: RoomDetail[] = useMemo(() => {
    if (apiRooms && apiRooms.length > 0) return apiRooms;
    if (apiRooms && !apiRooms.length && !loading) return fallbackAllRooms();
    if (!apiRooms) return fallbackAllRooms();
    return fallbackAllRooms();
  }, [apiRooms, loading]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#50544E]">
      <PublicHeader />

      <main className="flex-1">
        <section className="bg-[#17352D] text-white py-16 md:py-24">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal direction="up" delay={50}>
              <p className="text-[#e8c5af] text-md font-bold uppercase tracking-[0.2em] mb-3 font-manrope">
                ACCOMMODATION
              </p>
              <h1 className="text-4xl md:text-6xl font-cormorant font-normal mb-4">
                Our Room Collection
              </h1>
              <p className="max-w-2xl mx-auto text-stone-300 text-base md:text-lg font-manrope font-light leading-relaxed">
                Thoughtfully appointed spaces crafted for quiet comfort, relaxed style, and an enjoyable Hunter Valley stay.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            {loading && !apiRooms ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-[#D9D0C4]/60 overflow-hidden h-[460px] animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {display.map((room, idx) => {
                  const firstImg =
                    room.gallery[0]?.src ||
                    normalizeAssetUrl("/images/hero_background.jpg");
                  const firstImgAlt =
                    room.gallery[0]?.alt || room.name;
                  return (
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
                              src={firstImg}
                              alt={firstImgAlt}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </ImageReveal>

                          <div className="p-6 flex flex-col">
                            <h2 className="text-2xl text-[#17352D] font-cormorant font-semibold mb-2 line-clamp-1 min-h-[2rem] flex items-center">
                              {room.name}
                            </h2>
                            <p className="text-[#50544E] text-sm font-manrope mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                              {room.shortDescription}
                            </p>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#50544E] font-manrope mb-4 pb-3.5 border-b border-[#D9D0C4]/40 min-h-[2.25rem]">
                              <span className="font-medium">
                                {room.guestsLabel}
                              </span>
                              <span className="text-[#D9D0C4]">•</span>
                              <span className="font-medium">
                                {room.bedConfiguration}
                              </span>
                              {room.areaLabel && (
                                <>
                                  <span className="text-[#D9D0C4]">•</span>
                                  <span className="font-medium">
                                    {room.areaLabel}
                                  </span>
                                </>
                              )}
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
                            <span className="text-2xl font-cormorant font-bold text-[#17352D]">
                              {room.currency}
                              {room.price}
                            </span>
                            <span className="text-xs text-[#50544E] font-manrope ml-1">
                              {room.priceUnit}
                            </span>
                          </div>

                          <Link
                            href={`/rooms/${room.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#17352D] hover:bg-[#0F302A] text-white text-xs font-semibold rounded font-manrope uppercase tracking-wider transition-colors"
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
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
