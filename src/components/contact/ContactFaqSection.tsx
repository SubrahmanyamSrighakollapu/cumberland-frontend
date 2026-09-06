"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faqSectionData } from "@/data/contact";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

export default function ContactFaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: FAQ Accordions (~51% width) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Reveal direction="up" delay={50}>
                <span className="text-xs font-semibold tracking-[0.16em] text-[#80563e] uppercase mb-2 block">
                  {faqSectionData.eyebrow}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-3">
                  {faqSectionData.heading}
                </h2>

                <p className="text-base text-[#50544e] font-sans mb-8 leading-relaxed">
                  {faqSectionData.description}
                </p>
              </Reveal>

              {/* 5 Accordions */}
              <div className="space-y-3">
                {faqSectionData.items.map((item, idx) => {
                  const isOpen = openId === item.id;
                  return (
                    <Reveal key={item.id} direction="up" delay={100 + idx * 80}>
                      <div className="bg-white border border-[#d9d0c4] rounded-md overflow-hidden transition-colors">
                        <button
                          type="button"
                          onClick={() => toggleFaq(item.id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${item.id}`}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
                        >
                          <span className="font-serif text-lg sm:text-xl text-[#20382f] font-normal pr-4">
                            {item.question}
                          </span>
                          <svg
                            className={`w-5 h-5 text-[#20382f] shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-[#80563e]" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {isOpen && (
                          <div
                            id={`faq-answer-${item.id}`}
                            className="px-4 pb-5 pt-1 sm:px-5 text-sm text-[#50544e] leading-relaxed font-sans border-t border-[#f7f4ee]"
                          >
                            {item.answer}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {/* View All FAQs Link Button */}
              <Reveal direction="up" delay={450}>
                <div className="mt-8">
                  <Link
                    href="/about#faq"
                    className="inline-flex items-center justify-center h-[42px] px-6 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
                  >
                    VIEW ALL FAQS &rarr;
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Balcony Image & Assistance Card (~46% width) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Balcony Photograph */}
            <ImageReveal className="aspect-[16/10] w-full rounded-xl overflow-hidden shadow-xs bg-[#e9efe8]" delay={150}>
              <Image
                src={faqSectionData.balconyImage}
                alt={faqSectionData.balconyAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center"
              />
            </ImageReveal>

            {/* Compact Assistance Card */}
            <Reveal direction="up" delay={250}>
              <div className="bg-white border border-[#d9d0c4] rounded-xl p-6 sm:p-7 flex items-start gap-4 mt-6 shadow-xs">
                <div className="p-3 rounded-full bg-[#e9efe8] text-[#80563e] shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#20382f] font-normal mb-1">
                    {faqSectionData.assistanceCard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#50544e] font-sans leading-relaxed mb-2">
                    {faqSectionData.assistanceCard.description}
                  </p>
                  <a
                    href={`tel:${faqSectionData.assistanceCard.phone.replace(/\s+/g, "")}`}
                    className="text-[#80563e] hover:text-[#69452f] font-semibold text-sm font-sans hover:underline"
                  >
                    {faqSectionData.assistanceCard.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
