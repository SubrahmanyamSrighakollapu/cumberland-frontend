"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { siteData } from "@/data/site";
import { BOOK_DIRECT_URL } from "@/utils/siteLinks";

export default function PublicFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#0b241f] via-[#0f302a] to-[#071915] text-[#f7f4ee] border-t border-[#80563e]/30 overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#80563e]/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[280px] bg-[#52c92d]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Feature Highlights Bar */}
      <div className="border-b border-white/10 bg-[#071915]/60 backdrop-blur-md">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-[#f7f4ee]/90">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#80563e]/30 border border-[#e8c5af]/30 flex items-center justify-center text-[#e8c5af] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>Direct Booking Rates</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#80563e]/30 border border-[#e8c5af]/30 flex items-center justify-center text-[#e8c5af] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span>Free Parking Within Motel</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#80563e]/30 border border-[#e8c5af]/30 flex items-center justify-center text-[#e8c5af] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Salt-Water Pool &amp; Free Wi-Fi</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#80563e]/30 border border-[#e8c5af]/30 flex items-center justify-center text-[#e8c5af] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>10 Mins to Hunter Valley Wineries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <Reveal direction="up" duration={600}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
            {/* Column 1: Brand Info & Socials */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <Link
                  href="/"
                  className="inline-block mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
                  aria-label={`${siteData.name} Home`}
                >
                  <Image
                    src={siteData.logo.src}
                    alt={siteData.logo.alt}
                    width={210}
                    height={56}
                    className="w-auto h-[48px] sm:h-[52px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <p className="text-sm text-[#f7f4ee]/80 font-serif italic mb-4 leading-relaxed">
                  &ldquo;{siteData.tagline}&rdquo;
                </p>

                {/* Contact Quick Details */}
                <div className="space-y-2.5 text-xs text-[#f7f4ee]/80 mb-6">
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#e8c5af] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{siteData.contact.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#e8c5af] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={siteData.contact.phoneRaw} className="hover:text-white transition-colors">
                      {siteData.contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#e8c5af] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${siteData.contact.email}`} className="hover:text-white transition-colors">
                      {siteData.contact.email}
                    </a>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-3">
                  {siteData.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#e8c5af] hover:bg-[#80563e] text-[#f7f4ee] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
                    >
                      {link.platform === "instagram" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )}
                      {link.platform === "facebook" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )}
                      {link.platform === "youtube" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div className="lg:col-span-2">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#e8c5af] mb-5 block">
                EXPLORE STAYS
              </span>
              <ul className="space-y-3 text-sm text-[#f7f4ee]/85">
                <li>
                  <Link href="/rooms" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Accommodation Rooms
                  </Link>
                </li>
                <li>
                  <Link href="/experiences" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Hunter Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/experiences/wine-country" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Wine Country Tours
                  </Link>
                </li>
                <li>
                  <Link href="/experiences/eat-and-drink" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Local Eat &amp; Drink
                  </Link>
                </li>
                <li>
                  <Link href="/experiences/things-to-do" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Things to Do in Cessnock
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Guest Care */}
            <div className="lg:col-span-2">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#e8c5af] mb-5 block">
                GUEST CARE
              </span>
              <ul className="space-y-3 text-sm text-[#f7f4ee]/85">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    About Our Motel
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Contact &amp; Location
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Quick Booking Card */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl space-y-4">
                <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#e8c5af] block">
                  NEWSLETTER &amp; OFFERS
                </span>

                <p className="text-xs text-[#f7f4ee]/85 leading-relaxed font-sans">
                  Subscribe to receive seasonal Hunter Valley travel guides, winery event updates, and direct booking specials.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#071915]/90 border border-white/15 text-white placeholder-[#f7f4ee]/50 px-4 py-3 rounded-l-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#e8c5af] transition-all"
                      aria-label="Email address for newsletter"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to newsletter"
                      className="group bg-gradient-to-r from-[#80563e] to-[#69452f] hover:from-[#69452f] hover:to-[#583824] active:scale-[0.98] text-white px-5 py-3 rounded-r-xl font-semibold text-xs transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer shadow-md"
                    >
                      <span>JOIN</span>
                      <svg
                        className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                  {subscribed && (
                    <p className="text-xs text-emerald-400 font-medium animate-pulse">
                      &check; Thank you for subscribing!
                    </p>
                  )}
                </form>

                <div className="pt-2 border-t border-white/10">
                  <a
                    href={BOOK_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#80563e]/40 hover:bg-[#80563e] border border-[#e8c5af]/30 hover:border-[#e8c5af] text-[#f7f4ee] hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Book Direct Online</span>
                    <span className="text-base">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom Legal & Back to Top Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f7f4ee]/60">
            <div className="flex items-center gap-2">
              <span>&copy; 2026 {siteData.name}. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors duration-200">
                Terms &amp; Conditions
              </Link>
              <span>|</span>
              <button
                onClick={scrollToTop}
                className="hover:text-white transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                title="Scroll to top"
              >
                <span>Back to top</span>
                <span className="text-sm font-bold">&uarr;</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

