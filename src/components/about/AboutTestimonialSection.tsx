import Image from "next/image";
import { aboutTestimonialData } from "@/data/about";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function AboutTestimonialSection() {
  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
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
                {/* 5 Copper Stars */}
                <div
                  className="flex items-center gap-1 text-[#80563e] mb-4"
                  aria-label={`Rating: ${aboutTestimonialData.rating} out of 5 stars`}
                >
                  {[...Array(aboutTestimonialData.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-[17px] text-[#20382f] leading-relaxed italic mb-6 font-sans">
                  {aboutTestimonialData.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#f7f4ee]">
                  <span className="w-6 h-[2px] bg-[#80563e]" />
                  <span className="text-sm font-semibold text-[#20382f]">
                    {aboutTestimonialData.author}
                  </span>
                  <span className="text-xs text-[#50544e]">
                    {aboutTestimonialData.date}
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
      </div>
    </section>
  );
}

