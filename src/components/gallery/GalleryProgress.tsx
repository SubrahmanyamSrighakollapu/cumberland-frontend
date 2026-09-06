interface GalleryProgressProps {
  visibleCount: number;
  totalCount: number;
  onLoadMore: () => void;
}

export default function GalleryProgress({
  visibleCount,
  totalCount,
  onLoadMore,
}: GalleryProgressProps) {
  const isAllLoaded = visibleCount >= totalCount;
  const progressPercent = totalCount > 0 ? (visibleCount / totalCount) * 100 : 100;

  return (
    <div className="mt-12 flex flex-col items-center justify-center text-center">
      {/* Progress Track & Bar */}
      <div className="w-full max-w-xs sm:max-w-md bg-[#d9d0c4]/50 h-1.5 rounded-full overflow-hidden mb-3">
        <div
          className="bg-[#0f302a] h-full transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Progress Status Message */}
      <p className="text-xs text-[#50544e] font-sans mb-5">
        {isAllLoaded ? "All moments are now showing." : "More moments to explore."}
      </p>

      {/* Load More Button */}
      {!isAllLoaded && (
        <button
          type="button"
          onClick={onLoadMore}
          className="inline-flex items-center justify-center h-[46px] px-8 bg-white border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
        >
          LOAD MORE &rarr;
        </button>
      )}
    </div>
  );
}
