import Image from "next/image";
import Link from "next/link";
import { cumberlandExperienceData } from "@/data/about";
import AboutAmenitiesStrip from "./AboutAmenitiesStrip";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function CumberlandExperienceSection() {
  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "bed":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "compass":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        );
      case "guests":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
    }
  };

  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <Reveal direction="up" delay={100} duration={600}>
          <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-8 block">
            {cumberlandExperienceData.eyebrow}
          </span>
        </Reveal>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Motel Grounds Image (~58% width) */}
          <div className="lg:col-span-7">
            <ImageReveal overlayColor="#f7f4ee" duration={900}>
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={cumberlandExperienceData.image}
                  alt={cumberlandExperienceData.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </div>
            </ImageReveal>
          </div>

          {/* Right Column: Copy, Benefits & CTAs (~42% width) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal direction="up" delay={150} duration={650}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#20382f] font-normal leading-[1.1] mb-4">
                {cumberlandExperienceData.headingLines[0]}
                <br />
                {cumberlandExperienceData.headingLines[1]}
              </h2>
            </Reveal>

            <Reveal direction="up" delay={230} duration={650}>
              <p className="text-base text-[#50544e] leading-relaxed font-sans mb-8">
                {cumberlandExperienceData.description}
              </p>
            </Reveal>

            {/* 3 Experience Benefits List */}
            <div className="space-y-6 mb-10">
              {cumberlandExperienceData.benefits.map((benefit, index) => (
                <Reveal
                  key={benefit.id}
                  direction="up"
                  staggerIndex={index}
                  duration={650}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-full bg-[#e9efe8] text-[#20382f] shrink-0 mt-0.5">
                      {renderBenefitIcon(benefit.iconName)}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#20382f] font-normal mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#50544e] leading-relaxed font-sans">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA Buttons Row */}
            <Reveal direction="up" delay={350} duration={600}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/rooms"
                  className="inline-flex items-center justify-center h-[46px] px-6 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-xs font-semibold tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                >
                  EXPLORE ROOMS &rarr;
                </Link>

                <Link
                  href="/experiences/wine-country"
                  className="inline-flex items-center justify-center h-[46px] px-6 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                >
                  DISCOVER EXPERIENCES &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Amenities Strip */}
        <AboutAmenitiesStrip />
      </div>
    </section>
  );
}

