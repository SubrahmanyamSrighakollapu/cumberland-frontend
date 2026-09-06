"use client";

import { useState, useMemo } from "react";
import {
  directoryFilterPills,
  activityList,
  Activity,
} from "@/data/things-to-do";
import ActivityCard from "./ActivityCard";
import ActivityDetailsDialog from "./ActivityDetailsDialog";
import Reveal from "@/components/ui/Reveal";

interface ActivitiesExplorerProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ActivitiesExplorer({
  activeFilter,
  onFilterChange,
}: ActivitiesExplorerProps) {
  const [sortBy, setSortBy] = useState<"nearest" | "name" | "free">(
    "nearest"
  );
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeDialogActivity, setActiveDialogActivity] =
    useState<Activity | null>(null);

  const [prevFilter, setPrevFilter] = useState(activeFilter);

  // Reset visible count when active filter changes
  if (activeFilter !== prevFilter) {
    setPrevFilter(activeFilter);
    setVisibleCount(6);
  }

  // Filter activities based on active filter
  const filteredActivities = useMemo(() => {
    if (activeFilter === "All") {
      return activityList;
    }
    return activityList.filter((act) => act.categories.includes(activeFilter));
  }, [activeFilter]);

  // Sort activities without mutating original dataset
  const sortedActivities = useMemo(() => {
    const list = [...filteredActivities];

    if (sortBy === "nearest") {
      list.sort((a, b) => a.distanceMeters - b.distanceMeters);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "free") {
      list.sort((a, b) => {
        if (a.priceLevel === 0 && b.priceLevel !== 0) return -1;
        if (a.priceLevel !== 0 && b.priceLevel === 0) return 1;
        return a.distanceMeters - b.distanceMeters;
      });
    }

    return list;
  }, [filteredActivities, sortBy]);

  // Visible activities subset
  const visibleActivities = useMemo(() => {
    return sortedActivities.slice(0, visibleCount);
  }, [sortedActivities, visibleCount]);

  const hasMore = visibleCount < sortedActivities.length;

  const handlePillClick = (filter: string) => {
    onFilterChange(filter);
    setVisibleCount(6);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "nearest" | "name" | "free");
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section
      id="activities"
      className="w-full bg-[#e9efe8] py-14 sm:py-16 lg:py-20 scroll-mt-20 border-b border-[#d9d0c4]/50"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#80563e] mb-2 block">
              ACTIVITIES & ATTRACTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-semibold text-[#0f302a] mb-3">
              Explore nearby.
            </h2>
            <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed">
              A handpicked selection of activities and attractions, all within
              easy reach of Cumberland Motor Inn.
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
              aria-label="Activity filter categories"
            >
              {directoryFilterPills.map((pill) => {
                const isSelected = activeFilter === pill;
                return (
                  <button
                    key={pill}
                    onClick={() => handlePillClick(pill)}
                    role="tab"
                    aria-selected={isSelected}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17352d] ${
                      isSelected
                        ? "bg-[#17352d] text-white shadow-sm"
                        : "bg-white text-[#0f302a] border border-[#d9d0c4] hover:border-[#17352d]"
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <label
                htmlFor="activity-sort-select"
                className="text-xs sm:text-sm font-medium text-[#0f302a]"
              >
                Sort by:
              </label>
              <select
                id="activity-sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-white border border-[#d9d0c4] text-[#0f302a] text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#17352d] font-sans"
              >
                <option value="nearest">Nearest first</option>
                <option value="name">Name: A–Z</option>
                <option value="free">Free activities first</option>
              </select>
            </div>
          </div>
        </Reveal>

        {/* Activity Cards Grid */}
        {sortedActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleActivities.map((activity, idx) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={idx}
                onOpenDetails={(act) => setActiveDialogActivity(act)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl p-10 text-center border border-[#d9d0c4] max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-semibold text-[#0f302a] mb-2">
              No activities found
            </h3>
            <p className="text-sm text-[#50544e] mb-6">
              There are currently no activities matching the &quot;{activeFilter}&quot; filter.
            </p>
            <button
              onClick={() => handlePillClick("All")}
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
              Find more ways to explore
            </span>
          </div>
        )}
      </div>

      {/* Activity Details Modal Dialog */}
      <ActivityDetailsDialog
        activity={activeDialogActivity}
        onClose={() => setActiveDialogActivity(null)}
      />
    </section>
  );
}
