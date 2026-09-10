"use client";

import { useState, useEffect } from "react";
import { guestReviews, Review } from "@/data/home";
import ReviewCard from "./ReviewCard";
import Reveal from "@/components/ui/Reveal";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";

export default function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(guestReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res: any = await apiFetch("/testimonials?published_only=true&limit=50");
        if (cancelled) return;
        const items: any[] = res?.data?.items ?? res?.items ?? [];
        if (items.length > 0) {
          const transformed: Review[] = items.map((row: any) => ({
            id: String(row.id ?? row._id ?? Math.random().toString(36).slice(2)),
            name: row.name,
            date: row.dateText || row.date_text || row.date || "",
            rating: row.rating || 5,
            quote: row.quote,
            avatar: normalizeAssetUrl(row.avatar),
            avatarAlt: row.avatarAlt || row.avatar_alt || row.name,
          }));
          if (transformed.length >= 3) {
            setReviews(transformed);
          } else {
            const padded: Review[] = [...transformed];
            for (let i = 0; padded.length < 3; i++) {
              padded.push(guestReviews[i % guestReviews.length]);
            }
            setReviews(padded);
          }
        }
      } catch {
        // swallow, keep fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + reviews.length) % reviews.length
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % reviews.length);
  };

  // Compute visible reviews for continuous cycling
  const visibleReviews = [
    reviews[startIndex],
    reviews[(startIndex + 1) % reviews.length],
    reviews[(startIndex + 2) % reviews.length],
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

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="w-5 h-5 border-2 border-[#80563e] border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          </div>
        )}

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
