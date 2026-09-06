"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { activitySupportOptions } from "@/data/things-to-do";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function ActivityPlanningPanel() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const renderSupportIcon = (iconName: string) => {
    switch (iconName) {
      case "family":
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "weather":
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        );
      case "calendar":
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
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
    <section className="w-full bg-[#f7f4ee] pb-14 sm:pb-16 lg:pb-20 pt-6">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f302a] text-[#f7f4ee] rounded-2xl p-6 sm:p-10 lg:p-14 shadow-xl border border-[#17352d]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Support Content */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <Reveal direction="up" delay={50}>
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-semibold text-white mb-4">
                    Need help planning?
                  </h2>
                  <p className="text-sm sm:text-base text-[#f7f4ee]/85 font-sans leading-relaxed mb-8">
                    Our friendly team can help with bookings, local tips and
                    tailored recommendations, so you can make the most of your
                    stay.
                  </p>

                  {/* 3 Support Items */}
                  <div className="space-y-5 mb-8">
                    {activitySupportOptions.map((opt) => (
                      <div key={opt.id} className="flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-[#17352d] border border-white/10 shrink-0">
                          {renderSupportIcon(opt.icon)}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-white leading-tight">
                            {opt.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#f7f4ee]/75 font-sans leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#17352d]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-6 bg-[#80563e] hover:bg-[#69452f] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                  >
                    ASK OUR TEAM &rarr;
                  </Link>

                  <button
                    onClick={() => setIsGuideModalOpen(true)}
                    className="inline-flex items-center justify-center h-12 px-6 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    DOWNLOAD LOCAL GUIDE
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Attractions Map */}
            <div id="attractions-map" className="lg:col-span-6 scroll-mt-24">
              <ImageReveal className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg border border-[#17352d] bg-[#17352d]/60 group" delay={150}>
                <Image
                  src="/images/content-image-four.png"
                  alt="Attractions route map illustration showing key local destinations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                  onClick={() => setIsMapModalOpen(true)}
                />
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 bg-[#0f302a]/90 backdrop-blur-sm border border-white/10 text-white text-xs px-3.5 py-2 rounded-lg font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#52c92d] animate-pulse" />
                  <span>Regional Attractions Route Map</span>
                </div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Download Informational Modal */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-[#d9d0c4] shadow-2xl relative text-[#0f302a]">
            <button
              onClick={() => setIsGuideModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#50544e] hover:text-[#0f302a] rounded-full hover:bg-[#f7f4ee] transition-colors"
              aria-label="Close guide notice"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#0f302a] mb-2">
              Local Guide PDF
            </h3>
            <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed mb-6">
              Our comprehensive Regional Visitor Guide is currently being
              updated for the upcoming season. In the meantime, our reception
              team can provide printed maps and customized activity recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                onClick={() => setIsGuideModalOpen(false)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center"
              >
                Ask Our Team &rarr;
              </Link>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="px-4 py-2.5 bg-[#f7f4ee] hover:bg-[#e9efe8] text-[#0f302a] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Enlarged Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f302a] text-white rounded-2xl max-w-4xl w-full p-4 sm:p-6 border border-[#17352d] shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#17352d]">
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  Regional Attractions Map Overview
                </h3>
                <p className="text-xs text-[#f7f4ee]/75 font-sans">
                  Key outdoor, family and cultural attractions near Cumberland Motor Inn
                </p>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="p-2 text-white/80 hover:text-white rounded-full bg-[#17352d] hover:bg-[#80563e] transition-colors"
                aria-label="Close map overview"
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
            </div>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#17352d]">
              <Image
                src="/images/content-image-four.png"
                alt="Enlarged regional attractions map illustration"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
