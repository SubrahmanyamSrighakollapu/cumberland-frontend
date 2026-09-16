"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";
import { galleryImages as fallbackImages } from "@/data/home";
import Reveal from "@/components/ui/Reveal";

interface PreviewItem {
  id: string;
  src: string;
  alt: string;
}

interface ApiGalleryItem {
  id: string | number;
  image: string;
  alt: string;
}

function itemsFromApi(items: ApiGalleryItem[]): PreviewItem[] {
  return items.slice(0, 5).map((it) => ({
    id: String(it.id),
    src: normalizeAssetUrl(it.image),
    alt: it.alt,
  }));
}

export default function GalleryPreviewSection() {
  const [images, setImages] = useState<PreviewItem[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        const res: any = await apiFetch("/gallery?published_only=true&limit=5");
        const list = res?.data?.items ?? res?.items ?? [];
        if (!cancel) {
          setImages(Array.isArray(list) ? itemsFromApi(list) : []);
        }
      } catch (_err) {
        if (!cancel) setImages([]);
      } finally {
        if (!cancel) setLoaded(true);
      }
    }
    load();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <section className="w-full bg-[#f7f4ee] pb-16 sm:pb-20 lg:pb-24 pt-4 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase block mb-1">
                OUR GALLERY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20382f] font-normal leading-tight">
                Preview our Cessnock motel rooms &amp; grounds.
              </h2>
            </div>

            <Link
              href="/gallery"
              className="group inline-flex items-center justify-center gap-1.5 h-[42px] px-5 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-xs font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
            >
              <span>VIEW GALLERY</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>

        {!loaded ? (
          <div className="text-center py-20">
            <div className="inline-flex w-10 h-10 rounded-xl border-2 border-[#80563e]/30 border-t-[#80563e] animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
              <Image
                src="/images/no-data-found.png"
                alt="No data found"
                fill
                className="object-contain"
                sizes="224px"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {images.map((img, index) => (
              <Reveal
                key={img.id}
                direction="up"
                distance={10}
                staggerIndex={index}
                duration={600}
              >
                <Link
                  href="/gallery"
                  className="relative block aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#e9efe8] shadow-xs group cursor-pointer border border-[#d9d0c4]/40 hover:border-[#80563e]/40 transition-colors"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
