"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { DUR, EASE_OUT, fadeUp } from "@/lib/motion"

const INK = "#0b1014"
// 12-point starburst used for the "NEW!" sticker
const BURST =
  "polygon(50% 0%, 61% 16%, 80% 9%, 75% 29%, 95% 30%, 80% 45%, 100% 56%, 80% 62%, 88% 82%, 67% 78%, 60% 98%, 50% 82%, 40% 98%, 33% 78%, 12% 82%, 20% 62%, 0% 56%, 20% 45%, 5% 30%, 25% 29%, 20% 9%, 39% 16%)"

type Story = {
  id: number
  issue: string
  title: string
  blurb: string
  topic: string
  topicColor: string
  cover: string
  coverPos: string
  page: string
  isNew?: boolean
}

// Add new comics here as the library grows — the gallery scales automatically.
const stories: Story[] = [
  {
    id: 1,
    issue: "Issue #01",
    title: "The Plastic Bottle Mission",
    blurb:
      "A park full of trash becomes a mission. Envir and Elva show how reduce, reuse and recycle bring it back to life.",
    topic: "Recycle Smart",
    topicColor: "var(--green-dark)",
    cover: "/comics/cove_1.jpeg",
    coverPos: "center",
    page: "/comics/story_1.jpeg",
    isNew: true,
  },
  {
    id: 2,
    issue: "Issue #02",
    title: "Saving Water",
    blurb:
      "Every drop matters. The duo helps a friend swap a running tap for a simple water-saving habit.",
    topic: "Save Water",
    topicColor: "var(--cyan)",
    cover: "/comics/story_2.jpeg",
    coverPos: "top",
    page: "/comics/story_2.jpeg",
  },
  {
    id: 3,
    issue: "Issue #03",
    title: "Electricity Heroes",
    blurb:
      "Lights left on, energy slipping away. Join Envir and Elva as they turn everyone into an energy hero.",
    topic: "Save Energy",
    topicColor: "var(--orange)",
    cover: "/comics/cover_3.jpeg",
    coverPos: "center",
    page: "/comics/story_3.jpeg",
  },
  {
    id: 4,
    issue: "Issue #04",
    title: "Make a Recycling Project",
    blurb:
      "A step-by-step craft: collect, clean and create something useful and beautiful from things you'd throw away.",
    topic: "Recycle Smart",
    topicColor: "var(--green-dark)",
    cover: "/comics/story_4.jpeg",
    coverPos: "top",
    page: "/comics/story_4.jpeg",
  },
]

