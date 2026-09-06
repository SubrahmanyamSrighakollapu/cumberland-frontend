"use client";

import Image from "next/image";
import { activityCategories, activityBenefits } from "@/data/things-to-do";
import Reveal from "@/components/ui/Reveal";

interface ChooseYourPaceSectionProps {
  onSelectFilter: (filterKey: string) => void;
}

export default function ChooseYourPaceSection({
  onSelectFilter,
}: ChooseYourPaceSectionProps) {
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "waves":
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
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        );
      case "leaf":
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
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case "family":
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
      case "museum":
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V11m0 10V11"
            />
          </svg>
        );
      default:
        return null;
    }
  };

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

  const handleCardClick = (filterKey: string) => {
    onSelectFilter(filterKey);
    const element = document.getElementById("activities");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#f7f4ee] py-14 sm:py-16 lg:py-20 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
              CHOOSE YOUR PACE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a] mb-3">
              Something for every kind of day.
            </h2>
            <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed">
              Whether you’re chasing outdoor adventures, family fun, cultural
              experiences or a slower pace, there’s something for everyone in our
              region.
            </p>
          </div>
        </Reveal>

        {/* 4 Category Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {activityCategories.map((cat, idx) => (
            <Reveal
              key={cat.id}
              direction="up"
              delay={100 + idx * 90}
            >
              <div
                onClick={() => handleCardClick(cat.filterKey)}
                className="bg-white border border-[#d9d0c4] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full"
              >
                <div>
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] bg-[#e9efe8] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-[#e9efe8] shrink-0">
                        {renderCategoryIcon(cat.icon)}
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-[#0f302a] leading-snug">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="px-5 pb-5 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(cat.filterKey);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#80563e] group-hover:text-[#69452f] transition-colors"
                  >
                    EXPLORE &rarr;
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Benefits Strip */}
        <Reveal direction="up" delay={450}>
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
