import Image from "next/image";
import Link from "next/link";
import { GalleryItem } from "@/data/gallery";

interface GalleryPreviewProps {
  item: GalleryItem;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export default function GalleryPreview({
  item,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  onClose,
}: GalleryPreviewProps) {
  // Format 1-based index string (e.g. "03 / 10")
  const formattedIndex = `${String(currentIndex + 1).padStart(2, "0")} / ${String(
    totalCount
  ).padStart(2, "0")}`;

  // Contextual action button text & route
  const getActionLabel = () => {
    switch (item.category) {
      case "Rooms":
        return { label: "ROOM DETAILS →", route: item.route || "/rooms" };
      case "Experiences":
        return { label: "EXPLORE EXPERIENCE →", route: item.route || "/experiences/wine-country" };
      case "Amenities":
        return { label: "VIEW AMENITIES →", route: item.route || "/about#amenities" };
      case "Dining":
        return { label: "EXPLORE DINING →", route: item.route || "/experiences/eat-and-drink" };
      case "Property":
      case "Local Area":
      default:
        return { label: "DISCOVER MORE →", route: item.route || "/about" };
    }
  };

  const action = getActionLabel();

  return (
    <section
      aria-label="Selected Media Preview"
      className="bg-[#0f302a] text-white rounded-xl p-6 sm:p-8 mt-12 mb-16 relative overflow-hidden shadow-xl border border-[#17352d]"
    >
      {/* Top Right Close Button */}
      <button
        onClick={onClose}
        aria-label="Close gallery preview"
        className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Media Preview (~68% width) */}
        <div className="lg:col-span-8 relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/20">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 68vw"
            className="object-cover object-center"
          />

          {/* Prev/Next Overlay Controls */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-20">
            <button
              onClick={onPrev}
              aria-label="Previous image"
              className="pointer-events-auto p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={onNext}
              aria-label="Next image"
              className="pointer-events-auto p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Metadata & Action (~32% width) */}
        <div className="lg:col-span-4 flex flex-col justify-center pr-2">
          {/* Index */}
          <span className="text-xs font-semibold tracking-widest text-[#52c92d] uppercase mb-2 block font-mono">
            {formattedIndex}
          </span>

          {/* Title */}
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight mb-3">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#f7f4ee]/85 leading-relaxed font-sans mb-6">
            {item.description}
          </p>

          <div className="h-[1px] bg-white/20 mb-6" />

          {/* Contextual Link */}
          <div>
            <Link
              href={action.route}
              className="inline-flex items-center justify-center h-[44px] px-6 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
            >
              {action.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
