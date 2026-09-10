/**
 * Cumberland Motor Inn - Shared Motion System Tokens & Utilities
 * 
 * Calm, fluid, deliberate motion system tailored for a premium Cessnock motel.
 */

export const MOTION_TOKENS = {
  // Durations (ms)
  duration: {
    control: 160,     // Small control feedback (switches, indicators)
    button: 200,      // Button & link transitions
    cardHover: 280,   // Card hover & scale transitions
    entrance: 600,    // Section & card entrance animations
    imageReveal: 900, // Featured image uncover reveals
  },
  
  // Stagger delays (ms)
  stagger: {
    fast: 60,
    normal: 80,
    slow: 120,
    maxCap: 500,     // Cap max stagger delay for long lists
  },

  // Distance offsets (px)
  distance: {
    desktop: 20,
    mobile: 10,
    cardLift: 4,
  },

  // Scale factors
  scale: {
    cardImage: 1.03,
    heroImage: 1.035,
  },

  // Easing curve (cubic-bezier)
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  easingCSS: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

/**
 * Check if the browser prefers reduced motion.
 */
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
