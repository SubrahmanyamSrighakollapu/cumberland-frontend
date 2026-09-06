"use client";

import { useState, useMemo } from "react";
import { wineryCategories, wineryList } from "@/data/wine-country";
import WineryCard from "./WineryCard";
import Reveal from "@/components/ui/Reveal";

export default function WineryExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"recommended" | "drive" | "name">(
    "recommended"
  );
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter wineries based on category
  const filteredWineries = useMemo(() => {
    if (selectedCategory === "All") {
      return wineryList;
    }
    return wineryList.filter((w) => w.categories.includes(selectedCategory));
  }, [selectedCategory]);

  // Sort wineries without mutating original dataset
  const sortedWineries = useMemo(() => {
    const list = [...filteredWineries];

    if (sortBy === "drive") {
      list.sort((a, b) => a.driveMinutes - b.driveMinutes);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "recommended" preserves the default array order

    return list;
  }, [filteredWineries, sortBy]);

  // Paginated visible wineries
  const visibleWineries = useMemo(() => {
    return sortedWineries.slice(0, visibleCount);
  }, [sortedWineries, visibleCount]);

  const hasMore = visibleCount < sortedWineries.length;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "recommended" | "drive" | "name");
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section
      id="featured-wineries"
      className="w-full bg-[#e9efe8] py-14 sm:py-16 lg:py-20 scroll-mt-20 border-b border-[#d9d0c4]/50"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
              FEATURED WINERIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a] mb-3">
              Cellar doors worth the journey.
            </h2>
            <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed">
              Explore a handpicked selection of remarkable cellar doors, each
              offering unique wines, warm hospitality and unforgettable
              experiences.
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
              aria-label="Winery categories"
            >
              {wineryCategories.map((category) => {
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
                htmlFor="winery-sort-select"
                className="text-xs sm:text-sm font-medium text-[#0f302a]"
              >
                Sort by:
              </label>
              <select
                id="winery-sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-white border border-[#d9d0c4] text-[#0f302a] text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#17352d] font-sans"
              >
                <option value="recommended">Recommended</option>
                <option value="drive">Drive time: shortest first</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>
        </Reveal>

        {/* Winery Cards Grid */}
        {sortedWineries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleWineries.map((winery, idx) => (
              <WineryCard key={winery.id} winery={winery} index={idx} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl p-10 text-center border border-[#d9d0c4] max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-semibold text-[#0f302a] mb-2">
              No cellar doors found
            </h3>
            <p className="text-sm text-[#50544e] mb-6">
              There are currently no wineries matching the &quot;{selectedCategory}&quot; category.
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
              Explore more cellar doors
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
