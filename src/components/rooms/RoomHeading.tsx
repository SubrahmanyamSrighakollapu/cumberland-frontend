"use client";

import Link from "next/link";
import { RoomDetail } from "@/data/rooms";
import Reveal from "@/components/ui/Reveal";

interface RoomHeadingProps {
  room: RoomDetail;
}

export default function RoomHeading({ room }: RoomHeadingProps) {
  return (
    <div className="w-full bg-[#f7f4ee] pt-8 pb-6 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Reveal direction="down" delay={50}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-[#50544e] font-sans tracking-wide">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#0f302a] transition-colors underline-offset-4 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#d9d0c4]">
                /
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-[#0f302a] transition-colors underline-offset-4 hover:underline"
                >
                  Rooms
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#d9d0c4]">
                /
              </li>
              <li className="text-[#0f302a] font-medium">{room.name}</li>
            </ol>
          </nav>
        </Reveal>

        {/* Title, Facts & Price Header Row */}
        <Reveal direction="up" delay={120}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Left Title & Key Facts */}
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
                {room.eyebrow}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[52px] leading-[1.08] font-semibold text-[#0f302a] mb-3">
                {room.name}
              </h1>
              <p className="text-base sm:text-lg text-[#50544e] font-sans leading-relaxed mb-5">
                {room.shortDescription}
              </p>

              {/* Horizontal Key Facts Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#0f302a] font-sans">
                <div className="flex items-center gap-1.5 bg-white border border-[#d9d0c4] px-3 py-1.5 rounded-md shadow-2xs">
                  <svg
                    className="w-4 h-4 text-[#80563e]"
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
                  <span className="font-semibold">{room.guestsLabel}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-[#d9d0c4] px-3 py-1.5 rounded-md shadow-2xs">
                  <svg
                    className="w-4 h-4 text-[#80563e]"
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
                  <span className="font-semibold">{room.bedConfiguration}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-[#d9d0c4] px-3 py-1.5 rounded-md shadow-2xs">
                  <svg
                    className="w-4 h-4 text-[#80563e]"
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
                  <span className="font-semibold">{room.areaLabel}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-[#d9d0c4] px-3 py-1.5 rounded-md shadow-2xs">
                  <svg
                    className="w-4 h-4 text-[#80563e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="font-semibold">{room.viewLabel}</span>
                </div>
              </div>
            </div>

            {/* Right Price Display */}
            <div className="shrink-0 text-left md:text-right pb-1">
              <span className="text-xs sm:text-sm text-[#50544e] font-sans block mb-0.5">
                From
              </span>
              <div className="flex items-baseline md:justify-end gap-1">
                <span className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#0f302a] leading-none">
                  {room.currency}
                  {room.price}
                </span>
                <span className="text-xs sm:text-sm text-[#50544e] font-sans">
                  {room.priceUnit}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
