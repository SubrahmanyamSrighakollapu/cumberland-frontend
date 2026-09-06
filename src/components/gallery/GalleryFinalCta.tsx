"use client";

import Link from "next/link";
import { galleryCtaData } from "@/data/gallery";
import Reveal from "@/components/ui/Reveal";

export default function GalleryFinalCta() {
  return (
    <section className="w-full bg-[#80563e] text-white py-14 sm:py-16 overflow-hidden">
      <Reveal direction="up" delay={50}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2 leading-tight">
              {galleryCtaData.heading}
            </h2>
            <p className="text-base sm:text-lg text-white/90 font-sans max-w-2xl">
              {galleryCtaData.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href={galleryCtaData.exploreRoomsRoute}
              className="inline-flex items-center justify-center h-[50px] px-7 bg-transparent border border-white/80 hover:border-white hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              EXPLORE ROOMS &rarr;
            </Link>

            <Link
              href={galleryCtaData.bookStayRoute}
              className="inline-flex items-center justify-center h-[50px] px-7 bg-white hover:bg-white/95 text-[#80563e] font-semibold text-sm tracking-wider uppercase rounded-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              BOOK YOUR STAY &rarr;
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
