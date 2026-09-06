"use client";

import Image from "next/image";
import Link from "next/link";
import { wineCountryIntroData } from "@/data/wine-country";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function WineCountryIntro() {
  const {
    eyebrow,
    heading,
    paragraph1,
    paragraph2,
    facts,
    image,
    imageAlt,
    mapLink,
  } = wineCountryIntroData;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "car":
        return (
          <svg
            className="w-5 h-5 text-[#80563e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 9l2-4h14l2 4M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M3 9h18"
            />
          </svg>
        );
      case "grapes":
        return (
          <svg
            className="w-5 h-5 text-[#80563e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v3m0 0a3 3 0 100 6 3 3 0 000-6zm0 6a3 3 0 100 6 3 3 0 000-6zm-4-3a3 3 0 100 6 3 3 0 000-6zm8 0a3 3 0 100 6 3 3 0 000-6zm-4 6a3 3 0 100 6 3 3 0 000-6z"
            />
          </svg>
        );
      case "leaf":
        return (
          <svg
            className="w-5 h-5 text-[#80563e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-[#f7f4ee] py-14 sm:py-16 lg:py-20 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-6">
            <ImageReveal className="aspect-[3/2] w-full rounded-xl overflow-hidden shadow-md border border-[#d9d0c4]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </ImageReveal>
          </div>

          {/* Right Column: Text & Facts */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal direction="up" delay={50}>
              {/* Eyebrow */}
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
                {eyebrow}
              </span>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a] mb-5 whitespace-pre-line">
                {heading}
              </h2>

              {/* Copy */}
              <p className="text-sm sm:text-base text-[#50544e] leading-relaxed mb-4 font-sans">
                {paragraph1}
              </p>
              <p className="text-sm sm:text-base text-[#50544e] leading-relaxed mb-8 font-sans">
                {paragraph2}
              </p>

              {/* Horizontal Facts Row */}
              <div className="pt-6 border-t border-[#d9d0c4] mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">
                  {facts.map((fact, idx) => (
                    <div
                      key={fact.id}
                      className={`flex items-center gap-3 sm:px-4 first:pl-0 ${
                        idx < facts.length - 1
                          ? "sm:border-r border-[#d9d0c4]"
                          : ""
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-[#e9efe8] shrink-0">
                        {renderIcon(fact.icon)}
                      </div>
                      <div>
                        <div className="font-serif text-xl sm:text-2xl font-semibold text-[#0f302a] leading-tight">
                          {fact.value}
                        </div>
                        <div className="text-xs text-[#50544e] font-sans leading-tight">
                          {fact.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Map Link */}
              <div>
                <Link
                  href={mapLink.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#80563e] hover:text-[#69452f] transition-colors uppercase group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e] rounded"
                >
                  <svg
                    className="w-4 h-4 text-[#80563e] group-hover:translate-x-0.5 transition-transform"
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
                  <span>{mapLink.label}</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
