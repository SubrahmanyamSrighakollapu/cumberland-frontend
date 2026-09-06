"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity } from "@/data/things-to-do";

interface ActivityDetailsDialogProps {
  activity: Activity | null;
  onClose: () => void;
}

export default function ActivityDetailsDialog({
  activity,
  onClose,
}: ActivityDetailsDialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (activity) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activity, onClose]);

  if (!activity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-dialog-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#d9d0c4] relative flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative w-full aspect-[2.5/1] bg-[#e9efe8] shrink-0">
          <Image
            src={activity.image}
            alt={activity.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
          {activity.featured && (
            <div className="absolute top-3 left-3 bg-[#80563e] text-white text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
              FEATURED
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none"
            aria-label="Close activity details"
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
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                {activity.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] font-semibold tracking-wider text-[#80563e] uppercase bg-[#f7f4ee] px-2 py-0.5 rounded"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h2
                id="activity-dialog-title"
                className="font-serif text-2xl font-semibold text-[#0f302a]"
              >
                {activity.name}
              </h2>
            </div>
            <div className="text-sm font-semibold text-[#0f302a] bg-[#e9efe8] px-2.5 py-1 rounded-md">
              {activity.priceDisplay}
            </div>
          </div>

          <p className="text-sm text-[#50544e] leading-relaxed font-sans">
            {activity.description}
          </p>

          {/* Details Table */}
          <div className="bg-[#f7f4ee] rounded-xl p-4 space-y-2.5 text-xs text-[#50544e]">
            <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
              <span className="font-medium text-[#0f302a]">Location:</span>
              <span>
                {activity.location} &bull; {activity.driveMinutes} min drive
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
              <span className="font-medium text-[#0f302a]">Duration:</span>
              <span>{activity.duration}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
              <span className="font-medium text-[#0f302a]">Audience:</span>
              <span>{activity.audience}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#d9d0c4]/60 pb-2">
              <span className="font-medium text-[#0f302a]">Seasonality:</span>
              <span>{activity.seasonality}</span>
            </div>
            {activity.bookingRequired && (
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#0f302a]">Booking:</span>
                <span className="text-[#80563e] font-semibold">
                  Advance booking required
                </span>
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
            Ask Our Team &rarr;
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
