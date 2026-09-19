"use client";

import { useState } from "react";
import Image from "next/image";
import { itineraryVariants } from "@/data/things-to-do";
import Reveal from "@/components/ui/Reveal";

export default function ActivityDayPlanner() {
  const [selectedVariantKey, setSelectedVariantKey] = useState<
    "wine" | "golf" | "family"
  >("wine");

  const currentVariant =
    itineraryVariants.find((v) => v.key === selectedVariantKey) ||
    itineraryVariants[0];

  return (
    <section
      id="day-planner"
      className="w-full bg-[#f7f4ee] py-14 sm:py-16 lg:py-20 scroll-mt-20 border-b border-[#d9d0c4]/40"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Segmented Switcher */}
        <Reveal direction="up" delay={50}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2.5 block">
                PLAN YOUR DAY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-semibold text-[#0f302a] mb-3">
                {currentVariant.label}
              </h2>
              <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed">
                {currentVariant.introText}
              </p>
            </div>

            {/* Switcher Buttons */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#d9d0c4] rounded-2xl shadow-xs shrink-0 self-start lg:self-auto">
              {itineraryVariants.map((variant) => {
                const isSelected = selectedVariantKey === variant.key;
                return (
                  <button
                    key={variant.key}
                    type="button"
                    onClick={() => setSelectedVariantKey(variant.key)}
                    className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17352d] ${
                      isSelected
                        ? "bg-[#17352d] text-white shadow-sm"
                        : "text-[#20382f] hover:bg-[#e9efe8] hover:text-[#0f302a]"
                    }`}
                  >
                    {variant.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 6-Step Itinerary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentVariant.steps.map((step, idx) => (
            <Reveal
              key={`${currentVariant.key}-${step.id}`}
              direction="up"
              delay={80 + idx * 60}
              className="flex flex-col h-full"
            >
              {/* Card Container */}
              <div className="bg-white border border-[#d9d0c4] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300 group">
                {/* Thumbnail Image with Time Badge */}
                <div className="relative w-full aspect-[16/10] bg-[#e9efe8] overflow-hidden shrink-0">
                  <Image
                    src={step.image}
                    alt={step.imageAlt || step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-Left Time Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0f302a]/85 backdrop-blur-md text-white border border-white/20 text-xs font-semibold font-sans shadow-md">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{step.time}</span>
                    </span>
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-[#0f302a] text-xs font-bold font-mono flex items-center justify-center shadow-md">
                      {idx + 1}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-[#0f302a] mb-2 leading-snug group-hover:text-[#80563e] transition-colors">
                      {step.title}
                    </h3>

                    {/* Supporting Description */}
                    <p className="text-sm text-[#50544e] font-sans leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
