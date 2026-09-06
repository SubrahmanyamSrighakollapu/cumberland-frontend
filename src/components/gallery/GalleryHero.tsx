"use client";

import Image from "next/image";
import Link from "next/link";
import { galleryHeroData } from "@/data/gallery";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function GalleryHero() {
  return (
    <section className="w-full bg-[#0f302a] text-white overflow-hidden">
      <div className="w-full min-h-[400px] lg:min-h-[440px] grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Content Panel (~38% width on desktop) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 lg:py-14 bg-[#0f302a] z-10">
          <div className="max-w-[440px] mx-auto lg:mx-0 w-full">
            {/* Breadcrumb */}
            <Reveal direction="down" delay={50}>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 text-xs text-[#f7f4ee]/70 font-sans">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      {galleryHeroData.breadcrumbHome}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white font-medium" aria-current="page">
                    {galleryHeroData.breadcrumbCurrent}
                  </li>
                </ol>
              </nav>
            </Reveal>

            {/* Eyebrow */}
            <Reveal direction="up" delay={150}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#e9efe8] uppercase mb-3 block">
                {galleryHeroData.eyebrow}
              </span>
            </Reveal>

            {/* Main Heading */}
            <Reveal direction="up" delay={250}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[0.98] tracking-tight mb-4">
                {galleryHeroData.headingLines[0]}
                <br />
                {galleryHeroData.headingLines[1]}
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal direction="up" delay={350}>
              <p className="text-base text-[#f7f4ee]/90 leading-relaxed font-sans max-w-[430px]">
                {galleryHeroData.description}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right Hero Image Panel (~62% width on desktop) */}
        <div className="lg:col-span-7 xl:col-span-8 relative min-h-[300px] lg:min-h-full aspect-[4/3] lg:aspect-auto">
          <ImageReveal className="w-full h-full min-h-[300px] lg:min-h-full" delay={200}>
            <Image
              src={galleryHeroData.image}
              alt={galleryHeroData.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover object-center"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
