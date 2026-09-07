"use client";

import { useState } from "react";
import { RoomDetail } from "@/data/rooms";
import Reveal from "@/components/ui/Reveal";

interface RoomAmenitiesProps {
  room: RoomDetail;
}

export default function RoomAmenities({ room }: RoomAmenitiesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case "wifi":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        );
      case "ac":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m0-18l4 4m-4-4L8 7m4 14l4-4m-4 4l-4-4M3 12h18m-18 0l4-4m-4 4l4 4m14-4l-4-4m4 4l-4 4"
            />
          </svg>
        );
      case "tv":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "fridge":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6"
            />
          </svg>
        );
      case "coffee":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
            />
          </svg>
        );
      case "desk":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14"
            />
          </svg>
        );
      case "shower":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5a2 2 0 002 2h12a2 2 0 002-2V4M12 11v9m-4 0h8"
            />
          </svg>
        );
      case "balcony":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "parking":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h4a3 3 0 010 6H8V7zm0 6h4a3 3 0 010 6H8v-6zM3 3h18v18H3V3z"
            />
          </svg>
        );
      case "non-smoking":
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6 text-[#0f302a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
    }
  };

  return (
    <section className="w-full bg-[#e9efe8] py-14 sm:py-16 lg:py-20 border-b border-[#d9d0c4]/50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
                ROOM AMENITIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a]">
                Everything included.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#50544e] font-sans max-w-md">
              Thoughtful amenities for a more comfortable and enjoyable stay.
            </p>
          </div>
        </Reveal>

        {/* 10 Amenity Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {room.amenities.slice(0, 10).map((item, idx) => (
            <Reveal
              key={item.id}
              direction="up"
              delay={100 + idx * 40}
            >
              <div className="bg-white border border-[#d9d0c4] rounded-xl p-4 text-center flex flex-col items-center justify-center min-h-[100px] shadow-2xs hover:border-[#17352d] transition-colors h-full">
                <div className="mb-2.5">{renderAmenityIcon(item.icon)}</div>
                <span className="text-xs sm:text-sm font-semibold text-[#0f302a] font-sans leading-tight">
                  {item.title}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Section: Show All Button & Room Highlights */}
        <Reveal direction="up" delay={250}>
          <div className="pt-6 border-t border-[#d9d0c4] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Show All Button */}
            <div className="lg:col-span-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#80563e] hover:text-[#69452f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e] rounded"
              >
                SHOW ALL AMENITIES &rarr;
              </button>
            </div>

            {/* Right Highlights Column */}
            <div className="lg:col-span-8 lg:border-l lg:border-[#d9d0c4] lg:pl-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0f302a] mb-3 font-sans">
                Room highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#50544e] font-sans">
                {room.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-[#52c92d] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Full Amenities Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-[#d9d0c4] shadow-2xl relative max-h-[85vh] flex flex-col text-[#0f302a]">
            <div className="flex items-center justify-between border-b border-[#d9d0c4] pb-4 mb-4">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#0f302a]">
                  Full Room Amenities
                </h3>
                <span className="text-xs text-[#50544e] font-sans">
                  {room.name}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#50544e] hover:text-[#0f302a] rounded-full hover:bg-[#f7f4ee] transition-colors"
                aria-label="Close amenities modal"
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

            {/* List */}
            <div className="overflow-y-auto space-y-4 pr-1">
              {room.amenities.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 bg-[#f7f4ee] p-3.5 rounded-xl border border-[#d9d0c4]/60"
                >
                  <div className="p-2 bg-white rounded-lg shrink-0">
                    {renderAmenityIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#0f302a]">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-[#50544e] font-sans mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#d9d0c4] mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
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
