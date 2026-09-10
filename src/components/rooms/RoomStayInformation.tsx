"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoomDetail, StayInfoItem } from "@/data/rooms";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

interface RoomStayInformationProps {
  room?: RoomDetail;
  stayInfo?: StayInfoItem[];
}

export default function RoomStayInformation({
  room,
  stayInfo,
}: RoomStayInformationProps) {
  const infoList = room?.stayInfo || stayInfo || [];
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-[#f7f4ee] py-14 sm:py-16 lg:py-20 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="max-w-2xl mb-10 sm:mb-12">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
              STAY INFORMATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a]">
              Good to know before you arrive.
            </h2>
          </div>
        </Reveal>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Accordion Column (60% width) */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={100}>
              <div className="border-t border-[#d9d0c4]">
                {infoList.map((item: StayInfoItem, index: number) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={item.id}
                      className="border-b border-[#d9d0c4] transition-colors"
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17352d] rounded-sm"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-[#80563e] font-sans">
                            0{index + 1}
                          </span>
                          <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#0f302a]">
                            {item.title}
                          </h3>
                        </div>

                        <div className="w-7 h-7 rounded-full bg-[#e9efe8] text-[#0f302a] flex items-center justify-center shrink-0 transition-transform duration-200">
                          {isOpen ? (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 12H4"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="pb-5 pl-8 pr-4 text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed whitespace-pre-line animate-in fade-in duration-150">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Contact Card & Photograph (40% width) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Help Contact Card */}
            <Reveal direction="up" delay={150}>
              <div className="bg-[#e9efe8] rounded-2xl p-6 sm:p-8 border border-[#d9d0c4] text-[#0f302a]">
                <div className="w-10 h-10 rounded-xl bg-white text-[#80563e] flex items-center justify-center mb-4 shadow-2xs">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#0f302a] mb-2">
                  Need help choosing a room?
                </h3>
                <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed mb-6">
                  Our friendly team is here to help you find the perfect stay.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-[#80563e] hover:bg-[#80563e] hover:text-white text-[#80563e] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200"
                >
                  CONTACT US &rarr;
                </Link>
              </div>
            </Reveal>

            {/* Scenic Image Card */}
            <ImageReveal className="aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md border border-[#d9d0c4] bg-[#0f302a]" delay={250}>
              <Image
                src="/images/room-eight.png"
                alt="Cumberland Motor Inn grounds in Cessnock"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <p className="font-serif italic text-white text-lg sm:text-xl font-medium">
                  &ldquo;Come for the Hunter Valley. Stay for the comfort.&rdquo;
                </p>
              </div>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
