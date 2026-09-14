"use client";

import Link from "next/link";
import Image from "next/image";
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
  const [data, setData] = useState<HeroSlideRow[]>(fallbackHeroSlides);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchHeroSlides({ publishedOnly: true })
      .then((rows) => {
        if (!mounted) return;
        if (Array.isArray(rows) && rows.length > 0) {
          setData(rows);
        }
      })
      .catch(() => {
        if (mounted) setData(fallbackHeroSlides());
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const slides = useMemo<HeroSlideRow[]>(() => {
    return data && data.length > 0 ? data : fallbackHeroSlides();
  }, [data]);

  return { slides, loading };
}

export default function HeroSection() {
  const { slides, loading } = useHeroSlides();
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
    "A comfortable and convenient base in Cessnock for exploring the Hunter Valley.";
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

        {/* Subtle Loading Pulse Spinner Indicator while fetching live slides */}
        {loading && (
          <div className="absolute top-6 right-6 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium animate-pulse">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            <span className="text-[11px] tracking-wider uppercase text-white/80">Updating...</span>
          </div>
        )}

        {/* Hero Content Container */}
        <div className="relative z-30 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:py-24 flex items-center justify-between gap-8 pointer-events-none">
          {/* Left Column: Hero Text Content */}
          <div key={reactKey} className="max-w-[880px] lg:max-w-[960px] text-white pointer-events-auto">
            {/* Heading Entrance */}
            <Reveal direction="up" delay={100} duration={750} distance={32}>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.15] tracking-tight text-white drop-shadow-md overflow-visible">
                <span className="inline-block pr-4 pb-1">
                  {headingLine1}
                </span>
                <br />
                <span className="inline-block pr-6 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#f7f4ee] via-[#e8c5af] to-[#ffffff] italic font-serif">
                  {headingLine2}
                </span>
              </h1>
            </Reveal>

            {/* Description Entrance */}
            <Reveal direction="up" delay={220} duration={750} distance={32}>
              <p className="mt-6 mb-8 max-w-[640px] text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#f7f4ee]/90 font-sans font-light">
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
          <div className="hidden lg:block z-30 max-w-[340px] shrink-0 animate-float-slow pointer-events-auto">
            <Reveal direction="left" delay={300} duration={800}>
              <div className="p-6 rounded-2xl bg-[#0b241f]/90 backdrop-blur-2xl border border-[#e8c5af]/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-white space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#b86f4b] to-[#80563e] text-white shrink-0 shadow-md border border-white/20">
                    <svg
                      className="w-5 h-5 text-amber-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-serif font-bold text-white leading-none mb-1">
                      Prime Location
                    </div>
                    <div className="text-xs text-[#f7f4ee]/80 font-sans">
                      Heart of Hunter Valley
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="space-y-3 text-xs text-[#f7f4ee] font-sans font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] shrink-0" />
                    <span>Convenient Cessnock Location</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] shrink-0" />
                    <span>Outdoor Salt-Water Swimming Pool</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] shrink-0" />
                    <span>Free Parking Within Motel</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Floating Availability Bar (Positions exactly 50% in Hero and 50% in Welcome section) */}
      <div className="relative z-40 w-full translate-y-1/2">
        <AvailabilityBar />
      </div>
    </section>
  );
}
