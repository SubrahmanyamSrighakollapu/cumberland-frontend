"use client";

import { useEffect, useState } from "react";
import {
  GalleryCategory,
  GalleryItem,
  galleryItems as fallbackItems,
  galleryIntroData,
} from "@/data/gallery";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";
import GalleryFilters from "./GalleryFilters";
import GalleryTile from "./GalleryTile";
import GalleryProgress from "./GalleryProgress";
import GalleryPreview from "./GalleryPreview";
import Reveal from "@/components/ui/Reveal";

function transformApiItem(it: any): GalleryItem {
  return {
    id: String(it.id),
    title: it.title,
    category: it.category,
    image: normalizeAssetUrl(it.image),
    alt: it.alt,
    description: it.description || "",
    mediaType: it.mediaType || it.media_type || "image",
    duration: it.duration || undefined,
    layout: it.layout || "standard",
    route: it.route || undefined,
  };
}

export default function GalleryExplorer() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackItems);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [selectedItemId, setSelectedItemId] = useState<string>(fallbackItems[0]?.id ?? "");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(true);

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        const res: any = await apiFetch("/gallery?published_only=true");
        const list = res?.data?.items ?? res?.items ?? [];
        if (!cancel && Array.isArray(list) && list.length > 0) {
          const transformed = list.map(transformApiItem);
          setGalleryItems(transformed);
          if (transformed.length > 0) {
            setSelectedItemId((prev) => {
              const stillExists = transformed.some((t) => t.id === prev);
              return stillExists ? prev : transformed[0].id;
            });
          }
        }
      } catch (_err) {
        // keep fallbackItems as-is
      } finally {
        if (!cancel) setLoaded(true);
      }
    }
    load();
    return () => {
      cancel = true;
    };
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);

  const selectedItemIndex = Math.max(
    0,
    filteredItems.findIndex((item) => item.id === selectedItemId)
  );

  const currentSelectedItem =
    filteredItems[selectedItemIndex] || filteredItems[0];

  const handleCategorySelect = (category: GalleryCategory) => {
    setActiveCategory(category);
    setVisibleCount(8);
    const newFiltered =
      category === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === category);
    if (newFiltered.length > 0) {
      setSelectedItemId(newFiltered[0].id);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredItems.length));
  };

  const handleTileSelect = (item: GalleryItem) => {
    setSelectedItemId(item.id);
    setIsPreviewOpen(true);
  };

  const handlePrevPreview = () => {
    if (filteredItems.length === 0) return;
    const prevIndex =
      (selectedItemIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItemId(filteredItems[prevIndex].id);
  };

  const handleNextPreview = () => {
    if (filteredItems.length === 0) return;
    const nextIndex = (selectedItemIndex + 1) % filteredItems.length;
    setSelectedItemId(filteredItems[nextIndex].id);
  };

  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
              {galleryIntroData.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#20382f] font-normal leading-tight mb-3">
              {galleryIntroData.heading}
            </h2>
            <p className="text-base text-[#50544e] font-sans">
              {galleryIntroData.description}
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <GalleryFilters
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
            visibleCount={visibleItems.length}
            totalCount={filteredItems.length}
          />
        </Reveal>

        {!loaded && galleryItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex w-12 h-12 rounded-xl border-2 border-[#80563e]/30 border-t-[#80563e] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
            {visibleItems.map((item, idx) => (
              <GalleryTile
                key={item.id}
                item={item}
                index={idx}
                onSelect={handleTileSelect}
              />
            ))}
          </div>
        )}

        <Reveal direction="up" delay={150}>
          <GalleryProgress
            visibleCount={visibleItems.length}
            totalCount={filteredItems.length}
            onLoadMore={handleLoadMore}
          />
        </Reveal>

        {isPreviewOpen && currentSelectedItem && (
          <GalleryPreview
            item={currentSelectedItem}
            currentIndex={selectedItemIndex}
            totalCount={filteredItems.length}
            onPrev={handlePrevPreview}
            onNext={handleNextPreview}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
