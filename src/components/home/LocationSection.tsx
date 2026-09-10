import Image from "next/image";
import Link from "next/link";
import { travelTimes } from "@/data/home";
import Reveal from "@/components/ui/Reveal";

export default function LocationSection() {
  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Map Graphic / Image */}
          <div className="lg:col-span-6">
            <Reveal direction="up" duration={600}>
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#d9d0c4] shadow-xs bg-[#e9efe8]">
                <Image
                  src="/images/content-image-four.png"
                  alt="Map showing Cumberland Motor Inn location at 57-61 Cumberland Street, Cessnock NSW"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Location Information & Travel Times */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal direction="up" delay={100} duration={600}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
                FIND US
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-4">
                Close to everything.
              </h2>
            </Reveal>

            <Reveal direction="up" delay={200} duration={600}>
              <p className="text-base sm:text-[17px] text-[#50544e] leading-relaxed mb-6 font-sans">
                Hunter Valley wineries, dining, parks, state forests and local attractions are all within easy reach. Cumberland Motor Inn is the perfect Cessnock base for your stay.
              </p>
            </Reveal>

            {/* Address Row */}
            <Reveal direction="up" delay={280} duration={600}>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#20382f] mb-8">
                <svg
                  className="w-5 h-5 text-[#80563e] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>57–61 Cumberland Street, Cessnock, NSW 2325</span>
              </div>
            </Reveal>

            {/* Buttons Row */}
            <Reveal direction="up" delay={340} duration={600}>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=57-61+Cumberland+Street+Cessnock+NSW+2325"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-1.5 h-[46px] px-6 bg-[#80563e] hover:bg-[#69452f] active:bg-[#583824] text-white text-sm font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                >
                  <span>GET DIRECTIONS</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-[46px] px-6 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-sm font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                >
                  CONTACT US
                </Link>
              </div>
            </Reveal>

            {/* Travel Times Grid */}
            <Reveal direction="up" delay={400} duration={600}>
              <div className="pt-6 border-t border-[#d9d0c4] grid grid-cols-1 sm:grid-cols-3 gap-4">
                {travelTimes.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#e9efe8] text-[#20382f] shrink-0">
                      {item.iconName === "beach" && (
                        <svg
                          className="w-4 h-4 text-[#20382f]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                          />
                        </svg>
                      )}
                      {item.iconName === "town" && (
                        <svg
                          className="w-4 h-4 text-[#20382f]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9"
                          />
                        </svg>
                      )}
                      {item.iconName === "vineyard" && (
                        <svg
                          className="w-4 h-4 text-[#20382f]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#20382f]">
                        {item.destination}
                      </div>
                      <div className="text-xs text-[#50544e]">{item.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
