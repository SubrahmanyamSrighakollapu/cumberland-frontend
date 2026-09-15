"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  // Store last tracked path. On direct visit to a public page, the layout inline script
  // has already called gtag('config') for window.location.pathname.
  const lastTrackedPathRef = useRef<string | null>(
    typeof window !== "undefined" && !window.location.pathname.startsWith("/admin")
      ? window.location.pathname
      : null
  );

  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;

    // Admin routes are strictly excluded from GA4 marketing tracking
    if (pathname.startsWith("/admin")) {
      lastTrackedPathRef.current = null;
      return;
    }

    // If pathname matches what was already tracked (e.g. initial public SSR page load), skip duplicate event
    if (pathname === lastTrackedPathRef.current) {
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof win.gtag === "function") {
        win.gtag("config", "G-5MS8C0BV1J", {
          page_path: pathname,
        });
        lastTrackedPathRef.current = pathname;
      }
    } catch {
      // ignore analytics errors
    }
  }, [pathname]);

  return null;
}
