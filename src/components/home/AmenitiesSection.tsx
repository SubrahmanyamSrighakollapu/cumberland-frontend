"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Amenity } from "@/data/amenities";
import AmenityCard from "./AmenityCard";
import Reveal from "@/components/ui/Reveal";
import { fetchHomeAmenities } from "@/utils/amenityClient";

export default function AmenitiesSection() {
  const [items, setItems] = useState<Amenity[] | null>(null);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const res = await fetchHomeAmenities();
      if (!mounted) return;
      setItems(res ?? []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const list = items ?? [];

  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" duration={600}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
              MOTEL FACILITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-3">
              Practical facilities included with your stay.
            </h2>
            <p className="text-sm sm:text-base text-[#50544e] font-sans">
              Enjoy free on-site parking, Wi-Fi, an outdoor salt-water pool, and a covered BBQ area designed for guest comfort and convenience.
            </p>
          </div>
        </Reveal>

        {/* Amenity Cards Grid or Empty State */}
        {items !== null && list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((amenity, index) => (
              <Reveal
                key={amenity.id}
                direction="up"
                staggerIndex={index}
                duration={600}
              >
                <AmenityCard amenity={amenity} />
              </Reveal>
            ))}
          </div>
        )}

        {/* View All Amenities Button */}
        <Reveal direction="up" delay={200} duration={600}>
          <div className="mt-12 text-center">
            <Link
              href="/about#amenities"
              className="group inline-flex items-center justify-center gap-1.5 h-[46px] px-6 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-sm font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
            >
              <span>VIEW ALL AMENITIES</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
