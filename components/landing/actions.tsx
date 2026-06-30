"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { DUR, EASE_OUT, fadeUp } from "@/lib/motion"

type Action = {
  title: string
  text: string
  color: string // brand css var
  icon: ReactNode
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

const actions: Action[] = [
  {
    title: "Save Water",
    text: "Turn off the tap while you brush — every drop helps Envir.",
    color: "var(--cyan)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M12 2.5S5.5 9 5.5 14a6.5 6.5 0 0 0 13 0c0-5-6.5-11.5-6.5-11.5Z" />
      </svg>
    ),
  },
  {
    title: "Sort Waste",
    text: "Pop bottles and paper in the right bin so nothing is wasted.",
    color: "var(--green)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M7 6 5 9m12-3 2 3M9 6V4h6v2" />
        <path d="m4 9 1.5 11h13L20 9H4Z" />
        <path d="M10 12v5M14 12v5" />
      </svg>
    ),
  },
  {
    title: "Plant Green",
    text: "Grow a seed or a tree and give Elva a brand-new friend.",
    color: "var(--green-dark)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M12 21v-7" />
        <path d="M12 14c0-3 2-5 6-5-1 4-3 5-6 5Z" />
        <path d="M12 12c0-3-2-5-6-5 1 4 3 5 6 5Z" />
      </svg>
    ),
  },
  {
    title: "Save Energy",
    text: "Switch off lights you don't need and let the planet rest.",
    color: "var(--orange)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Share It",
    text: "Tell a friend the story so more young heroes can join in.",
    color: "var(--cyan-dark)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="m8.6 10.6 6.8-3.2M8.6 13.4l6.8 3.2" />
      </svg>
    ),
  },
]

export function Actions() {
  const reduce = useReducedMotion()

  return (
    <section id="act" className="relative overflow-hidden bg-surface-sky px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          {...fadeUp(reduce)}
          className="inline-block font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark"
        >
          Your Turn
        </motion.span>
        <motion.h2
          {...fadeUp(reduce, 0.05)}
          className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-primary-deep sm:text-4xl"
        >
          What You Can Do Today
        </motion.h2>
        <motion.p
          {...fadeUp(reduce, 0.1)}
          className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-fg2"
        >
          The Earth turns in your hands. Pick one small mission and watch the
          world spin a little cleaner.
        </motion.p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((a, i) => (
          <motion.article
            key={a.title}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: reduce ? 0 : DUR.entrance, ease: EASE_OUT, delay: reduce ? 0 : (i % 3) * 0.08 }}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-white px-5 py-5 shadow-[0_8px_24px_rgba(11,16,20,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,16,20,0.1)]"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white transition-transform group-hover:scale-110"
              style={{ backgroundColor: a.color }}
            >
              <span className="h-6 w-6">{a.icon}</span>
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-primary-deep">
                {a.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-fg2">{a.text}</p>
            </div>
          </motion.article>
        ))}

        {/* CTA tile that closes the section into the subscribe step */}
        <motion.a
          href="#subscribe"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: reduce ? 0 : DUR.entrance, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
          className="flex flex-col justify-center gap-1 rounded-2xl bg-green px-5 py-5 text-white shadow-[0_12px_30px_rgba(58,179,8,0.32)] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan active:scale-95"
        >
          <span className="font-display text-lg font-bold">Join the movement</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-white/90">
            Get story updates
            <svg viewBox="0 0 24 24" {...stroke} className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </motion.a>
      </div>
    </section>
  )
}
