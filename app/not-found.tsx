import Link from "next/link";
import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Page Not Found | Cumberland Motor Inn",
  description:
    "The requested page or room accommodation could not be found at Cumberland Motor Inn.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#80563e] mb-3 font-sans">
            404 — ERROR
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#17352d] font-normal mb-4">
            Page Not Found
          </h1>
          <p className="text-base text-[#50544e] font-sans font-light leading-relaxed mb-8">
            The page or room accommodation you are looking for could not be found. It may have been moved, updated, or is no longer available.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-sans">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#17352d] hover:bg-[#0f302a] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/rooms"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#80563e] hover:bg-[#68432f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              View Rooms
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-[#d9d0c4] text-[#17352d] hover:bg-[#eae4d9] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
