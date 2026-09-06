"use client";

import { RoomDetail } from "@/data/rooms";
import RoomReservationCard from "./RoomReservationCard";
import Reveal from "@/components/ui/Reveal";

interface RoomOverviewProps {
  room: RoomDetail;
}

export default function RoomOverview({ room }: RoomOverviewProps) {
  const { intro } = room;

  const renderTileIcon = (iconName: string) => {
    switch (iconName) {
      case "person":
        return (
          <svg
            className="w-5 h-5 text-[#80563e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "bed":
        return (
          <svg
            className="w-5 h-5 text-[#80563e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "area":
        return (
          <svg
            className="w-5 h-5 text-[#80563e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        );
      case "balcony":
      case "patio":
      case "view":
        return (
          <svg
            className="w-5 h-5 text-[#80563e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-[#f7f4ee] py-12 lg:py-16 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Introduction & Feature Tiles */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Reveal direction="up" delay={50}>
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
                  {intro.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a] mb-4">
                  {intro.heading}
                </h2>

                <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed mb-4">
                  {intro.paragraph1}
                </p>
                <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed mb-8">
                  {intro.paragraph2}
                </p>

                {/* 4 Feature Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {intro.featureTiles.map((tile) => (
                    <div
                      key={tile.id}
                      className="bg-white border border-[#d9d0c4] rounded-xl p-4 text-center flex flex-col items-center justify-center min-h-[90px] shadow-2xs"
                    >
                      <div className="mb-2">{renderTileIcon(tile.icon)}</div>
                      <span className="text-xs sm:text-sm font-semibold text-[#0f302a] font-sans">
                        {tile.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Reservation Card */}
          <div className="lg:col-span-5 w-full">
            <Reveal direction="up" delay={150}>
              <RoomReservationCard room={room} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
