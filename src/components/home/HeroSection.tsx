"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import HeroCarousel, { HeroCarouselSlide } from "./HeroCarousel";
import AvailabilityBar from "./AvailabilityBar";
import Reveal from "@/components/ui/Reveal";

import {
  HeroSlideRow,
  fallbackHeroSlides,
  fetchHeroSlides,
} from "@/utils/heroClient";
import { BOOK_DIRECT_URL } from "@/utils/siteLinks";

function useHeroSlides() {
  const [data, setData] = useState<HeroSlideRow[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchHeroSlides({ publishedOnly: true })
      .then((rows) => {
        if (!mounted) return;
        const list = Array.isArray(rows) && rows.length > 0 ? rows : null;
        setData(list ?? null);
      })
      .catch(() => {
        if (!mounted) setData(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const slides = useMemo<HeroSlideRow[]>(() => {
    if (data && Array.isArray(data) && data.length > 0) return data;
    return fallbackHeroSlides();
  }, [data]);

  return { slides, loading };
}

export default function HeroSection() {
  const { slides } = useHeroSlides();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const len = Math.max(slides?.length ?? 0, 0);
  const clampedIndex = len > 0 ? ((activeIndex % len) + len) % len : 0;
  const activeSlide = slides[clampedIndex] ?? slides[0] ?? null;

  const carouselSlides: HeroCarouselSlide[] = useMemo(
    () =>
      slides.map((s) => ({
        id: s.id,
        image: s.image,
        alt: s.alt,
      })),
    [slides]
  );

  const headingLine1 = activeSlide?.headingLine1 || "Make room for";
  const headingLine2 = activeSlide?.headingLine2 || "the good days.";
  const description =
    activeSlide?.description ||
    "Boutique coastal stays, warmer days and unforgettable moments by the water.";
  const reactKey = activeSlide ? String(activeSlide.id) : `fb-${clampedIndex}`;

  return (
    <section className="relative w-full bg-[#0f302a]">
      {/* Main Hero Viewport Area (clips background elements) */}
      <div className="relative w-full min-h-[580px] md:min-h-[620px] lg:min-h-[660px] flex items-center overflow-hidden">
        {/* Ambient Animated Glow Orbs in Background */}
        <div
          className="absolute top-1/4 left-1/6 w-[420px] h-[420px] rounded-full bg-[#b86f4b]/25 blur-3xl pointer-events-none z-10 animate-float-glow"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] rounded-full bg-[#52c92d]/20 blur-3xl pointer-events-none z-10 animate-float-glow"
          style={{ animationDelay: "-6s" }}
          aria-hidden="true"
        />

        {/* Background Image Carousel & Overlay */}
        <HeroCarousel
          slides={carouselSlides}
          onIndexChange={setActiveIndex}
          autoplayMs={5500}
        />

        {/* Hero Content Container */}
        <div className="relative z-30 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 flex items-center justify-between gap-8">
          {/* Left Column: Hero Text Content */}
          <div key={reactKey} className="max-w-[620px] text-white">
            {/* Heading Entrance */}
            <Reveal direction="up" delay={100} duration={750} distance={32}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[0.96] tracking-tight text-white drop-shadow-md">
                {headingLine1}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7f4ee] via-[#e8c5af] to-[#ffffff] italic font-serif">
                  {headingLine2}
                </span>
              </h1>
            </Reveal>

            {/* Description Entrance */}
            <Reveal direction="up" delay={220} duration={750} distance={32}>
              <p className="mt-6 mb-8 max-w-[500px] text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#f7f4ee]/90 font-sans font-light">
                {description}
              </p>
            </Reveal>

            {/* CTA Buttons Entrance */}
            <Reveal direction="up" delay={360} duration={750} distance={32}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={BOOK_DIRECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2.5 h-[54px] px-8 bg-gradient-to-r from-[#80563e] to-[#69452f] hover:from-[#69452f] hover:to-[#583824] active:scale-[0.98] text-white text-sm font-semibold tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#80563e]"
                >
                  <span>CHECK AVAILABILITY</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-base">
                    &rarr;
                  </span>
                </a>

                <Link
                  href="/rooms"
                  className="inline-flex items-center justify-center h-[54px] px-8 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/40 hover:border-white text-white text-sm font-semibold tracking-wider rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                >
                  EXPLORE ROOMS
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: High-Contrast Luxury Floating Glass Card (Desktop Only) */}
          <div className="hidden lg:block z-30 max-w-[340px] shrink-0 animate-float-slow">
            <Reveal direction="left" delay={300} duration={800}>
              <div className="p-6 rounded-2xl bg-[#0b241f]/90 backdrop-blur-2xl border border-[#e8c5af]/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-white space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#b86f4b] to-[#80563e] text-white shrink-0 shadow-md border border-white/20">
                    <svg
                      className="w-5 h-5 text-amber-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-serif font-bold text-white leading-none mb-1">
                      4.8 <span className="text-xs font-sans text-[#e8c5af]">/ 5.0 Rating</span>
                    </div>
                    <div className="text-xs text-[#f7f4ee]/80 font-sans">
                      Based on 250+ Verified Reviews
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="space-y-3 text-xs text-[#f7f4ee] font-sans font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] shrink-0" />
                    <span>Waterfront Ocean & Lake Views</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] shrink-0" />
                    <span>Heated Outdoor Pool & Spa</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] shrink-0" />
                    <span>Free Parking & EV Charging</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Floating Availability Bar (Sits on seam between Hero & Welcome section) */}
      <div className="relative z-40 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-16">
        <AvailabilityBar />
      </div>
    </section>
  );
}
