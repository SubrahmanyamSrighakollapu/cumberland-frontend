"use client";

import Image from "next/image";
import Link from "next/link";
import { wineCountryHeroData } from "@/data/wine-country";
import Reveal from "@/components/ui/Reveal";

export default function WineCountryHero() {
  const {
    breadcrumb,
    eyebrow,
    heading,
    description,
    primaryCta,
    secondaryCta,
    heroImage,
    heroImageAlt,
  } = wineCountryHeroData;

  return (
    <section className="relative w-full h-[480px] sm:h-[500px] lg:h-[540px] flex items-center overflow-hidden bg-[#0f302a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Left Gradient Overlay fading toward right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f302a]/95 via-[#0f302a]/75 to-transparent max-w-full sm:w-[85%] lg:w-[65%]" />
        {/* Subtle general shadow overlay for overall readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="max-w-2xl text-white">
          {/* Breadcrumb */}
          <Reveal direction="down" delay={50}>
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs sm:text-sm text-white/80 font-sans tracking-wide">
                <li>
                  <Link
                    href={breadcrumb[0].href}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {breadcrumb[0].label}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50">
                  /
                </li>
                <li className="text-white/70">{breadcrumb[1].label}</li>
                <li aria-hidden="true" className="text-white/50">
                  /
                </li>
                <li className="text-white font-medium">{breadcrumb[2].label}</li>
              </ol>
            </nav>
          </Reveal>

          {/* Eyebrow */}
          <Reveal direction="up" delay={150}>
            <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#52c92d] mb-3">
              {eyebrow}
            </span>
          </Reveal>

          {/* Main Heading */}
          <Reveal direction="up" delay={250}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] leading-[1.05] font-semibold text-white mb-4 whitespace-pre-line tracking-tight">
              {heading}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal direction="up" delay={350}>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-sans max-w-xl mb-8">
              {description}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={450}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center h-12 px-7 bg-[#80563e] hover:bg-[#69452f] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#80563e]"
              >
                {primaryCta.label}
              </Link>

              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center h-12 px-7 bg-transparent hover:bg-white/10 text-white border border-white/80 hover:border-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
