import Image from "next/image";
import Link from "next/link";
import { welcomeData } from "@/data/home";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function WelcomeSection() {
  return (
    <section className="w-full bg-[#f7f4ee] pt-52 pb-16 sm:pt-32 sm:pb-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Property Exterior Photograph with Horizontal Uncover Effect */}
          <div className="lg:col-span-7">
            <ImageReveal overlayColor="#f7f4ee" duration={900}>
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/images/content-image-one.png"
                  alt="Cumberland Motor Inn exterior architecture and landscaped driveway"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
              </div>
            </ImageReveal>
          </div>

          {/* Right Column: Editorial Copy & Trust Indicators */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal direction="up" delay={100} duration={600}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
                {welcomeData.eyebrow}
              </span>
            </Reveal>

            <Reveal direction="up" delay={180} duration={600}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#20382f] font-normal leading-[1.1] mb-5">
                {welcomeData.headingLines[0]}
                <br />
                {welcomeData.headingLines[1]}
              </h2>
            </Reveal>

            <Reveal direction="up" delay={260} duration={600}>
              <div className="space-y-4 text-base sm:text-[17px] text-[#50544e] leading-relaxed mb-7 font-sans">
                <p>{welcomeData.paragraph1}</p>
                <p>{welcomeData.paragraph2}</p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={340} duration={600}>
              <div className="mb-10">
                <Link
                  href={welcomeData.learnMoreRoute}
                  className="group inline-flex items-center justify-center gap-1.5 h-[46px] px-6 bg-[#80563e] hover:bg-[#69452f] active:bg-[#583824] text-white text-sm font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                >
                  <span>LEARN MORE</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>

            {/* Trust Indicators Row */}
            <Reveal direction="up" delay={420} duration={650}>
              <div className="pt-6 border-t border-[#d9d0c4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {/* Star Rating */}
                <div className="flex items-start gap-3 sm:border-r border-[#d9d0c4] sm:pr-4">
                  <div className="p-2 rounded-full bg-[#e9efe8] text-[#20382f] shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#80563e]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#20382f]">
                      {welcomeData.trustIndicators[0].primary}
                    </div>
                    <div className="text-xs text-[#50544e]">
                      {welcomeData.trustIndicators[0].secondary}
                    </div>
                  </div>
                </div>

                {/* Waterfront Location */}
                <div className="flex items-start gap-3 sm:border-r border-[#d9d0c4] sm:pr-4">
                  <div className="p-2 rounded-full bg-[#e9efe8] text-[#20382f] shrink-0 mt-0.5">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#20382f]">
                      {welcomeData.trustIndicators[1].primary}
                    </div>
                    <div className="text-xs text-[#50544e]">
                      {welcomeData.trustIndicators[1].secondary}
                    </div>
                  </div>
                </div>

                {/* Recently Renovated */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-[#e9efe8] text-[#20382f] shrink-0 mt-0.5">
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#20382f]">
                      {welcomeData.trustIndicators[2].primary}
                    </div>
                    <div className="text-xs text-[#50544e]">
                      {welcomeData.trustIndicators[2].secondary}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
