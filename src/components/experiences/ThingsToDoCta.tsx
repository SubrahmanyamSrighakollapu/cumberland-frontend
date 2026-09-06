"use client";

import Link from "next/link";
import { thingsToDoCtaData } from "@/data/things-to-do";
import Reveal from "@/components/ui/Reveal";

export default function ThingsToDoCta() {
  const { heading, supportingText, primaryCta, secondaryCta } =
    thingsToDoCtaData;

  return (
    <section className="w-full bg-[#80563e] text-white py-12 sm:py-14 lg:py-16 relative overflow-hidden">
      <Reveal direction="up" delay={50}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Copy */}
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-semibold text-white mb-3">
                {heading}
              </h2>
              <p className="text-sm sm:text-base text-[#f7f4ee]/90 font-sans leading-relaxed">
                {supportingText}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center h-12 px-6 border border-white hover:bg-white/10 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {primaryCta.label}
              </Link>

              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center h-12 px-6 bg-white hover:bg-white/90 text-[#80563e] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
