"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { rise } from "@/lib/motion"

const ELVA =
  "/Elva_waving.png"
const ENVIR =
  "/Envir_waving.png"

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(800)

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Mascots pop out as the hero scrolls away, and back in on scroll up.
  const fadeRaw = useTransform(scrollY, [0, vh * 0.34], [1, 0], { clamp: true })
  const fade = useSpring(fadeRaw, { stiffness: 140, damping: 24, restDelta: 0.001 })
  const mascotScale = useTransform(fade, [0, 1], [0.7, 1])

  // Text + buttons + scroll prompt clear out a touch sooner, so everything is
  // gone before the Earth travels up and sticks to the top.
  const contentRaw = useTransform(scrollY, [0, vh * 0.28], [1, 0], { clamp: true })
  const contentFade = useSpring(contentRaw, { stiffness: 150, damping: 26, restDelta: 0.001 })

  // shared "pop" entrance for each mascot
  const popIn = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: "-50%" } : { opacity: 0, scale: 0, y: "-50%" },
    animate: { opacity: 1, scale: 1, y: "-50%" },
    transition: reduce
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 220, damping: 16, delay },
  })

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-surface-leaf px-4 pb-20 pt-24"
    >
      {/* slow moving background pattern */}
      <div className="hero-pattern pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      {/* soft leaf-tinted vignette to lift center content */}
      <div
        className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_200px_70px_rgba(243,251,238,0.92)]"
        aria-hidden="true"
      />

      {/* Elva — left side, mirrored to face inward, pops in/out (no idle float) */}
      <motion.div
        {...popIn(0.15)}
        className="pointer-events-none absolute left-0 top-1/2 z-0 hidden origin-left sm:block"
        aria-hidden="true"
      >
        <motion.img
          src={ELVA}
          alt="Elva, the green earth-girl, waving"
          style={{ scale: reduce ? 1 : mascotScale, opacity: reduce ? 1 : fade }}
          className="w-32 -scale-x-100 select-none drop-shadow-[0_14px_28px_rgba(11,16,20,0.18)] sm:w-52 md:w-64 lg:w-80 xl:w-[22rem]"
        />
      </motion.div>

      {/* Envir — right side, pops in/out */}
      <motion.div
        {...popIn(0.28)}
        className="pointer-events-none absolute right-0 top-1/2 z-0 hidden origin-right sm:block"
        aria-hidden="true"
      >
        <motion.img
          src={ENVIR}
          alt="Envir, the blue water-drop creature, waving"
          style={{ scale: reduce ? 1 : mascotScale, opacity: reduce ? 1 : fade }}
          className="w-32 select-none drop-shadow-[0_14px_28px_rgba(11,16,20,0.18)] sm:w-52 md:w-64 lg:w-80 xl:w-[22rem]"
        />
      </motion.div>

      {/* center column: text → buttons → Earth slot → scroll */}
      <motion.div
        style={{ opacity: reduce ? 1 : contentFade }}
        className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
      >
        <motion.span
          {...rise(reduce, 0, 16)}
          className="max-w-full rounded-pill border border-cyan/30 bg-white/70 px-4 py-1.5 font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-dark backdrop-blur sm:text-xs sm:tracking-[0.18em]"
        >
          An Interactive Eco-Story
        </motion.span>

        <motion.h1
          {...rise(reduce, 0.05)}
          className="mt-5 max-w-[13ch] text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-primary-leaf sm:max-w-[16ch] sm:text-5xl md:text-6xl"
        >
          The Earth Turns in <span className="text-cyan-dark">Your</span> Hands
        </motion.h1>

        <motion.p
          {...rise(reduce, 0.12)}
          className="mt-4 w-full max-w-md text-pretty text-base leading-relaxed text-fg2 sm:text-lg"
        >
          Follow <span className="font-bold text-cyan-dark">Envir</span> and{" "}
          <span className="font-bold text-green-dark">Elva</span> as you scroll the
          world from sickness back to bloom.
        </motion.p>

        {/* both buttons, directly under the text */}
        <motion.div
          {...rise(reduce, 0.2)}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <Link
            href="/start"
            className="rounded-pill bg-green px-6 py-3.5 text-center font-display font-semibold text-white shadow-[0_10px_24px_rgba(58,179,8,0.32)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan active:scale-95 sm:px-8"
          >
            Explore Activities
          </Link>
          <a
            href="#subscribe"
            className="rounded-pill border-2 border-cyan bg-white/70 px-6 py-3.5 text-center font-display font-semibold text-cyan-dark backdrop-blur transition-colors hover:bg-cyan hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:px-8"
          >
            Contact Us
          </a>
        </motion.div>

        {/* reserved space where the shared Earth rests in the hero (the Earth
            itself is rendered by <ScrollEarth/> as a fixed element) */}
        <div
          id="hero-earth-anchor"
          className="pointer-events-none mt-6 h-[clamp(120px,20vh,190px)] w-[clamp(120px,20vh,190px)] sm:mt-8 sm:h-[clamp(150px,30vh,260px)] sm:w-[clamp(150px,30vh,260px)]"
          aria-hidden="true"
        />
      </motion.div>

      {/* scroll-down prompt, under the Earth */}
      <motion.a
        href="#story"
        aria-label="Scroll down to the story"
        style={{ opacity: reduce ? 1 : contentFade }}
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary-leaf/70">
          Scroll
        </span>
        <span className="bob flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-leaf/40 bg-white/80 backdrop-blur transition-colors group-hover:border-green group-hover:bg-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-leaf transition-colors group-hover:text-green-dark"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="6 13 12 19 18 13" />
          </svg>
        </span>
      </motion.a>
    </section>
  )
}
