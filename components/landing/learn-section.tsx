"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { DUR, EASE_OUT, fadeUp } from "@/lib/motion"

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

type Pillar = {
  title: string
  desc: string
  color: string
  icon: ReactNode
}

const pillars: Pillar[] = [
  {
    title: "Save Water",
    desc: "Learn why every drop matters and how to use water carefully at home, school, and outdoors.",
    color: "var(--cyan)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M12 2.5S5.5 9 5.5 14a6.5 6.5 0 0 0 13 0c0-5-6.5-11.5-6.5-11.5Z" />
        <path d="M9 14a3 3 0 0 0 3 3" />
      </svg>
    ),
  },
  {
    title: "Reduce Waste",
    desc: "Discover how to avoid unnecessary waste and choose better habits every day.",
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
    title: "Recycle Smart",
    desc: "Help Envir and Elva sort paper, plastic, glass, and metal into the right bins.",
    color: "var(--green-dark)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
  {
    title: "Save Energy",
    desc: "Learn how switching off lights and devices can help protect the planet.",
    color: "var(--orange)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Protect Nature",
    desc: "Explore simple ways to care for trees, flowers, animals, and clean spaces.",
    color: "var(--primary-deep)",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M5 21c0-8 5-14 15-16 0 9-5 15-15 16Z" />
        <path d="M9 17c2-3 5-5.5 8-6.5" />
      </svg>
    ),
  },
]

export function LearnSection() {
  const reduce = useReducedMotion()

  return (
    <section id="learn" className="relative overflow-hidden bg-white px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          {...fadeUp(reduce)}
          className="inline-block font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark"
        >
          What Children Can Learn
        </motion.span>
        <motion.h2
          {...fadeUp(reduce, 0.05)}
          className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-primary-deep sm:text-4xl"
        >
          Five everyday eco-superpowers
        </motion.h2>
        <motion.p
          {...fadeUp(reduce, 0.1)}
          className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-fg2"
        >
          Each one is a small mission Envir and Elva can guide you through &mdash;
          tap a card to begin.
        </motion.p>
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-5">
        {pillars.map((p, i) => (
          <motion.a
            key={p.title}
            href="#act"
            aria-label={`${p.title} — ${p.desc}`}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: reduce ? 0 : DUR.entrance, ease: EASE_OUT, delay: reduce ? 0 : (i % 3) * 0.07 }}
            whileHover={reduce ? undefined : { y: -6 }}
            style={{ color: p.color }}
            className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-white p-6 text-left shadow-[0_8px_24px_rgba(11,16,20,0.05)] transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(11,16,20,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
          >
            {/* top accent bar reveals on hover/focus */}
            <span
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              aria-hidden="true"
            />
            {/* soft accent wash on hover */}
            <span
              className="pointer-events-none absolute inset-0 bg-current opacity-0 transition-opacity duration-300 group-hover:opacity-[0.04]"
              aria-hidden="true"
            />
            {/* oversized icon watermark for depth */}
            <span
              className="pointer-events-none absolute -bottom-5 -right-3 h-28 w-28 opacity-[0.05] transition-all duration-300 group-hover:scale-110 group-hover:opacity-[0.08]"
              aria-hidden="true"
            >
              {p.icon}
            </span>

            <div className="relative z-10 flex flex-col">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                style={{ backgroundColor: p.color }}
              >
                <span className="h-7 w-7">{p.icon}</span>
              </span>

              <h3 className="mt-5 font-display text-xl font-bold text-primary-deep">
                {p.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg2">{p.desc}</p>

              <span
                className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ color: p.color }}
              >
                Start the mission
                <svg viewBox="0 0 24 24" {...stroke} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
