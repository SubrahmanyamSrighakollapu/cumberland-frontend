"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { BOOK_DIRECT_URL } from "@/utils/siteLinks";

export default function AvailabilityBar() {
  const [checkInDate, setCheckInDate] = useState("2025-06-20");
  const [checkOutDate, setCheckOutDate] = useState("2025-06-22");
  const [guests, setGuests] = useState("2 Adults");

  // Helper to format ISO date strings (2025-06-20) to editorial format (Fri, 20 Jun 2025)
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    if (isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString("en-AU", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static frontend phase: No API request or fake confirmation popups.
  };

  return (
    <section
      id="availability"
      aria-label="Check Room Availability"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-30"
    >
      <Reveal direction="up" distance={12} duration={550}>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#e8e0d6] p-3 sm:p-4 md:p-3 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 items-center divide-y md:divide-y-0 md:divide-x divide-[#e8e0d6] transition-all duration-300"
        >
          {/* Check-In Field */}
          <div className="relative p-3 md:px-5 flex flex-col justify-center gap-1 group cursor-pointer rounded-lg md:rounded-r-none transition-colors duration-200 hover:bg-[#f2e9e2]/40 focus-within:bg-[#f2e9e2]/50 focus-within:ring-2 focus-within:ring-[#80563e]">
            <div className="flex items-center gap-2 text-[#50544e]">
              <svg
                className="w-4 h-4 text-[#80563e] transition-transform duration-200 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <label
                htmlFor="check-in-input"
                className="text-[11px] font-semibold tracking-wider text-[#50544e] uppercase cursor-pointer"
              >
                CHECK-IN
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#20382f]">
                {formatDateDisplay(checkInDate)}
              </span>
              <svg
                className="w-4 h-4 text-[#50544e]/60 group-hover:text-[#20382f] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <input
              id="check-in-input"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Check-in Date"
            />
          </div>

          {/* Check-Out Field */}
          <div className="relative p-3 md:px-5 flex flex-col justify-center gap-1 group cursor-pointer pt-3 md:pt-3 rounded-lg md:rounded-none transition-colors duration-200 hover:bg-[#f2e9e2]/40 focus-within:bg-[#f2e9e2]/50 focus-within:ring-2 focus-within:ring-[#80563e]">
            <div className="flex items-center gap-2 text-[#50544e]">
              <svg
                className="w-4 h-4 text-[#80563e] transition-transform duration-200 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <label
                htmlFor="check-out-input"
                className="text-[11px] font-semibold tracking-wider text-[#50544e] uppercase cursor-pointer"
              >
                CHECK-OUT
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#20382f]">
                {formatDateDisplay(checkOutDate)}
              </span>
              <svg
                className="w-4 h-4 text-[#50544e]/60 group-hover:text-[#20382f] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <input
              id="check-out-input"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Check-out Date"
            />
          </div>

          {/* Guests Field */}
          <div className="relative p-3 md:px-5 flex flex-col justify-center gap-1 group cursor-pointer pt-3 md:pt-3 rounded-lg md:rounded-l-none transition-colors duration-200 hover:bg-[#f2e9e2]/40 focus-within:bg-[#f2e9e2]/50 focus-within:ring-2 focus-within:ring-[#80563e]">
            <div className="flex items-center gap-2 text-[#50544e]">
              <svg
                className="w-4 h-4 text-[#80563e] transition-transform duration-200 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <label
                htmlFor="guests-select"
                className="text-[11px] font-semibold tracking-wider text-[#50544e] uppercase cursor-pointer"
              >
                GUESTS
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#20382f]">
                {guests}
              </span>
              <svg
                className="w-4 h-4 text-[#50544e]/60 group-hover:text-[#20382f] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <select
              id="guests-select"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full bg-transparent"
              aria-label="Select Number of Guests"
            >
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults">2 Adults</option>
              <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
              <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
              <option value="3 Adults">3 Adults</option>
              <option value="4 Adults">4 Adults</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="p-2 md:pl-4 pt-3 md:pt-2">
            <a
              href={BOOK_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full h-[52px] bg-[#80563e] hover:bg-[#69452f] active:bg-[#583824] text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
            >
              <span>CHECK AVAILABILITY</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
