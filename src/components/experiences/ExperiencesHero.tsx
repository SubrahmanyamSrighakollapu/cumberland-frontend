"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function ExperiencesHero() {
  return (
    <section className="relative bg-[#0f302a] text-white py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* Background Image with Dark Emerald Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/wine-country.png"
          alt="Hunter Valley Wine Country Landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 filter brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f302a]/90 via-[#0f302a]/85 to-[#0f302a]" />
        {/* Fine Radial Light Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,86,62,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal direction="up" delay={50}>
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#80563e]/20 border border-[#80563e]/40 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#52c92d] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#e9efe8]">
                HUNTER VALLEY EXPERIENCES
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] mb-6 drop-shadow-sm">
              Your Gateway to the Hunter Valley
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-[#f7f4ee]/90 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              World-renowned cellar doors, regional bistro dining, scenic national parks, and championship golf courses — all just minutes from your room at Cumberland Motor Inn.
            </p>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-white/10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <span className="block text-lg font-serif font-bold text-white mb-0.5">150+</span>
                <span className="text-[11px] uppercase tracking-wider text-[#f7f4ee]/70 block font-medium">Cellar Doors</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <span className="block text-lg font-serif font-bold text-white mb-0.5">10 Mins</span>
                <span className="text-[11px] uppercase tracking-wider text-[#f7f4ee]/70 block font-medium">To Wineries</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <span className="block text-lg font-serif font-bold text-white mb-0.5">5 Mins</span>
                <span className="text-[11px] uppercase tracking-wider text-[#f7f4ee]/70 block font-medium">To CPAC & Golf</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <span className="block text-lg font-serif font-bold text-white mb-0.5">Free</span>
                <span className="text-[11px] uppercase tracking-wider text-[#f7f4ee]/70 block font-medium">Motel Parking</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
