"use client";

import Image from "next/image";
import { locationSectionData } from "@/data/contact";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function ContactLocationSection() {
  const renderCardIcon = (iconName: string) => {
    switch (iconName) {
      case "car":
        return (
          <svg
            className="w-6 h-6 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zm0 0h6l3-5v-5h-9v10z"
            />
          </svg>
        );
      case "transit":
        return (
          <svg
            className="w-6 h-6 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h8m-8 4h8m-4 8v2m-4-2v2m-4-8h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1z"
            />
          </svg>
        );
      case "arrival":
        return (
          <svg
            className="w-6 h-6 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        );
    }
  };

  const renderNearbyIcon = (iconName: string) => {
    switch (iconName) {
      case "beach":
        return (
          <svg
            className="w-4 h-4 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </svg>
        );
      case "town":
        return (
          <svg
            className="w-4 h-4 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9"
            />
          </svg>
        );
      case "dining":
        return (
          <svg
            className="w-4 h-4 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      case "wine":
        return (
          <svg
            className="w-4 h-4 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
        );
    }
  };

  return (
    <section className="w-full bg-[#e9efe8] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="mb-10 md:mb-12">
            <span className="text-xs font-semibold tracking-[0.16em] text-[#80563e] uppercase mb-2 block">
              {locationSectionData.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-3">
              {locationSectionData.heading}
            </h2>
            <p className="text-base text-[#50544e] font-sans max-w-2xl leading-relaxed">
              {locationSectionData.description}
            </p>
          </div>
        </Reveal>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Map Panel (~58% width) */}
          <div className="lg:col-span-7">
            <ImageReveal className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#d9d0c4] bg-white shadow-xs" delay={150}>
              <Image
                src={locationSectionData.mapImage}
                alt={locationSectionData.mapAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
            </ImageReveal>
          </div>

          {/* Right Travel Information (~40% width) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            {/* 3 Getting Here Stacked Cards */}
            <div className="space-y-4 mb-8">
              {locationSectionData.gettingHereCards.map((card, idx) => (
                <Reveal key={card.id} direction="up" delay={100 + idx * 80}>
                  <div className="bg-white border border-[#d9d0c4] rounded-md p-4 sm:p-5 flex items-start gap-4 shadow-xs">
                    <div className="p-2.5 rounded-md bg-[#e9efe8] text-[#20382f] shrink-0 mt-0.5">
                      {renderCardIcon(card.iconName)}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#20382f] font-normal mb-1">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#50544e] leading-relaxed font-sans">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Close To Everything Compact Row */}
            <Reveal direction="up" delay={350}>
              <div className="pt-6 border-t border-[#d9d0c4]">
                <span className="text-[11px] font-semibold tracking-wider text-[#20382f] uppercase block mb-3">
                  CLOSE TO EVERYTHING
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3">
                  {locationSectionData.nearbyDestinations.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#d9d0c4]/80 shadow-xs hover:border-[#80563e]/40 transition-colors min-w-0"
                    >
                      <div className="p-2 rounded-md bg-[#e9efe8] text-[#20382f] shrink-0 flex items-center justify-center">
                        {renderNearbyIcon(item.iconName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-[#20382f] truncate leading-tight">
                          {item.label}
                        </div>
                        <div className="text-[11px] font-medium text-[#80563e] mt-0.5 whitespace-nowrap">
                          {item.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
