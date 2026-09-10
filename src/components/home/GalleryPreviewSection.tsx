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
  const [images, setImages] = useState<PreviewItem[]>(fallbackImages);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        const res: any = await apiFetch("/gallery?published_only=true&limit=5");
        const list = res?.data?.items ?? res?.items ?? [];
        if (!cancel && Array.isArray(list) && list.length > 0) {
          setImages(itemsFromApi(list));
        }
      } catch (_err) {
        // keep fallback
      } finally {
        if (!cancel) setLoaded(true);
      }
    }
    load();
    return () => {
      cancel = true;
    };
  }, []);

  const display = images.length > 0 ? images : fallbackImages;

  return (
    <section className="w-full bg-[#f7f4ee] pb-16 sm:pb-20 lg:pb-24 pt-4 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase block">
              OUR GALLERY
            </span>

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

        {!loaded && display.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex w-10 h-10 rounded-xl border-2 border-[#80563e]/30 border-t-[#80563e] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {display.map((img, index) => (
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
