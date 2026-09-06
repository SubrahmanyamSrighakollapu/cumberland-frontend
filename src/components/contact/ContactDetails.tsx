"use client";

import { contactInfoData } from "@/data/contact";
import Reveal from "@/components/ui/Reveal";

export default function ContactDetails() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "phone":
        return (
          <svg
            className="w-6 h-6 text-[#20382f]"
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
        );
      case "envelope":
        return (
          <svg
            className="w-6 h-6 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "pin":
        return (
          <svg
            className="w-6 h-6 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
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
        );
      case "clock":
        return (
          <svg
            className="w-6 h-6 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between h-full pr-0 lg:pr-4">
      <div>
        {/* Eyebrow & Heading */}
        <Reveal direction="up" delay={50}>
          <span className="text-xs font-semibold tracking-[0.16em] text-[#80563e] uppercase mb-2 block">
            {contactInfoData.eyebrow}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-3">
            {contactInfoData.heading}
          </h2>

          <p className="text-base text-[#50544e] font-sans mb-8 leading-relaxed">
            {contactInfoData.subtitle}
          </p>
        </Reveal>

        {/* 4 Contact Cards */}
        <div className="space-y-4">
          {contactInfoData.cards.map((card, idx) => (
            <Reveal key={card.id} direction="up" delay={100 + idx * 80}>
              <div className="bg-white border border-[#d9d0c4] rounded-md p-4 sm:p-5 flex items-center gap-4 shadow-xs">
                <div className="p-2.5 rounded-md bg-[#e9efe8] text-[#20382f] shrink-0">
                  {renderIcon(card.iconName)}
                </div>
                <div className="border-l border-[#d9d0c4]/60 pl-4">
                  <h3 className="font-serif text-lg text-[#20382f] font-normal">
                    {card.title}
                  </h3>
                  {card.actionHref ? (
                    <a
                      href={card.actionHref}
                      className="text-sm text-[#50544e] font-sans hover:text-[#80563e] transition-colors"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="text-sm text-[#50544e] font-sans">
                      {card.value}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Connect with us & Note */}
      <Reveal direction="up" delay={450}>
        <div className="mt-8 pt-6 border-t border-[#d9d0c4]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#50544e]">
              Connect with us
            </span>
            <div className="flex items-center gap-3 ml-2 text-[#20382f]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-1.5 rounded-full bg-[#e9efe8] hover:bg-[#80563e] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-1.5 rounded-full bg-[#e9efe8] hover:bg-[#80563e] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          <p className="text-xs text-[#50544e]/80 italic">
            {contactInfoData.responseTimeNote}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
