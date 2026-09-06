"use client";

import { useState, useMemo } from "react";
import { diningCategories, diningVenues, DiningVenue } from "@/data/eat-and-drink";
import DiningCard from "./DiningCard";
import DiningDetailsDialog from "./DiningDetailsDialog";
import Reveal from "@/components/ui/Reveal";

export default function DiningExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"nearest" | "name" | "price">(
    "nearest"
  );
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeDialogVenue, setActiveDialogVenue] = useState<DiningVenue | null>(
    null
  );

  // Filter venues based on category
  const filteredVenues = useMemo(() => {
    if (selectedCategory === "All") {
      return diningVenues;
    }
    if (selectedCategory === "On-site") {
      return diningVenues.filter((v) => v.isOnSite);
    }
    return diningVenues.filter((v) => v.type === selectedCategory);
  }, [selectedCategory]);

  // Sort venues without mutating original dataset
  const sortedVenues = useMemo(() => {
    const list = [...filteredVenues];

    if (sortBy === "nearest") {
      list.sort((a, b) => a.distanceMeters - b.distanceMeters);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      list.sort((a, b) => a.priceLevel - b.priceLevel);
    }

    return list;
  }, [filteredVenues, sortBy]);

  // Visible venues subset
  const visibleVenues = useMemo(() => {
    return sortedVenues.slice(0, visibleCount);
  }, [sortedVenues, visibleCount]);

  const hasMore = visibleCount < sortedVenues.length;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "nearest" | "name" | "price");
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section
      id="local-dining"
      className="w-full bg-[#e9efe8] py-14 sm:py-16 lg:py-20 scroll-mt-20 border-b border-[#d9d0c4]/50"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
              LOCAL DINING DIRECTORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a] mb-3">
              Eat like a local.
            </h2>
            <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed">
              Discover a selection of cafés, restaurants and bars, each offering
              their own unique flavour and atmosphere, all within easy reach of
              Cumberland Motor Inn.
            </p>
          </div>
        </Reveal>

        {/* Filter and Sort Toolbar */}
        <Reveal direction="up" delay={120}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#d9d0c4]">
            {/* Category Filter Pills */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Dining categories"
            >
              {diningCategories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    role="tab"
                    aria-selected={isSelected}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17352d] ${
                      isSelected
                        ? "bg-[#17352d] text-white shadow-sm"
                        : "bg-white text-[#0f302a] border border-[#d9d0c4] hover:border-[#17352d]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <label
                htmlFor="dining-sort-select"
                className="text-xs sm:text-sm font-medium text-[#0f302a]"
              >
                Sort by:
              </label>
              <select
                id="dining-sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-white border border-[#d9d0c4] text-[#0f302a] text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#17352d] font-sans"
              >
                <option value="nearest">Nearest first</option>
                <option value="name">Name: A–Z</option>
                <option value="price">Price: low to high</option>
              </select>
            </div>
          </div>
        </Reveal>

        {/* Dining Cards Grid */}
        {sortedVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleVenues.map((venue, idx) => (
              <DiningCard
                key={venue.id}
                venue={venue}
                index={idx}
                onOpenDetails={(v) => setActiveDialogVenue(v)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl p-10 text-center border border-[#d9d0c4] max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-semibold text-[#0f302a] mb-2">
              No dining places found
            </h3>
            <p className="text-sm text-[#50544e] mb-6">
              There are currently no dining places matching the &quot;{selectedCategory}&quot; category.
            </p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Section */}
        {hasMore && (
          <div className="mt-12 text-center flex flex-col items-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#80563e] text-[#80563e] hover:bg-[#80563e] hover:text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
            >
              LOAD MORE &rarr;
            </button>
            <span className="text-xs text-[#50544e]/70 font-sans mt-2.5">
              Discover more nearby places
            </span>
          </div>
        )}
      </div>

      {/* Dining Details Modal Dialog */}
      <DiningDetailsDialog
        venue={activeDialogVenue}
        onClose={() => setActiveDialogVenue(null)}
      />
    </section>
  );
}
