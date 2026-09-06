"use client";

import React, { useRef, useEffect, useState } from "react";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  overlayColor?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  className = "",
  overlayColor = "#f7f4ee",
  delay = 0,
  duration = 900,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsRevealed(true);
      return;
    }

    let timer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              timer = setTimeout(() => {
                setIsRevealed(true);
              }, delay);
            } else {
              setIsRevealed(true);
            }
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight || rect.bottom < 0) {
              if (timer) clearTimeout(timer);
              setIsRevealed(false);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);

    return () => {
      if (timer) clearTimeout(timer);
      if (el) observer.unobserve(el);
    };
  }, [delay, once]);

  return (
    <div
      ref={ref}
      className={`image-reveal-wrapper ${isRevealed ? "is-revealed" : ""} ${className}`}
    >
      {/* Content / Image */}
      <div className="image-reveal-content w-full h-full">
        {children}
      </div>

      {/* Horizontal Uncover Overlay Mask */}
      <div
        className="image-reveal-mask"
        style={{
          backgroundColor: overlayColor,
          transitionDuration: `${duration}ms`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default ImageReveal;



