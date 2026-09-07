"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { heroSlides } from "@/data/gallery-media";

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  // Touch Swipe Handlers for Mobile background
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Minimum swipe threshold of 40px
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Continuous autoplay carousel (every 5.5s unless explicitly paused by user)
  useEffect(() => {
    if (isUserPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isUserPaused, activeIndex, nextSlide]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
  };

  const toggleUserPause = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsUserPaused((prev) => !prev);
  };

  const handlePrev = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    prevSlide();
  };

  const handleNext = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    nextSlide();
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Cumberland Motor Inn Showcase"
    >
      {/* Slides Container */}
      {heroSlides.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <div
              className={`w-full h-full transition-transform duration-[6000ms] ease-out ${
                isActive ? "scale-[1.035]" : "scale-100"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover object-center"
              />
            </div>
          </div>
        );
      })}

      {/* Hero Image Readability Overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(15, 48, 42, 0.88) 0%, rgba(15, 48, 42, 0.6) 42%, rgba(15, 48, 42, 0.22) 75%, rgba(15, 48, 42, 0.08) 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 via-black/20 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f302a] via-[#0f302a]/60 to-transparent pointer-events-none z-20" />

      {/* Desktop Navigation Side Overlay Arrows (Hidden on Mobile) */}
      <div className="hidden sm:flex absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 z-30 items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-[#0f302a]/60 hover:bg-[#0f302a]/90 text-white border border-white/30 backdrop-blur-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d] hover:scale-105 active:scale-95"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
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
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-[#0f302a]/60 hover:bg-[#0f302a]/90 text-white border border-white/30 backdrop-blur-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d] hover:scale-105 active:scale-95"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
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

      {/* Unified Floating Controls Pill (Includes Compact Arrows on Mobile) */}
      <div
        className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 pointer-events-auto bg-[#0f302a]/90 sm:bg-[#0f302a]/60 px-3.5 py-1.5 rounded-full border border-white/30 sm:border-white/20 backdrop-blur-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {/* Mobile Prev Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          onTouchEnd={handlePrev}
          aria-label="Previous slide"
          className="sm:hidden text-white hover:text-[#52c92d] transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full active:bg-white/20 active:scale-95 touch-manipulation cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={toggleUserPause}
          onTouchEnd={toggleUserPause}
          aria-label={isUserPaused ? "Play slideshow" : "Pause slideshow"}
          className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full transition-all touch-manipulation cursor-pointer ${
            isUserPaused
              ? "bg-[#52c92d] text-[#0f302a] font-bold shadow-[0_0_12px_#52c92d]"
              : "text-white/90 hover:text-white active:bg-white/20"
          }`}
        >
          {isUserPaused ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>

        <div className="w-[1px] h-3.5 bg-white/30" />

        {/* Slide Dots Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualSelect(index);
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  handleManualSelect(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : "false"}
                className={`h-2.5 rounded-full transition-all duration-500 touch-manipulation cursor-pointer ${
                  isActive
                    ? "w-7 sm:w-9 bg-gradient-to-r from-[#e8c5af] to-[#80563e] shadow-[0_0_10px_rgba(232,197,175,0.7)] scale-105"
                    : "w-2.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            );
          })}
        </div>

        {/* Mobile Next Arrow */}
        <button
          type="button"
          onClick={handleNext}
          onTouchEnd={handleNext}
          aria-label="Next slide"
          className="sm:hidden text-white hover:text-[#52c92d] transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full active:bg-white/20 active:scale-95 touch-manipulation cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}