export function OurStories() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<Story | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <section id="stories" className="relative overflow-hidden bg-surface-2 px-4 py-24 sm:py-28">
      {/* halftone comic-page backdrop */}
      <div className="halftone-dots pointer-events-none absolute inset-0 text-primary-deep opacity-[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          {...fadeUp(reduce)}
          className="inline-block -rotate-2 rounded-md border-[2.5px] border-[#0b1014] bg-cyan px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_0_#0b1014]"
        >
          ★ Comics &amp; Stories ★
        </motion.span>
        <motion.h2
          {...fadeUp(reduce, 0.05)}
          className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-primary-deep [text-shadow:3px_3px_0_rgba(3,170,189,0.45)] sm:text-6xl"
        >
          Our Stories
        </motion.h2>
        <motion.p
          {...fadeUp(reduce, 0.1)}
          className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-fg2"
        >
          Pick an issue off the rack &mdash; bold little adventures where Envir and
          Elva turn eco-habits into action. <span className="font-bold text-primary-deep">Tap a cover to read!</span>
        </motion.p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s, i) => {
          const tilt = reduce ? 0 : i % 2 === 0 ? -2 : 2
          return (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => setActive(s)}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30, rotate: tilt }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: reduce ? 0 : DUR.entrance, ease: EASE_OUT, delay: reduce ? 0 : (i % 3) * 0.08 }}
              whileHover={reduce ? undefined : { rotate: 0, y: -10 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="group relative block aspect-[3/4] overflow-hidden rounded-xl border-[3px] border-[#0b1014] bg-white text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              <img
                src={s.cover}
                alt={`${s.title} comic cover`}
                loading="lazy"
                style={{ objectPosition: s.coverPos }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
              />
              {/* legibility wash behind the caption text (bottom only) */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90"
                aria-hidden="true"
              />
              {/* skewed ISSUE ribbon */}
              <span className="absolute left-0 top-4 -skew-x-6 border-y-2 border-r-2 border-[#0b1014] bg-[#0b1014] px-3 py-1 font-display text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white shadow-[2px_2px_0_0_rgba(3,170,189,0.6)]">
                {s.issue}
              </span>
              {s.isNew && (
                <motion.span
                  aria-hidden="true"
                  animate={reduce ? undefined : { rotate: [0, 8, -6, 0] }}
                  transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-3 top-3 flex h-14 w-14 items-center justify-center bg-gold font-display text-sm font-bold uppercase text-[#5a3d00]"
                  style={{ clipPath: BURST }}
                >
                  New!
                </motion.span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4 text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.7)]">
                <span
                  className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#0b1014] bg-white px-2.5 py-0.5 font-display text-[0.6rem] font-bold uppercase tracking-wide shadow-[2px_2px_0_0_#0b1014]"
                  style={{ color: s.topicColor }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.topicColor }} />
                  {s.topic}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight drop-shadow-[1px_2px_3px_rgba(0,0,0,0.5)]">
                  {s.title}
                </h3>
                {/* blurb + CTA reveal */}
                <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
                  <div className="overflow-hidden">
                    <p className="mt-2 text-sm leading-relaxed text-white/85">{s.blurb}</p>
                  </div>
                </div>
                {/* READ slides down to the end of the card on hover, back on hover-out */}
                <span className="mt-3 inline-flex translate-y-[140%] items-center gap-1.5 rounded-md border-2 border-[#0b1014] bg-green px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-white opacity-0 shadow-[2px_2px_0_0_rgba(11,16,20,0.5)] transition-all duration-300 ease-out [text-shadow:none] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  Read
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </motion.button>
          )
        })}

        {/* expansion placeholder — next issue */}
        <motion.div
          {...fadeUp(reduce, 0.1)}
          className="relative flex aspect-[3/4] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-[3px] border-dashed border-[#0b1014]/55 bg-surface-sky p-6 text-center"
        >
          <div className="comic-rays pointer-events-none absolute inset-0 text-cyan/30 opacity-30" aria-hidden="true" />
          <span
            className="relative flex h-16 w-16 items-center justify-center bg-cyan font-display text-[0.7rem] font-bold uppercase leading-none text-white"
            style={{ clipPath: BURST }}
          >
            Soon
          </span>
          <p className="relative font-display text-xl font-bold uppercase text-primary-deep">
            Next Issue
          </p>
          <p className="relative max-w-[20ch] text-sm leading-relaxed text-fg2">
            New Envir &amp; Elva adventures are hitting the shelf.
          </p>
        </motion.div>
      </div>

      {/* comic-framed reader lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} comic`}
          >
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 24, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: reduce ? 0 : DUR.base, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border-[3px] border-[#0b1014] bg-white shadow-[5px_5px_0_0_rgba(11,16,20,0.5)]"
            >
              <header className="flex items-center justify-between gap-4 border-b-[3px] border-[#0b1014] bg-[#0b1014] px-5 py-3 text-white">
                <div className="min-w-0">
                  <span className="font-display text-[0.62rem] font-bold uppercase tracking-[0.18em] text-cyan">
                    {active.issue}
                  </span>
                  <h3 className="truncate font-display text-lg font-bold uppercase leading-tight">
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close story"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-white/30 bg-white/10 text-white transition-colors hover:border-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </header>
              <div className="overflow-y-auto bg-surface-2">
                <img src={active.page} alt={`${active.title} — full comic`} className="mx-auto block w-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
