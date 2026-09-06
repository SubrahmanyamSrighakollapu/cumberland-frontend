"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DiningVenue } from "@/data/eat-and-drink";

interface DiningDetailsDialogProps {
  venue: DiningVenue | null;
  onClose: () => void;
}

export default function DiningDetailsDialog({
  venue,
  onClose,
}: DiningDetailsDialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (venue) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [venue, onClose]);

  if (!venue) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dining-dialog-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#d9d0c4] relative flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative w-full aspect-[2.2/1] bg-[#e9efe8] shrink-0">
          <Image
            src={venue.image}
            alt={venue.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
          {venue.featured && (
            <div className="absolute top-3 left-3 bg-[#80563e] text-white text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
              FEATURED
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none"
            aria-label="Close venue details"
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#80563e] uppercase block mb-1">
                {venue.cuisine} &bull; {venue.type}
              </span>
              <h2
                id="dining-dialog-title"
                className="font-serif text-2xl font-semibold text-[#0f302a]"
              >
                {venue.name}
              </h2>
            </div>
            <div
              className="text-sm font-semibold text-[#0f302a] bg-[#e9efe8] px-2.5 py-1 rounded-md"
              aria-label={venue.priceAccessibilityLabel}
            >
              {venue.priceDisplay}
            </div>
          </div>

          <p className="text-sm text-[#50544e] leading-relaxed font-sans">
            {venue.description}
          </p>

          {/* Details Table */}
          <div className="bg-[#f7f4ee] rounded-xl p-4 space-y-2.5 text-xs text-[#50544e]">
            <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
              <span className="font-medium text-[#0f302a]">Proximity:</span>
              <span>{venue.travelText}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
              <span className="font-medium text-[#0f302a]">Hours:</span>
              <span>{venue.hours}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
              <span className="font-medium text-[#0f302a]">Reservations:</span>
              <span>{venue.reservationsText}</span>
            </div>
            {venue.address && (
              <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
                <span className="font-medium text-[#0f302a]">Address:</span>
                <span>{venue.address}</span>
              </div>
            )}
            {venue.contactPhone && (
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#0f302a]">Phone:</span>
                <span>{venue.contactPhone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 bg-[#f7f4ee] border-t border-[#d9d0c4] flex items-center justify-between gap-3 shrink-0">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center h-10 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center"
          >
            Enquire & Table Booking &rarr;
          </Link>
          <button
            onClick={onClose}
            className="h-10 px-5 bg-white border border-[#d9d0c4] hover:bg-[#e9efe8] text-[#0f302a] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
