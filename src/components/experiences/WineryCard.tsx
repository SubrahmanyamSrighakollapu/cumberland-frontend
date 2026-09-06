import Image from "next/image";
import { Winery } from "@/data/wine-country";
import Reveal from "@/components/ui/Reveal";

interface WineryCardProps {
  winery: Winery;
  index?: number;
}

export default function WineryCard({ winery, index = 0 }: WineryCardProps) {
  const staggerDelay = Math.min(index * 90, 450);

  return (
    <Reveal direction="up" delay={staggerDelay} className="h-full">
      <div className="bg-white border border-[#d9d0c4]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
        {/* Top Image Container with Optional Featured Badge */}
        <div className="relative w-full aspect-[2.3/1] bg-[#e9efe8] overflow-hidden">
          <Image
            src={winery.image}
            alt={winery.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {winery.featured && (
            <div className="absolute top-3 left-3 bg-[#80563e] text-white text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
              FEATURED
            </div>
          )}
        </div>

        {/* Card Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Winery Name */}
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#0f302a] mb-1.5 leading-snug">
              {winery.name}
            </h3>

            {/* Location & Drive Time */}
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
                {winery.location} &bull;{" "}
                <strong className="font-medium text-[#0f302a]">
                  {winery.driveMinutes} min
                </strong>{" "}
                drive
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed mb-4">
              {winery.description}
            </p>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {winery.categories.map((cat) => (
                <span
                  key={cat}
                  className="bg-[#e9efe8] text-[#17352d] text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Metadata & Actions */}
          <div className="pt-3 border-t border-[#d9d0c4]/50 flex flex-col gap-2.5">
            {/* Hours Row */}
            <div className="flex items-center gap-1.5 text-xs text-[#50544e] font-sans">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{winery.hours}</span>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between pt-1">
              {winery.directionsUrl ? (
                <a
                  href={winery.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#50544e] hover:text-[#0f302a] flex items-center gap-1 transition-colors"
                >
                  Get Directions
                </a>
              ) : (
                <span className="text-xs font-medium text-[#50544e]/70 cursor-not-allowed flex items-center gap-1">
                  Directions
                </span>
              )}

              {winery.websiteUrl ? (
                <a
                  href={winery.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#80563e] hover:text-[#69452f] flex items-center gap-1 transition-colors"
                >
                  Visit Website &rarr;
                </a>
              ) : (
                <span className="text-xs font-semibold text-[#80563e] hover:text-[#69452f] flex items-center gap-1 transition-colors cursor-pointer">
                  Visit Website &rarr;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
