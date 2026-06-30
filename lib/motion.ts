// Shared motion language for the Envir & Elva landing page.
// Keep durations/easings here so every component animates with the same rhythm.

export const DUR = {
  fast: 0.16,
  base: 0.3,
  slow: 0.6,
  entrance: 0.7,
} as const

// easeOutExpo-ish: confident entrance, gentle settle — fits the storybook feel.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const
// matches --ease-standard in globals.css, for interactive/scroll-linked motion.
export const EASE_STD = [0.2, 0, 0, 1] as const

// Standard "rise into view" used by section blocks and cards.
export function fadeUp(reduce: boolean | null, delay = 0) {
  return {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-15% 0px" },
    transition: {
      duration: reduce ? 0 : DUR.entrance,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  }
}

// Entrance variant driven by `animate` (for above-the-fold hero elements).
export function rise(reduce: boolean | null, delay = 0, y = 20) {
  return {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : DUR.entrance,
      ease: EASE_OUT,
      delay: reduce ? 0 : delay,
    },
  }
}
