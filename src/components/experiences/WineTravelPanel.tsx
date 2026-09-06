"use client";

import Image from "next/image";
import Link from "next/link";
import { travelOptions } from "@/data/wine-country";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function WineTravelPanel() {
  const renderTravelIcon = (iconName: string) => {
    switch (iconName) {
      case "bus":
        return (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h8m-8 4h8m-9 8h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zm-2 0v2a1 1 0 001 1h1a1 1 0 001-1v-2m10 0v2a1 1 0 001 1h1a1 1 0 001-1v-2"
            />
          </svg>
        );
      case "car":
        return (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 9l2-4h14l2 4M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M3 9h18"
            />
          </svg>
        );
      case "steering":
        return (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12L3 9.5M12 12l9-2.5M12 12v9"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-[#f7f4ee] pb-14 sm:pb-16 lg:pb-20 pt-6">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f302a] text-[#f7f4ee] rounded-2xl p-6 sm:p-10 lg:p-14 shadow-xl border border-[#17352d]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <Reveal direction="up" delay={50}>
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-semibold text-white mb-4">
                    Travel safely and comfortably.
                  </h2>
                  <p className="text-sm sm:text-base text-[#f7f4ee]/85 font-sans leading-relaxed mb-8">
                    Make the most of your wine country experience with guided
                    tours, private transfers or your own vehicle. However you
                    choose to explore, we’re here to help.
                  </p>

                  {/* 3 Travel Options */}
                  <div className="space-y-5 mb-8">
                    {travelOptions.map((opt) => (
                      <div key={opt.id} className="flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-[#17352d] border border-white/10 shrink-0">
                          {renderTravelIcon(opt.icon)}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-white leading-tight">
                            {opt.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#f7f4ee]/75 font-sans leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#17352d]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-6 bg-[#80563e] hover:bg-[#69452f] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                  >
                    ASK OUR TEAM &rarr;
                  </Link>

                  <a
                    href="#wine-country-map"
                    className="inline-flex items-center justify-center h-12 px-6 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    GET DIRECTIONS
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Map Image Column */}
            <div
              id="wine-country-map"
              className="lg:col-span-6 scroll-mt-24"
            >
              <ImageReveal className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg border border-[#17352d] bg-[#17352d]/60" delay={150}>
                <Image
                  src="/images/content-image-four.png"
                  alt="Wine Country route map illustration with scenic vineyard destinations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 bg-[#0f302a]/90 backdrop-blur-sm border border-white/10 text-white text-xs px-3.5 py-2 rounded-lg font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#52c92d] animate-pulse" />
                  <span>Regional Wine Country Route Map</span>
                </div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
