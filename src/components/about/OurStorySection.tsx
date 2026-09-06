import Image from "next/image";
import { ourStoryData } from "@/data/about";
import AboutStats from "./AboutStats";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function OurStorySection() {
  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Copy & Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal direction="up" delay={100} duration={600}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
                {ourStoryData.eyebrow}
              </span>
            </Reveal>

            <Reveal direction="up" delay={180} duration={650}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#20382f] font-normal leading-[1.1] mb-5">
                {ourStoryData.headingLines[0]}
                <br />
                {ourStoryData.headingLines[1]}
              </h2>
            </Reveal>

            <Reveal direction="up" delay={260} duration={650}>
              <div className="space-y-4 text-base sm:text-[17px] text-[#50544e] leading-relaxed mb-6 font-sans">
                <p>{ourStoryData.paragraph1}</p>
                <p>{ourStoryData.paragraph2}</p>
                <p>{ourStoryData.paragraph3}</p>
              </div>
            </Reveal>

            {/* Accent Line */}
            <Reveal direction="up" delay={340} duration={600}>
              <div className="flex items-center gap-3 pt-2">
                <span className="w-8 h-[2px] bg-[#80563e]" />
                <span className="font-serif text-xl sm:text-2xl text-[#80563e] italic">
                  {ourStoryData.accentLine}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Landscaped Property Photograph */}
          <div className="lg:col-span-6">
            <ImageReveal overlayColor="#f7f4ee" duration={900}>
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={ourStoryData.image}
                  alt={ourStoryData.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ImageReveal>
          </div>
        </div>

        {/* Property Statistics Row */}
        <AboutStats />
      </div>
    </section>
  );
}

