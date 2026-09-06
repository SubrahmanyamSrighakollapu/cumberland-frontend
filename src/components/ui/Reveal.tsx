"use client";

import React, { useRef, useEffect, useState } from "react";

export interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  staggerIndex?: number;
  distance?: number;
  className?: string;
  as?: React.ElementType;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  staggerIndex = 0,
  distance = 36,
  className = "",
  as: Component = "div",
  once = false,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const totalDelay = delay + Math.min(staggerIndex * 90, 450);

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
            if (totalDelay > 0) {
              timer = setTimeout(() => {
                setIsRevealed(true);
              }, totalDelay);
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
  }, [totalDelay, once]);

  const getTransform = () => {
    if (isRevealed) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "none":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <Component
      ref={ref}
      className={`reveal-item ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${isRevealed ? totalDelay : 0}ms`,
      }}
    >
      {children}
    </Component>
  );
};

export default Reveal;




