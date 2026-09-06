import { GalleryCategory, galleryCategories } from "@/data/gallery";

interface GalleryFiltersProps {
  activeCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
  visibleCount: number;
  totalCount: number;
}

export default function GalleryFilters({
  activeCategory,
  onSelectCategory,
  visibleCount,
  totalCount,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Category Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {galleryCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              aria-pressed={isActive}
              className={`px-4.5 py-2 text-xs font-semibold tracking-wider rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e] ${
                isActive
                  ? "bg-gradient-to-r from-[#80563e] to-[#69452f] text-white shadow-md ring-2 ring-[#80563e]/25 scale-105"
                  : "bg-white text-[#50544e] border border-[#d9d0c4] hover:border-[#80563e] hover:text-[#20382f] hover:shadow-xs"
              }`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#f7f4ee] shadow-[0_0_6px_#f7f4ee]" />
              )}
              {category}
            </button>
          );
        })}
      </div>

      {/* Item Count Display */}
      <div className="text-xs font-medium text-[#50544e] tracking-wide shrink-0">
        Showing{" "}
        <span className="font-semibold text-[#20382f]">{visibleCount}</span> of{" "}
        <span className="font-semibold text-[#20382f]">{totalCount}</span>
      </div>
    </div>
  );
}
