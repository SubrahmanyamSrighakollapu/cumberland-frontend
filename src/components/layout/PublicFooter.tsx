"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { siteData } from "@/data/site";

export default function PublicFooter() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static frontend phase: no database submission or popups
    if (email) {
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#0f302a] text-[#f7f4ee] border-t border-[#17352d] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <Reveal direction="up" duration={600}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#17352d]">
            {/* Column 1: Brand & Social Links */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <Link
                  href="/"
                  className="inline-block mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
                  aria-label={`${siteData.name} Home`}
                >
                  <Image
                    src={siteData.logo.src}
                    alt={siteData.logo.alt}
                    width={180}
                    height={48}
                    className="w-auto h-[42px] object-contain"
                  />
                </Link>

                <p className="text-xs text-[#f7f4ee]/70 italic mb-6 font-sans">
                  {siteData.tagline}
                </p>

                {/* Social Media Links */}
                <div className="flex items-center gap-4 text-[#f7f4ee]/80 mb-6">
                  {siteData.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="p-2.5 rounded-full bg-[#17352d] hover:bg-[#80563e] text-white transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
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

              <p className="text-xs text-[#f7f4ee]/60">
                &copy; 2026 {siteData.name}. All rights reserved.
              </p>
            </div>

            {/* Column 2: Explore */}
            <div className="lg:col-span-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#f7f4ee]/60 mb-4 block">
                EXPLORE
              </span>
              <ul className="space-y-3 text-sm text-[#f7f4ee]/90">
                <li>
                  <Link href="/rooms" className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experiences"
                    className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experiences/wine-country"
                    className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Wine Country
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experiences/eat-and-drink"
                    className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Eat & Drink
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experiences/things-to-do"
                    className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Things to Do
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: The Motel */}
            <div className="lg:col-span-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#f7f4ee]/60 mb-4 block">
                THE MOTEL
              </span>
              <ul className="space-y-3 text-sm text-[#f7f4ee]/90">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#faq"
                    className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#f7f4ee]/60 mb-4 block">
                JOIN OUR MAILING LIST
              </span>

              <p className="text-sm text-[#f7f4ee]/85 leading-relaxed mb-4 font-sans">
                Get travel inspiration, local tips and exclusive offers.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-[#17352d] border border-[#17352d] text-white placeholder-[#f7f4ee]/50 px-4 py-3 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#52c92d] transition-all"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="group bg-[#80563e] hover:bg-[#69452f] active:bg-[#583824] text-white px-5 py-3 rounded-r-lg font-semibold text-sm transition-colors duration-200 shrink-0 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom Legal Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f7f4ee]/60">
            <div>
              <span>{siteData.copyrightText}</span>
            </div>

            <div className="flex items-center gap-6">
              {siteData.legalLinks.map((legal, idx) => (
                <span key={legal.id} className="flex items-center gap-6">
                  {idx > 0 && <span aria-hidden="true">|</span>}
                  <Link
                    href={legal.href}
                    className="hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {legal.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

