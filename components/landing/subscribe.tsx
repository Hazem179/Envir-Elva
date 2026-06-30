"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { DUR, EASE_OUT, fadeUp } from "@/lib/motion"

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

const perks: { label: string; icon: ReactNode }[] = [
  {
    label: "Weekly comics",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M12 7v13" />
        <path d="M3 5.5C4.5 4.5 7 4 9 5s3 1 3 2c0-1 1-1.7 3-2s4.5-.5 6 .5V18c-1.5-1-4-1.5-6-.5s-3 1.5-3 2.5c0-1-1-1.7-3-2.5s-4.5-.5-6 .5Z" />
      </svg>
    ),
  },
  {
    label: "Eco missions",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
  },
  {
    label: "No spam, ever",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

export function Subscribe() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const reduce = useReducedMotion()
  const valid = /\S+@\S+\.\S+/.test(email)

  return (
    <section id="subscribe" className="relative overflow-hidden bg-surface-leaf px-4 py-24 sm:py-28">
      {/* soft decorative blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-green/15 blur-3xl" aria-hidden="true" />

      <motion.div
        {...fadeUp(reduce)}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_30px_70px_rgba(11,16,20,0.14)]"
      >
        {/* content + form */}
        <div className="px-6 py-10 sm:px-10">
          <span className="inline-block rounded-pill bg-surface-leaf px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark">
            Be Part of It
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.1] text-primary-leaf sm:text-4xl">
            Join <span className="text-green-dark">Envir</span> &amp;{" "}
            <span className="text-cyan-dark">Elva</span> on the journey
          </h2>
          <p className="mt-3 max-w-md text-pretty leading-relaxed text-fg2">
            Get a fresh comic and one small eco-action in your inbox &mdash; made
            for families and classrooms keeping Earth clean and bright.
          </p>

          {/* expectation-setting chips */}
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {perks.map((p) => (
              <li
                key={p.label}
                className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface-2 px-3 py-1.5 font-display text-xs font-semibold text-primary-deep"
              >
                <span className="h-4 w-4 text-cyan-dark">{p.icon}</span>
                {p.label}
              </li>
            ))}
          </ul>

          {done ? (
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : DUR.base, ease: EASE_OUT }}
              className="mt-7 flex items-start gap-3 rounded-2xl border border-green/25 bg-surface-leaf px-5 py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green text-white">
                <svg viewBox="0 0 24 24" {...stroke} className="h-5 w-5" aria-hidden="true">
                  <path d="m5 13 4 4 10-11" />
                </svg>
              </span>
              <div>
                <p className="font-display text-lg font-bold text-green-dark">
                  You&apos;re in &mdash; welcome aboard!
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-fg2">
                  Watch your inbox for the next Envir &amp; Elva story and eco-mission.
                </p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (valid) setDone(true)
              }}
              className="mt-7 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
            >
              <div className="flex flex-1 items-center gap-2.5 rounded-pill border-2 border-border bg-surface-2 px-4 transition-colors focus-within:border-cyan">
                <svg viewBox="0 0 24 24" {...stroke} className="h-5 w-5 shrink-0 text-fg3" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="w-full bg-transparent py-3 text-foreground outline-none placeholder:text-fg3"
                />
              </div>
              <button
                type="submit"
                disabled={!valid}
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-green px-7 py-3 font-display font-semibold text-white shadow-[0_10px_24px_rgba(58,179,8,0.32)] transition-all hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                Get Updates
                <svg viewBox="0 0 24 24" {...stroke} className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-fg3">
            Double opt-in &middot; unsubscribe anytime &middot;{" "}
            <a href="#story" className="story-link">
              revisit the story
            </a>
            .
          </p>
        </div>
      </motion.div>
    </section>
  )
}
