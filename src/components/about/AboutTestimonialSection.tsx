"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { aboutTestimonialData } from "@/data/about";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";
import { apiFetch } from "@/utils/apiClient";

interface TestimonialOverride {
  rating: number;
  quote: string;
  author: string;
  date: string;
}

export default function AboutTestimonialSection() {
  const [featured, setFeatured] = useState<TestimonialOverride | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res: any = await apiFetch("/testimonials?published_only=true&featured_only=true&limit=5");
        if (cancelled) return;
        const items: any[] = res?.data?.items ?? res?.items ?? [];
        if (items.length > 0) {
          const item = items.length === 1 ? items[0] : items[Math.floor(Math.random() * items.length)];
          setFeatured({
            rating: item.rating ?? 5,
            quote: item.quote,
            author: item.name,
            date: item.dateText || item.date_text || item.date || "",
          });
        } else {
          setFeatured(null);
        }
      } catch {
        if (!cancelled) setFeatured(null);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {!loaded ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-[#80563e] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : featured === null ? (
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Testimonial Card */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <Reveal direction="up" delay={100} duration={600}>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
                  {aboutTestimonialData.eyebrow}
                </span>
              </Reveal>

              <Reveal direction="up" delay={180} duration={650}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-6">
                  {aboutTestimonialData.heading}
                </h2>
              </Reveal>

              {/* Testimonial Card */}
              <Reveal direction="up" delay={260} duration={650}>
                <div className="bg-white border border-[#d9d0c4] rounded-xl p-7 sm:p-9 shadow-xs">
                  {/* Verified Stay Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e9efe8] text-[#20382f] text-xs font-medium mb-4">
                    <svg className="w-3.5 h-3.5 text-[#80563e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Verified Guest Stay</span>
                  </div>

                  {/* Quote */}
                  <p className="text-base sm:text-[17px] text-[#20382f] leading-relaxed italic mb-6 font-sans">
                    {featured.quote}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#f7f4ee]">
                    <span className="w-6 h-[2px] bg-[#80563e]" />
                    <span className="text-sm font-semibold text-[#20382f]">
                      {featured.author}
                    </span>
                    <span className="text-xs text-[#50544e]">
                      {featured.date}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

          {/* Right Column: Room & Balcony Photograph */}
          <div className="lg:col-span-6">
            <ImageReveal overlayColor="#f7f4ee" duration={900}>
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={aboutTestimonialData.image}
                  alt={aboutTestimonialData.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

