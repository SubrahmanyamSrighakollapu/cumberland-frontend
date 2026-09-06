"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredDiningData } from "@/data/eat-and-drink";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function FeaturedDiningExperience() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const {
    eyebrow,
    heading,
    description,
    image,
    imageAlt,
    facts,
    benefits,
  } = featuredDiningData;

  const renderFactIcon = (iconName: string) => {
    switch (iconName) {
      case "cutlery":
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );
      case "clock":
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "calendar":
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
      case "walk":
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "leaf":
        return (
          <svg
            className="w-5 h-5 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case "people":
        return (
          <svg
            className="w-5 h-5 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "wine":
        return (
          <svg
            className="w-5 h-5 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v3m0 0a3 3 0 100 6 3 3 0 000-6zm0 6a3 3 0 100 6 3 3 0 000-6z"
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
            <ImageReveal className="aspect-[5/4] w-full rounded-xl overflow-hidden shadow-md border border-[#d9d0c4] bg-[#e9efe8]" delay={150}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </ImageReveal>
          </div>

          {/* Right Column: Text, Facts & Benefits */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Header Content */}
            <Reveal direction="up" delay={50}>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
                {eyebrow}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a] mb-4 whitespace-pre-line">
                {heading}
              </h2>

              <p className="text-sm sm:text-base text-[#50544e] leading-relaxed mb-6 font-sans">
                {description}
              </p>
            </Reveal>

            {/* 4 Facts Row */}
            <Reveal direction="up" delay={150}>
              <div className="py-4 border-y border-[#d9d0c4] mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
                  {facts.map((fact, idx) => (
                    <div
                      key={fact.id}
                      className={`flex items-start gap-2.5 sm:px-3 first:pl-0 ${
                        idx < facts.length - 1
                          ? "sm:border-r border-[#d9d0c4]"
                          : ""
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {renderFactIcon(fact.icon)}
                      </div>
                      <div>
                        <div className="font-serif text-sm font-semibold text-[#0f302a] leading-tight">
                          {fact.main}
                        </div>
                        <div className="text-xs text-[#50544e] font-sans leading-tight">
                          {fact.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Buttons Row */}
            <Reveal direction="up" delay={250}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={() => setIsMenuModalOpen(true)}
                  className="inline-flex items-center justify-center h-11 px-6 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                >
                  VIEW MENU &rarr;
                </button>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-11 px-6 bg-transparent hover:bg-[#80563e] text-[#80563e] hover:text-white border border-[#80563e] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                >
                  RESERVE A TABLE
                </Link>
              </div>
            </Reveal>

            {/* 3 Benefits Row */}
            <Reveal direction="up" delay={350}>
              <div className="pt-5 border-t border-[#d9d0c4]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {benefits.map((ben) => (
                    <div key={ben.id} className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded bg-[#e9efe8] shrink-0">
                        {renderBenefitIcon(ben.icon)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#0f302a] leading-tight font-sans">
                          {ben.title}
                        </div>
                        <div className="text-[11px] text-[#50544e] font-sans leading-tight">
                          {ben.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Menu Informational Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-[#d9d0c4] shadow-2xl relative">
            <button
              onClick={() => setIsMenuModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#50544e] hover:text-[#0f302a] rounded-full hover:bg-[#f7f4ee] transition-colors"
              aria-label="Close menu notice"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="w-12 h-12 rounded-full bg-[#e9efe8] text-[#80563e] flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#0f302a] mb-2">
              Menu Updating
            </h3>
            <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed mb-6">
              Our seasonal dining menu is currently being updated for the
              upcoming season. For current daily specials or dietary inquiries,
              please contact our front desk team.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                onClick={() => setIsMenuModalOpen(false)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center"
              >
                Contact Our Team &rarr;
              </Link>
              <button
                onClick={() => setIsMenuModalOpen(false)}
                className="px-4 py-2.5 bg-[#f7f4ee] hover:bg-[#e9efe8] text-[#0f302a] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
