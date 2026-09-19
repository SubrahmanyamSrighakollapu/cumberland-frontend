"use client";

import { useState } from "react";
import Image from "next/image";
import {
  browseByMoodData,
  moodCategories,
  activityBenefits,
} from "@/data/things-to-do";
import Reveal from "@/components/ui/Reveal";

interface ChooseYourPaceSectionProps {
  onSelectFilter?: (filterKey: string) => void;
}

export default function ChooseYourPaceSection({
  onSelectFilter,
}: ChooseYourPaceSectionProps) {
  const [activeTabKey, setActiveTabKey] = useState<
    "wine" | "golf" | "family" | "events" | "nature" | "eat-drink"
  >("wine");

  const activeCategory =
    moodCategories.find((c) => c.key === activeTabKey) || moodCategories[0];

  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "car":
        return (
          <svg
            className="w-5 h-5 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 9l2-4h14l2 4M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M3 9h18"
            />
          </svg>
        );
      case "people":
        return (
          <svg
            className="w-5 h-5 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "tag":
        return (
          <svg
            className="w-5 h-5 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        );
      case "leaf":
        return (
          <svg
            className="w-5 h-5 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const isWalk = (badge: string) => badge.toLowerCase().includes("walk");

  return (
    <section
      id="browse-by-mood"
      className="w-full bg-[#f7f4ee] py-14 sm:py-16 lg:py-20 border-b border-[#d9d0c4]/40 scroll-mt-20"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2.5 block">
              {browseByMoodData.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-semibold text-[#0f302a] mb-4">
              {browseByMoodData.heading}
            </h2>
            <p className="text-sm sm:text-[15px] text-[#50544e] font-sans leading-relaxed text-justify sm:text-center">
              {browseByMoodData.description}
            </p>
          </div>
        </Reveal>

        {/* Toggle Category Buttons */}
        <Reveal direction="up" delay={120}>
          <div className="flex items-center justify-center mb-10 sm:mb-12">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-[#d9d0c4] rounded-2xl shadow-xs max-w-full">
              {moodCategories.map((cat) => {
                const isActive = activeTabKey === cat.key;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveTabKey(cat.key);
                      if (onSelectFilter) onSelectFilter(cat.label);
                    }}
                    className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17352d] ${
                      isActive
                        ? "bg-[#17352d] text-white shadow-sm"
                        : "text-[#20382f] hover:bg-[#e9efe8] hover:text-[#0f302a]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 3 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {activeCategory.cards.map((card, idx) => (
            <Reveal
              key={`${activeCategory.key}-${card.id}`}
              direction="up"
              delay={100 + idx * 80}
            >
              <div className="bg-white border border-[#d9d0c4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                {/* Card Image Container with Time Badge */}
                <div className="relative w-full aspect-[16/10] bg-[#e9efe8] overflow-hidden shrink-0">
                  <Image
                    src={card.image}
                    alt={card.imageAlt || card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-Left Time Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0f302a]/85 backdrop-blur-md text-white border border-white/20 text-xs font-semibold font-sans shadow-md">
                      {isWalk(card.timeBadge) ? (
                        <svg
                          className="w-3.5 h-3.5 text-[#52c92d]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7a2 2 0 11-4 0 2 2 0 014 0zM8 21l3-7 2 3 3-1"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 14l3-3 3 1 2-2"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3.5 h-3.5 text-[#e8c5af]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 9l2-4h14l2 4M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M3 9h18"
                          />
                        </svg>
                      )}
                      <span>{card.timeBadge}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0f302a] mb-2 leading-snug group-hover:text-[#80563e] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#50544e] font-sans leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Benefits Strip */}
        <Reveal direction="up" delay={350}>
          <div className="pt-8 border-t border-[#d9d0c4]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0">
              {activityBenefits.map((ben, idx) => (
                <div
                  key={ben.id}
                  className={`flex items-center justify-center gap-3 px-3 sm:px-4 ${
                    idx < activityBenefits.length - 1
                      ? "lg:border-r border-[#d9d0c4]"
                      : ""
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#e9efe8] shrink-0">
                    {renderBenefitIcon(ben.icon)}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#0f302a] font-sans">
                    {ben.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
