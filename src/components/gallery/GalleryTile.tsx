import Image from "next/image";
import { GalleryItem } from "@/data/gallery";
import Reveal from "@/components/ui/Reveal";

interface GalleryTileProps {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
  index?: number;
}

export default function GalleryTile({ item, onSelect, index = 0 }: GalleryTileProps) {
  // Determine grid span classes based on layout property
  const getLayoutClass = () => {
    switch (item.layout) {
      case "wide":
        return "col-span-1 md:col-span-2 lg:col-span-6 aspect-[16/9]";
      case "tall":
        return "col-span-1 md:col-span-1 lg:col-span-4 lg:row-span-2 aspect-[3/4]";
      case "standard":
      default:
        return "col-span-1 md:col-span-1 lg:col-span-4 aspect-[4/3]";
    }
  };

  const staggerDelay = Math.min(index * 90, 450);

  return (
    <Reveal
      direction="up"
      delay={staggerDelay}
      className={`${getLayoutClass()} rounded-xl overflow-hidden`}
    >
      <div
        onClick={() => onSelect(item)}
        className="group relative w-full h-full rounded-xl overflow-hidden shadow-xs cursor-pointer bg-[#e9efe8]"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(item);
          }
        }}
        aria-label={`View details for ${item.title}`}
      >
        {/* Background Raster Image */}
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
        />

        {/* Dark Legibility Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
          style={{
            background:
              "linear-gradient(to top, rgba(15, 48, 42, 0.88) 0%, rgba(15, 48, 42, 0.35) 50%, rgba(15, 48, 42, 0.05) 100%)",
          }}
        />

        {/* Title & Category Label */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex items-end justify-between gap-3 text-white">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-[#e9efe8]/80 uppercase block mb-0.5">
              {item.category}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-tight">
              {item.title}
            </h3>
          </div>

          {/* Circular Plus Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            aria-label={`View ${item.title}`}
            className="p-2.5 rounded-full bg-[#0f302a]/60 hover:bg-[#80563e] text-white border border-white/40 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </Reveal>
  );
}
