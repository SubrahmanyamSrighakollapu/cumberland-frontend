"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

interface PillarItem {
  id: string;
  badge: string;
  travelTime: string;
  title: string;
  description: string;
  image: string;
  route: string;
  highlights: string[];
}

const pillars: PillarItem[] = [
  {
    id: "wine-country",
    badge: "WINERIES & TOURS",
    travelTime: "10 MIN DRIVE",
    title: "Wine Country & Cellar Doors",
    description:
      "Home to Australia's oldest wine region, offering world-famous Semillon, Shiraz, boutique cellar doors, and guided tasting tours.",
    image: "/images/wine-country.png",
    route: "/experiences/wine-country",
    highlights: [
      "Over 150 wineries & cellar doors nearby",
      "Local wine tour pick-up right from motel",
      "Scenic helicopter flights & estate tastings",
    ],
  },
  {
    id: "eat-and-drink",
    badge: "GASTRONOMY & COURTYARD",
    travelTime: "ON-SITE & TOWN",
    title: "Local Dining & Craft Breweries",
    description:
      "Indulge in regional bistro dining, cozy cafes, craft breweries, or prepare a relaxed outdoor meal at our on-site BBQ courtyard.",
    image: "/images/cumberland-outdoor-bbq-area.jpg",
    route: "/experiences/eat-and-drink",
    highlights: [
      "On-site undercover BBQ & garden courtyard",
      "Short walk to Cessnock bistros & cafes",
      "Vineyard dining & artisanal cheese tastings",
    ],
  },
  {
    id: "things-to-do",
    badge: "ATTRACTIONS & NATURE",
    travelTime: "5-15 MINS",
    title: "Things to Do & Local Attractions",
    description:
      "From championship golf courses and hot air balloon rides to cultural shows at CPAC and national park bushwalks.",
    image: "/images/thinks-to-do.png",
    route: "/experiences/things-to-do",
    highlights: [
      "5 mins to Cessnock Golf Course",
      "Walk to Cessnock Performing Arts Centre",
      "Hot air ballooning & Hunter Valley Gardens",
    ],
  },
];

export default function ExperiencePillars() {
  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
              CHOOSE YOUR EXPERIENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0f302a] font-normal leading-[1.15] mb-4">
              Explore the Best of the Hunter Region
            </h2>
            <p className="text-sm sm:text-base text-[#50544e] font-sans leading-relaxed">
              Select a category below to discover curated local itineraries, recommended venues, and travel guides for your stay.
            </p>
          </div>
        </Reveal>

        {/* 3 Columns Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.id} direction="up" staggerIndex={idx} delay={100}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-[#d9d0c4]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-md bg-[#0f302a]/80 backdrop-blur-md text-[10px] font-semibold tracking-wider text-white uppercase">
                      {pillar.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#80563e] text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm">
                      {pillar.travelTime}
                    </span>
                  </div>

                  {/* Image Overlay Title */}
                  <div className="absolute bottom-4 inset-x-4 z-10">
                    <h3 className="font-serif text-2xl text-white font-medium drop-shadow-md">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <p className="text-sm text-[#50544e] font-sans leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    {/* Highlights List */}
                    <div className="mb-8 pt-4 border-t border-[#d9d0c4]/40">
                      <h4 className="text-xs font-semibold text-[#80563e] tracking-wider uppercase mb-3">
                        HIGHLIGHTS & ADVANTAGES
                      </h4>
                      <ul className="space-y-2.5">
                        {pillar.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#50544e]">
                            <svg
                              className="w-4 h-4 text-[#80563e] shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={pillar.route}
                    className="inline-flex items-center justify-center w-full py-3.5 px-5 bg-[#0f302a] hover:bg-[#17352d] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 group-hover:shadow-md group-hover:bg-[#80563e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                  >
                    <span>EXPLORE SECTION</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
