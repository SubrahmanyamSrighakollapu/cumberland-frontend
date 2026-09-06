"use client";

import Image from "next/image";
import Link from "next/link";
import { moreToExploreCards } from "@/data/gallery";
import Reveal from "@/components/ui/Reveal";

export default function MoreToExplore() {
  return (
    <section className="w-full bg-[#e9efe8] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="mb-10 md:mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
              MORE TO EXPLORE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-3">
              Picture yourself here.
            </h2>
            <p className="text-base text-[#50544e] font-sans max-w-2xl">
              Relaxing stays, beautiful surroundings and unforgettable experiences
              await.
            </p>
          </div>
        </Reveal>

        {/* 3 Exploration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {moreToExploreCards.map((card, idx) => (
            <Reveal
              key={card.id}
              direction="up"
              delay={100 + idx * 100}
              className="bg-white border border-[#d9d0c4] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e9efe8]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl text-[#20382f] font-normal mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#50544e] leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={card.route}
                  className="text-[#80563e] hover:text-[#69452f] text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1 transition-colors"
                >
                  <span>{card.actionText}</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
