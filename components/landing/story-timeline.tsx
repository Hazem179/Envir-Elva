"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { StoryBeat, type Beat } from "./story-beat"
import { fadeUp } from "@/lib/motion"

const beats: Beat[] = [
  {
    id: "beat-1",
    side: "right",
    stage: "A healthy world",
    character: {
      src: "/Elva.png",
      alt: "Elva standing calmly",
    },
    title: "A World That Breathes",
    body: (
      <>
        Meet <span className="em-green">Elva</span>, the heart of the forest.
        When the Earth is <span className="em-green">healthy</span>, she dances
        in the light. Keep scrolling to{" "}
        <a href="#beat-2" className="story-link">
          see what threatens her
        </a>
        .
      </>
    ),
  },
  {
    id: "beat-2",
    side: "left",
    stage: "Pollution spreads",
    flip: true,
    character: {
      src: "/Envir_sad.png",
      alt: "Envir, the water-drop, looking sad and covered in mud",
    },
    title: "The Waters Grow Heavy",
    body: (
      <>
        <span className="em-cyan">Envir</span> carries the world&apos;s water. As{" "}
        <span className="em-wood">pollution</span> spreads, he grows tired and{" "}
        <span className="em-red">sad</span>. Learn how it started by jumping back
        to{" "}
        <a href="#beat-1" className="story-link">
          the beginning
        </a>
        .
      </>
    ),
  },
  {
    id: "beat-3",
    side: "right",
    stage: "The lowest point",
    character: {
      src: "/Elva_sad.png",
      alt: "Elva crying, stained with mud",
    },
    title: "When Elva Cries",
    body: (
      <>
        The <span className="em-wood">damage</span> reaches Elva too. Her{" "}
        <span className="em-cyan">tears</span> fall for a wounded planet &mdash;
        but the story isn&apos;t over. Skip ahead to{" "}
        <a href="#beat-4" className="story-link">
          the turning point
        </a>
        .
      </>
    ),
  },
  {
    id: "beat-4",
    side: "left",
    stage: "The turning point",
    flip: true,
    character: {
      src: "/Envir_pointing.png",
      alt: "Envir pointing forward, hopeful",
    },
    title: "A Path Forward",
    body: (
      <>
        Envir points the way. Every{" "}
        <span className="em-green">small choice</span> helps the Earth spin{" "}
        <span className="em-cyan">clean</span> again. Ready to act? Head to{" "}
        <a href="#subscribe" className="story-link">
          join the movement
        </a>
        .
      </>
    ),
  },
  {
    id: "beat-5",
    side: "right",
    stage: "The Earth heals",
    character: {
      src: "/Elva_pointing.png",
      alt: "Elva pointing, smiling, with leaves around her",
    },
    title: "The Earth Heals",
    body: (
      <>
        Together, Envir and Elva watch the world{" "}
        <span className="em-green">bloom</span> once more. This is where{" "}
        <span className="em-cyan">you</span> come in. Return to{" "}
        <a href="#top" className="story-link">
          the top
        </a>{" "}
        or{" "}
        <a href="#subscribe" className="story-link">
          subscribe below
        </a>
        .
      </>
    ),
  },
]

export function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // drives the central progress rail only (the Earth lives in <ScrollEarth/>)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Fade the intro heading out as it rises, so it clears before reaching the
  // top-stuck Earth (nothing should overlap the Earth).
  const { scrollYProgress: headProg } = useScroll({
    target: headingRef,
    offset: ["start 0.42", "start 0.1"],
  })
  const headingOpacity = useTransform(headProg, [0, 1], [1, 0])

  return (
    <section id="story" className="relative bg-surface-2">
      {/* intro heading */}
      <motion.div
        ref={headingRef}
        style={{ opacity: reduce ? 1 : headingOpacity }}
        className="relative z-10 mx-auto max-w-2xl px-4 pb-2 pt-24 text-center sm:pt-28"
      >
        <motion.span
          {...fadeUp(reduce)}
          className="inline-block font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark"
        >
          The Storyline
        </motion.span>
        <motion.h2
          {...fadeUp(reduce, 0.05)}
          className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-primary-deep sm:text-4xl"
        >
          Five Stops on the Way Home
        </motion.h2>
        <motion.p
          {...fadeUp(reduce, 0.1)}
          className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-fg2"
        >
          Where you stop changes what the Earth becomes. Scroll slowly and watch it
          sicken, then heal.
        </motion.p>
      </motion.div>

      <div ref={ref} className="relative">
        {/* central progress rail */}
        <div className="pointer-events-none absolute inset-y-0 left-6 z-0 sm:left-1/2 sm:-translate-x-1/2">
          <div className="relative h-full w-[3px] rounded-full bg-border">
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-0 top-0 h-full w-full origin-top rounded-full bg-cyan"
            />
          </div>
        </div>

        {/* beats scroll past on alternating sides; the centred Earth shows behind */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-24 px-4 pb-[24svh] pt-[42svh] sm:gap-[44vh] sm:pb-[28vh] sm:pt-[48svh]">
          {beats.map((beat, i) => (
            <StoryBeat key={beat.id} beat={beat} index={i} total={beats.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
