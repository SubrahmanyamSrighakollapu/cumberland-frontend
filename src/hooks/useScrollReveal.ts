"use client";

import { useState, useEffect, RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useScrollReveal(
  targetRef: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.05,
    rootMargin = "0px 0px -20px 0px",
    once = false,
    delay = 0,
  } = options;

  const [isHydrated, setIsHydrated] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const element = targetRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsRevealed(true);
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              timeoutId = setTimeout(() => {
                setIsRevealed(true);
              }, delay);
            } else {
              setIsRevealed(true);
            }

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Reset reveal when element leaves viewport bounds completely
            const isOffBottom = entry.boundingClientRect.top > (window.innerHeight || 800);
            const isOffTop = entry.boundingClientRect.bottom < 0;

            if (isOffBottom || isOffTop) {
              if (timeoutId) clearTimeout(timeoutId);
              setIsRevealed(false);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (element) observer.unobserve(element);
    };
  }, [targetRef, threshold, rootMargin, once, delay]);

  return { isHydrated, isRevealed };
}



