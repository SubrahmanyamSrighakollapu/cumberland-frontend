"use client";

import React from "react";
import Reveal from "@/components/ui/Reveal";

export const RoomCta: React.FC = () => {
  const handleScrollToReservation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("room-reservation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-[#80563E] text-white py-12 md:py-16">
      <Reveal direction="up" delay={50}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-cormorant font-normal text-white mb-2 leading-tight">
              Ready to make yourself at home?
            </h2>
            <p className="text-white/90 text-sm md:text-base font-manrope font-light">
              Book your stay today and experience the best of Cumberland.
            </p>
          </div>

          <a
            href="#room-reservation"
            onClick={handleScrollToReservation}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#80563E] hover:bg-[#F7F4EE] px-8 py-3.5 rounded font-manrope text-sm font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shadow-sm"
          >
            BOOK YOUR STAY
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
};
