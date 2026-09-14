"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { BOOK_DIRECT_URL } from "@/utils/siteLinks";

export default function ExperiencesGrandCta() {
  return (
    <section className="w-full bg-gradient-to-r from-[#0f302a] via-[#17352d] to-[#0f302a] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-[#80563e]/30">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#80563e]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal direction="up" delay={50}>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-md text-center max-w-4xl mx-auto shadow-2xl relative">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-3 block">
              PLAN YOUR GETAWAY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-5 leading-tight">
              Ready to Experience the Hunter Valley?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#f7f4ee]/85 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Book your comfortable room at Cumberland Motor Inn today for direct access to top wineries, dining, and scenic regional attractions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={BOOK_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-13 px-8 bg-[#80563e] hover:bg-[#69452f] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
              >
                <span>BOOK YOUR STAY NOW</span>
                <span className="ml-2" aria-hidden="true">&rarr;</span>
              </a>

              <Link
                href="/rooms"
                className="inline-flex items-center justify-center h-13 px-8 border border-white/30 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                VIEW ROOMS & SUITES
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
