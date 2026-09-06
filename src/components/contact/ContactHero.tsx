"use client";

import Image from "next/image";
import Link from "next/link";
import { contactHeroData } from "@/data/contact";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function ContactHero() {
  return (
    <section className="w-full bg-[#0f302a] text-white overflow-hidden">
      <div className="w-full min-h-[440px] lg:min-h-[480px] grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Content Panel (~46.5% width on desktop) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16 bg-[#0f302a] z-10">
          <div className="max-w-[500px] mx-auto lg:mx-0 w-full">
            {/* Breadcrumb */}
            <Reveal direction="down" delay={50}>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 text-xs text-[#f7f4ee]/70 font-sans">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      {contactHeroData.breadcrumbHome}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white font-medium" aria-current="page">
                    {contactHeroData.breadcrumbCurrent}
                  </li>
                </ol>
              </nav>
            </Reveal>

            {/* Eyebrow */}
            <Reveal direction="up" delay={150}>
              <span className="text-xs font-semibold tracking-[0.16em] text-[#e9efe8] uppercase mb-3 block">
                {contactHeroData.eyebrow}
              </span>
            </Reveal>

            {/* Main Heading */}
            <Reveal direction="up" delay={250}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[0.98] tracking-tight mb-4">
                {contactHeroData.headingLines[0]}
                <br />
                {contactHeroData.headingLines[1]}
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal direction="up" delay={350}>
              <p className="text-base sm:text-lg text-[#f7f4ee]/90 leading-relaxed font-sans max-w-[480px]">
                {contactHeroData.description}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right Hero Image Panel (~53.5% width on desktop) */}
        <div className="lg:col-span-6 xl:col-span-7 relative min-h-[300px] lg:min-h-full aspect-[4/3] lg:aspect-auto">
          <ImageReveal className="w-full h-full min-h-[300px] lg:min-h-full" delay={200}>
            <Image
              src={contactHeroData.image}
              alt={contactHeroData.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover object-center"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
