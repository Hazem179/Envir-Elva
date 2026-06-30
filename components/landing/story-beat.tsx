"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { DUR, EASE_OUT } from "@/lib/motion"

export type Beat = {
  id: string
  side: "left" | "right"
  stage: string
  character: { src: string; alt: string }
  title: string
  body: ReactNode
  flip?: boolean // mirror the character horizontally
}

export function StoryBeat({
  beat,
  index,
  total,
}: {
  beat: Beat
  index: number
  total: number
}) {
  const isLeft = beat.side === "left"
  const reduce = useReducedMotion()

  return (
    <div
      id={beat.id}
      className={`relative flex scroll-mt-28 items-center justify-start ${
        isLeft ? "sm:justify-start" : "sm:justify-end"
      }`}
    >
      {/* numbered node on the central line */}
      <div
        className="pointer-events-none absolute left-6 z-10 -translate-x-1/2 sm:left-1/2"
        aria-hidden="true"
      >
        <motion.span
          initial={reduce ? { opacity: 1 } : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
          transition={{ duration: reduce ? 0 : DUR.base, ease: EASE_OUT }}
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green font-display text-sm font-bold text-white shadow-[0_4px_12px_rgba(58,179,8,0.4)]"
        >
          {index + 1}
        </motion.span>
      </div>

      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: isLeft ? -40 : 40, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
        transition={{ duration: reduce ? 0 : DUR.slow, ease: EASE_OUT }}
        className={`ml-14 flex w-[calc(100%-3.5rem)] max-w-sm flex-col items-start gap-3 sm:ml-0 sm:w-full ${
          isLeft ? "sm:items-start" : "sm:items-end"
        }`}
      >
        {/* speech-bubble popup with hyperlinks (hugs the outer edge, away from the centre line) */}
        <div className="relative w-full rounded-2xl border border-border bg-white px-5 py-4 shadow-[0_16px_40px_rgba(11,16,20,0.12)]">
          <div className="flex items-center justify-between gap-3">
            {/* stage as a tinted status chip */}
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-leaf px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.1em] text-cyan-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              {beat.stage}
            </span>
            <span className="font-display text-[0.65rem] font-semibold text-fg3">
              {index + 1}/{total}
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl font-bold leading-snug text-primary-deep">
            {beat.title}
          </h3>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-fg2">{beat.body}</p>
          {/* bubble tail */}
          <span
            className={`absolute -bottom-2 h-4 w-4 rotate-45 border-b border-r border-border bg-white ${
              isLeft ? "left-8" : "left-8 sm:left-auto sm:right-8"
            }`}
            aria-hidden="true"
          />
        </div>

        <motion.img
          src={beat.character.src}
          alt={beat.character.alt}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: reduce ? 0 : DUR.slow, ease: EASE_OUT, delay: reduce ? 0 : 0.1 }}
          className={`w-28 select-none drop-shadow-[0_12px_24px_rgba(11,16,20,0.16)] sm:w-40 md:w-48 ${
            isLeft ? "sm:ml-2" : "sm:mr-2"
          } ${beat.flip ? "-scale-x-100" : ""}`}
        />
      </motion.div>
    </div>
  )
}
