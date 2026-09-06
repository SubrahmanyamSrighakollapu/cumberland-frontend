import Image from "next/image";
import { Activity } from "@/data/things-to-do";
import Reveal from "@/components/ui/Reveal";

interface ActivityCardProps {
  activity: Activity;
  onOpenDetails: (activity: Activity) => void;
  index?: number;
}

export default function ActivityCard({
  activity,
  onOpenDetails,
  index = 0,
}: ActivityCardProps) {
  const staggerDelay = Math.min(index * 90, 450);

  return (
    <Reveal direction="up" delay={staggerDelay} className="h-full">
      <div className="bg-white border border-[#d9d0c4]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
        {/* Top Image Container */}
        <div className="relative w-full aspect-[2.6/1] bg-[#e9efe8] overflow-hidden">
          <Image
            src={activity.image}
            alt={activity.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {activity.featured && (
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
              {activity.name}
            </h3>

            {/* Location & Drive Time */}
            <div className="flex items-center gap-1.5 text-xs text-[#50544e] font-sans mb-2.5">
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
                {activity.location} &bull;{" "}
                <strong className="font-medium text-[#0f302a]">
                  {activity.driveMinutes} min
                </strong>{" "}
                drive
              </span>
            </div>

            {/* Compact Metadata Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#50544e] font-sans mb-3.5">
              <span className="bg-[#e9efe8] text-[#0f302a] font-semibold text-[11px] px-2 py-0.5 rounded">
                {activity.priceDisplay}
              </span>
              <span>{activity.duration}</span>
              <span aria-hidden="true" className="text-[#d9d0c4]">
                &bull;
              </span>
              <span>{activity.audience}</span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed mb-3">
              {activity.description}
            </p>

            {/* Optional Booking Required Badge */}
            {activity.bookingRequired && (
              <div className="mb-3">
                <span className="bg-[#e9efe8] text-[#17352d] text-[11px] font-medium px-2.5 py-0.5 rounded-full inline-block">
                  Booking required
                </span>
              </div>
            )}
          </div>

          {/* Bottom Actions Row */}
          <div className="pt-3 border-t border-[#d9d0c4]/50 flex items-center justify-between">
            {activity.directionsUrl ? (
              <a
                href={activity.directionsUrl}
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
                onClick={() => onOpenDetails(activity)}
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
              onClick={() => onOpenDetails(activity)}
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
