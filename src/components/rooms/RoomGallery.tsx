"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { RoomDetail, RoomGalleryImage } from "@/data/rooms";

import ImageReveal from "@/components/ui/ImageReveal";

interface RoomGalleryProps {
  room?: RoomDetail;
  gallery?: RoomGalleryImage[];
  roomName?: string;
}

export default function RoomGallery({ room, gallery, roomName }: RoomGalleryProps) {
  const galleryList = room?.gallery || gallery || [];
  const name = room?.name || roomName || "";

  const [activeMainIndex, setActiveMainIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mainPhoto = galleryList[activeMainIndex] || galleryList[0];

  const handlePrevMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMainIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  };

  const handleNextMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMainIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  }, [galleryList.length]);

  const handleNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  }, [galleryList.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrevLightbox();
      } else if (e.key === "ArrowRight") {
        handleNextLightbox();
      }
    }
    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, handlePrevLightbox, handleNextLightbox]);

  if (!galleryList || galleryList.length === 0) return null;

  return (
    <section className="w-full bg-[#f7f4ee] pb-10 sm:pb-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Mosaic Gallery */}
        <div className="relative rounded-2xl overflow-hidden border border-[#d9d0c4]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 bg-[#d9d0c4]/40 p-2">
            {/* Left Large Main Photograph (60% width on desktop) */}
            <ImageReveal className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-xl overflow-hidden group bg-[#e9efe8]" delay={50}>
              <Image
                src={mainPhoto.src}
                alt={mainPhoto.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover cursor-pointer transition-transform duration-500 group-hover:scale-102"
                onClick={() => openLightbox(activeMainIndex)}
              />

              {/* Prev/Next Controls on Main Photo */}
              {galleryList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevMain}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0f302a] flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#17352d]"
                    aria-label="Previous main photo"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleNextMain}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0f302a] flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus-visible:ring-[#17352d]"
                    aria-label="Next main photo"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Main Photo Caption Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#0f302a]/85 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-md font-sans">
                {mainPhoto.caption}
              </div>
            </ImageReveal>

            {/* Right Side Mosaic Grid (40% width on desktop) */}
            <div className="hidden lg:grid lg:col-span-5 grid-rows-3 gap-2 h-[460px]">
              {/* Row 1: Top Wide Photo */}
              {galleryList[1] && (
                <div
                  onClick={() => openLightbox(1)}
                  className="relative rounded-xl overflow-hidden cursor-pointer group bg-[#e9efe8]"
                >
                  <Image
                    src={galleryList[1].src}
                    alt={galleryList[1].alt}
                    fill
                    sizes="40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Row 2: Two Side-by-Side Photos */}
              <div className="grid grid-cols-2 gap-2">
                {galleryList[2] && (
                  <div
                    onClick={() => openLightbox(2)}
                    className="relative rounded-xl overflow-hidden cursor-pointer group bg-[#e9efe8]"
                  >
                    <Image
                      src={galleryList[2].src}
                      alt={galleryList[2].alt}
                      fill
                      sizes="20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                {galleryList[3] && (
                  <div
                    onClick={() => openLightbox(3)}
                    className="relative rounded-xl overflow-hidden cursor-pointer group bg-[#e9efe8]"
                  >
                    <Image
                      src={galleryList[3].src}
                      alt={galleryList[3].alt}
                      fill
                      sizes="20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>

              {/* Row 3: Bottom Wide Photo */}
              {galleryList[4] && (
                <div
                  onClick={() => openLightbox(4)}
                  className="relative rounded-xl overflow-hidden cursor-pointer group bg-[#e9efe8]"
                >
                  <Image
                    src={galleryList[4].src}
                    alt={galleryList[4].alt}
                    fill
                    sizes="40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom-Right View All Photos Overlay Badge */}
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 bg-white hover:bg-[#f7f4ee] text-[#0f302a] text-xs font-semibold px-4 py-2 rounded-lg shadow-md border border-[#d9d0c4] transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17352d]"
          >
            <svg
              className="w-4 h-4 text-[#80563e]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>VIEW ALL {galleryList.length} PHOTOS</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">
                {name}
              </h3>
              <span className="text-xs text-white/70 font-sans">
                Photo {lightboxIndex + 1} of {galleryList.length} &bull;{" "}
                {galleryList[lightboxIndex]?.caption}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
              aria-label="Close lightbox"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Lightbox Main Image Display */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
              <Image
                src={galleryList[lightboxIndex]?.src || ""}
                alt={galleryList[lightboxIndex]?.alt || ""}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip Footer */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
            {galleryList.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 transition-all ${
                  idx === lightboxIndex
                    ? "ring-2 ring-[#80563e] opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
