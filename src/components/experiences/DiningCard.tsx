import Image from "next/image";
import { DiningVenue } from "@/data/eat-and-drink";
import Reveal from "@/components/ui/Reveal";

interface DiningCardProps {
  venue: DiningVenue;
  onOpenDetails: (venue: DiningVenue) => void;
  index?: number;
}

export default function DiningCard({ venue, onOpenDetails, index = 0 }: DiningCardProps) {
  const staggerDelay = Math.min(index * 90, 450);

  return (
    <Reveal direction="up" delay={staggerDelay} className="h-full">
      <div className="bg-white border border-[#d9d0c4]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
        {/* Top Image Container */}
        <div className="relative w-full aspect-[2.3/1] bg-[#e9efe8] overflow-hidden">
          <Image
            src={venue.image}
            alt={venue.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {venue.featured && (
            <div className="absolute top-3 left-3 bg-[#80563e] text-white text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
              FEATURED
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#0f302a] mb-1.5 leading-snug">
              {venue.name}
            </h3>

            {/* Cuisine & Travel Info */}
            <div className="flex items-center gap-1.5 text-xs text-[#50544e] font-sans mb-3">
              <svg
                className="w-3.5 h-3.5 text-[#80563e] shrink-0"
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
              <span>
                {venue.cuisine} &bull;{" "}
                <strong className="font-medium text-[#0f302a]">
                  {venue.travelText}
                </strong>
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed mb-4">
              {venue.description}
            </p>

            {/* Price, Hours & Reservation Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#50544e] font-sans mb-4">
              {/* Price badge */}
              <span
                className="bg-[#e9efe8] text-[#0f302a] font-semibold text-[11px] px-2 py-0.5 rounded"
                title={venue.priceAccessibilityLabel}
              >
                {venue.priceDisplay}
              </span>

              {/* Status indicator & Hours */}
              <span className="flex items-center gap-1.5 text-xs">
                <span
                  className="w-2 h-2 rounded-full bg-[#52c92d]"
                  aria-hidden="true"
                />
                <span>{venue.hours}</span>
              </span>

              <span aria-hidden="true" className="text-[#d9d0c4]">
                &bull;
              </span>

              {/* Reservation note */}
              <span className="flex items-center gap-1 text-xs text-[#50544e]/85">
                <svg
                  className="w-3.5 h-3.5 text-[#50544e]/70 shrink-0"
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
                <span>{venue.reservationsText}</span>
              </span>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="pt-3 border-t border-[#d9d0c4]/50 flex items-center justify-between">
            {venue.directionsUrl ? (
              <a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#50544e] hover:text-[#0f302a] flex items-center gap-1 transition-colors uppercase tracking-wider"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#80563e]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                Directions &rarr;
              </a>
            ) : (
              <button
                onClick={() => onOpenDetails(venue)}
                className="text-xs font-semibold text-[#50544e] hover:text-[#0f302a] flex items-center gap-1 transition-colors uppercase tracking-wider"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#80563e]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                Directions &rarr;
              </button>
            )}

            <button
              onClick={() => onOpenDetails(venue)}
              className="text-xs font-semibold text-[#80563e] hover:text-[#69452f] flex items-center gap-1 transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#80563e] rounded px-1 py-0.5"
            >
              VIEW DETAILS &#8599;
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
