"use client";

import Image from "next/image";
import { itinerarySteps } from "@/data/wine-country";
import Reveal from "@/components/ui/Reveal";

export default function WineDayPlanner() {
  return (
    <section
      id="wine-day-plan"
      className="w-full bg-[#f7f4ee] py-14 sm:py-16 lg:py-20 scroll-mt-20 border-b border-[#d9d0c4]/40"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="max-w-2xl mb-10 sm:mb-12">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
              PLAN YOUR WINE COUNTRY DAY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a]">
              A day made for good company.
            </h2>
          </div>
        </Reveal>

        {/* 4-Step Horizontal Itinerary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 relative">
          {itinerarySteps.map((step, idx) => {
            const isLast = idx === itinerarySteps.length - 1;
            const isRowEndMd = idx % 2 === 1;

            return (
              <Reveal
                key={step.id}
                direction="up"
                delay={100 + idx * 90}
                className="relative flex flex-col h-full"
              >
                {/* Card Container */}
                <div className="bg-white border border-[#d9d0c4] rounded-xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-[16/10] bg-[#e9efe8] overflow-hidden shrink-0">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Stage & Time Row */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold tracking-wider text-[#80563e] uppercase">
                        {step.stage}
                      </span>
                      <span className="font-serif text-sm font-semibold text-[#0f302a]">
                        {step.time}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-semibold text-[#0f302a] mb-2 leading-snug">
                      {step.title}
                    </h3>

                    {/* Supporting Text */}
                    <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Horizontal Connector Arrow (Desktop lg: centered at midpoint of 48px gap) */}
                {!isLast && (
                  <div
                    className="hidden lg:flex absolute left-[calc(100%+24px)] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white border border-[#d9d0c4] items-center justify-center text-[#80563e] shadow-md pointer-events-none"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-[#80563e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Horizontal Connector Arrow (Tablet md: centered at midpoint of 40px gap between col 0-1 and 2-3) */}
                {!isLast && !isRowEndMd && (
                  <div
                    className="hidden md:flex lg:hidden absolute left-[calc(100%+20px)] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white border border-[#d9d0c4] items-center justify-center text-[#80563e] shadow-md pointer-events-none"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-[#80563e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Vertical Down Connector Arrow (Mobile sm stacked & Tablet md between rows) */}
                {!isLast && (
                  <div
                    className={`z-30 w-7 h-7 rounded-full bg-white border border-[#d9d0c4] items-center justify-center text-[#80563e] shadow-md pointer-events-none mx-auto my-[-14px] ${
                      isRowEndMd ? "flex md:flex lg:hidden" : "flex md:hidden"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-[#80563e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
