"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOK_DIRECT_URL } from "@/utils/siteLinks";

export default function PublicHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 250);
  };

  // Close dropdown on click outside or Escape press
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Control body scroll lock when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMenus = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };


  const isHomeActive = pathname === "/";
  const isAboutActive = pathname === "/about";
  const isRoomsActive = pathname === "/rooms";
  const isExperiencesActive = pathname.startsWith("/experiences");
  const isGalleryActive = pathname === "/gallery";
  const isContactActive = pathname === "/contact";

  return (
    <header className="w-full bg-[#0f302a] text-[#f7f4ee] border-b border-[#17352d]/50 sticky top-0 z-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-[84px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d] rounded-sm py-1"
          aria-label="Cumberland Motor Inn Home"
        >
          <Image
            src="/images/cumberland-logo.png"
            alt="Cumberland Motor Inn Logo"
            width={195}
            height={53}
            className="w-auto h-[44px] md:h-[50px] object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-2 text-[14px] font-medium tracking-wide"
          aria-label="Primary Navigation"
        >
          <Link
            href="/"
            className={
              isHomeActive
                ? "relative flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#b86f4b]/30 via-[#80563e]/40 to-[#b86f4b]/30 border border-[#e8c5af]/50 shadow-[0_0_16px_rgba(232,197,175,0.25)] backdrop-blur-md transition-all duration-300"
                : "relative flex items-center gap-2 px-4 py-2 rounded-full text-[#f7f4ee]/85 hover:text-white hover:bg-white/10 transition-all duration-300"
            }
          >
            {isHomeActive && (
              <span className="w-2 h-2 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] animate-pulse" />
            )}
            Home
          </Link>

          <Link
            href="/about"
            className={
              isAboutActive
                ? "relative flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#b86f4b]/30 via-[#80563e]/40 to-[#b86f4b]/30 border border-[#e8c5af]/50 shadow-[0_0_16px_rgba(232,197,175,0.25)] backdrop-blur-md transition-all duration-300"
                : "relative flex items-center gap-2 px-4 py-2 rounded-full text-[#f7f4ee]/85 hover:text-white hover:bg-white/10 transition-all duration-300"
            }
          >
            {isAboutActive && (
              <span className="w-2 h-2 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] animate-pulse" />
            )}
            About Us
          </Link>

          <Link
            href="/rooms"
            className={
              isRoomsActive
                ? "relative flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#b86f4b]/30 via-[#80563e]/40 to-[#b86f4b]/30 border border-[#e8c5af]/50 shadow-[0_0_16px_rgba(232,197,175,0.25)] backdrop-blur-md transition-all duration-300"
                : "relative flex items-center gap-2 px-4 py-2 rounded-full text-[#f7f4ee]/85 hover:text-white hover:bg-white/10 transition-all duration-300"
            }
          >
            {isRoomsActive && (
              <span className="w-2 h-2 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] animate-pulse" />
            )}
            Rooms
          </Link>

          {/* Experiences Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <button
              onClick={() => {
                if (dropdownTimeoutRef.current) {
                  clearTimeout(dropdownTimeoutRef.current);
                  dropdownTimeoutRef.current = null;
                }
                setIsDropdownOpen((prev) => !prev);
              }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              className={
                isExperiencesActive
                  ? "relative flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#b86f4b]/30 via-[#80563e]/40 to-[#b86f4b]/30 border border-[#e8c5af]/50 shadow-[0_0_16px_rgba(232,197,175,0.25)] backdrop-blur-md transition-all duration-300 cursor-pointer"
                  : "relative flex items-center gap-2 px-4 py-2 rounded-full text-[#f7f4ee]/85 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              }
            >
              {isExperiencesActive && (
                <span className="w-2 h-2 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] animate-pulse" />
              )}
              Experiences
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
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

            {/* Dropdown Menu (with pt-2 buffer bridge to eliminate dead gap) */}
            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-56 z-50"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="bg-[#0f302a]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 transition-all duration-200 animate-in fade-in slide-in-from-top-1">
                  <Link
                    href="/experiences/wine-country"
                    onClick={closeMenus}
                    className="block px-4 py-2.5 text-sm text-[#f7f4ee]/90 hover:text-white hover:bg-white/10 transition-colors"
                    role="menuitem"
                  >
                    Wine Country
                  </Link>
                  <Link
                    href="/experiences/eat-and-drink"
                    onClick={closeMenus}
                    className="block px-4 py-2.5 text-sm text-[#f7f4ee]/90 hover:text-white hover:bg-white/10 transition-colors"
                    role="menuitem"
                  >
                    Eat & Drink
                  </Link>
                  <Link
                    href="/experiences/things-to-do"
                    onClick={closeMenus}
                    className="block px-4 py-2.5 text-sm text-[#f7f4ee]/90 hover:text-white hover:bg-white/10 transition-colors"
                    role="menuitem"
                  >
                    Things to Do
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/gallery"
            className={
              isGalleryActive
                ? "relative flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#b86f4b]/30 via-[#80563e]/40 to-[#b86f4b]/30 border border-[#e8c5af]/50 shadow-[0_0_16px_rgba(232,197,175,0.25)] backdrop-blur-md transition-all duration-300"
                : "relative flex items-center gap-2 px-4 py-2 rounded-full text-[#f7f4ee]/85 hover:text-white hover:bg-white/10 transition-all duration-300"
            }
          >
            {isGalleryActive && (
              <span className="w-2 h-2 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] animate-pulse" />
            )}
            Gallery
          </Link>

          <Link
            href="/contact"
            className={
              isContactActive
                ? "relative flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#b86f4b]/30 via-[#80563e]/40 to-[#b86f4b]/30 border border-[#e8c5af]/50 shadow-[0_0_16px_rgba(232,197,175,0.25)] backdrop-blur-md transition-all duration-300"
                : "relative flex items-center gap-2 px-4 py-2 rounded-full text-[#f7f4ee]/85 hover:text-white hover:bg-white/10 transition-all duration-300"
            }
          >
            {isContactActive && (
              <span className="w-2 h-2 rounded-full bg-[#52c92d] shadow-[0_0_8px_#52c92d] animate-pulse" />
            )}
            Contact
          </Link>
        </nav>

        {/* CTA Book Button (Desktop) */}
        <div className="hidden lg:flex items-center">
          <a
            href={BOOK_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-1.5 h-[46px] px-6 bg-[#80563e] hover:bg-[#69452f] active:bg-[#583824] text-white text-sm font-semibold tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#80563e]"
          >
            <span>BOOK YOUR STAY</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>

        {/* Hamburger Toggle (Mobile / Tablet) */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden p-2 rounded-md text-[#f7f4ee] hover:text-white hover:bg-[#17352d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[84px] bottom-0 bg-[#0f302a] z-40 flex flex-col justify-between px-6 py-8 overflow-y-auto"
        >
          <div className="flex flex-col gap-6 text-lg font-medium">
            <Link
              href="/"
              onClick={closeMenus}
              className={`py-1 border-b border-[#17352d] flex items-center justify-between ${
                isHomeActive ? "text-[#52c92d] font-semibold" : "text-[#f7f4ee]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMenus}
              className={`py-1 border-b border-[#17352d] flex items-center justify-between ${
                isAboutActive
                  ? "text-[#52c92d] font-semibold"
                  : "text-[#f7f4ee]"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/rooms"
              onClick={closeMenus}
              className={`py-1 border-b border-[#17352d] flex items-center justify-between ${
                isRoomsActive
                  ? "text-[#52c92d] font-semibold"
                  : "text-[#f7f4ee]"
              }`}
            >
              Rooms
            </Link>

            {/* Mobile Experiences Group */}
            <div className="flex flex-col gap-3 py-1 border-b border-[#17352d]">
              <span className="text-sm font-semibold tracking-wider uppercase text-[#f7f4ee]/60">
                Experiences
              </span>
              <div className="pl-4 flex flex-col gap-3 text-base">
                <Link
                  href="/experiences/wine-country"
                  onClick={closeMenus}
                  className="text-[#f7f4ee]/90 hover:text-white"
                >
                  Wine Country
                </Link>
                <Link
                  href="/experiences/eat-and-drink"
                  onClick={closeMenus}
                  className="text-[#f7f4ee]/90 hover:text-white"
                >
                  Eat & Drink
                </Link>
                <Link
                  href="/experiences/things-to-do"
                  onClick={closeMenus}
                  className="text-[#f7f4ee]/90 hover:text-white"
                >
                  Things to Do
                </Link>
              </div>
            </div>

            <Link
              href="/gallery"
              onClick={closeMenus}
              className={`py-1 border-b border-[#17352d] flex items-center justify-between ${
                isGalleryActive
                  ? "text-[#52c92d] font-semibold"
                  : "text-[#f7f4ee]"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className={`py-1 border-b border-[#17352d] flex items-center justify-between ${
                isContactActive
                  ? "text-[#52c92d] font-semibold"
                  : "text-[#f7f4ee]"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="mt-8 pt-4 border-t border-[#17352d]">
            <a
              href={BOOK_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenus}
              className="w-full flex items-center justify-center h-[50px] bg-[#80563e] hover:bg-[#69452f] text-white text-base font-semibold tracking-wider rounded-lg transition-colors"
            >
              BOOK YOUR STAY &rarr;
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
