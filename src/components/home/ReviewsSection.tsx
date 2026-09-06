"use client";

import { useState } from "react";
import { guestReviews } from "@/data/home";
import ReviewCard from "./ReviewCard";
import Reveal from "@/components/ui/Reveal";

export default function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + guestReviews.length) % guestReviews.length
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % guestReviews.length);
  };

  // Compute visible reviews for continuous cycling
  const visibleReviews = [
    guestReviews[startIndex],
    guestReviews[(startIndex + 1) % guestReviews.length],
    guestReviews[(startIndex + 2) % guestReviews.length],
  ];

  return (
    <section className="w-full bg-[#f7f4ee] pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Arrow Controls */}
        <Reveal direction="up" duration={600}>
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
                GUEST REVIEWS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight">
                What our guests say.
              </h2>
            </div>

            {/* Carousel Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous reviews"
                className="p-2.5 rounded-full border border-[#d9d0c4] hover:bg-[#e9efe8] text-[#20382f] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e] hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                aria-label="Next reviews"
                className="p-2.5 rounded-full border border-[#d9d0c4] hover:bg-[#e9efe8] text-[#20382f] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e] hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Review Cards Grid with Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleReviews.map((review, index) => (
            <Reveal
              key={`${review.id}-${startIndex}`}
              direction="up"
              staggerIndex={index}
              duration={600}
            >
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
