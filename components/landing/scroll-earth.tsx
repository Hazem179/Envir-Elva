"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

// Story stages, kept in sync with the beats in story-timeline.tsx.
const STAGES = [
  "A healthy world",
  "Pollution spreads",
  "The lowest point",
  "The turning point",
  "The Earth heals",
]

type Measure = {
  vh: number
  anchorY: number // document Y of the hero earth slot's centre
  storyTop: number
  storyEnd: number
}

/**
 * A single Earth shared between the hero and the story timeline.
 * It rests large under the hero buttons, then shrinks and pins to the TOP
 * of the viewport as the story scrolls past, spinning the whole time.
 */
export function ScrollEarth() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [phase, setPhase] = useState(0)
  const [m, setM] = useState<Measure>({
    vh: 800,
    anchorY: 560,
    storyTop: 900,
    storyEnd: 3000,
  })

  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight
      const sy = window.scrollY
      const anchor = document.getElementById("hero-earth-anchor")
      const story = document.getElementById("story")
      const a = anchor?.getBoundingClientRect()
      const s = story?.getBoundingClientRect()
      setM({
        vh,
        anchorY: a ? a.top + sy + a.height / 2 : vh * 0.7,
        storyTop: s ? s.top + sy : vh,
        storyEnd: s ? s.top + sy + s.height : vh * 3,
      })
    }
    measure()
    window.addEventListener("resize", measure)
    const t = window.setTimeout(measure, 400)
    return () => {
      window.removeEventListener("resize", measure)
      window.clearTimeout(t)
    }
  }, [])

  const { vh, anchorY, storyTop, storyEnd } = m

  // Where the Earth's centre rests once stuck near the top of the viewport.
  const pinTopCenter = Math.min(170, Math.max(118, vh * 0.17))
  const base = Math.min(260, Math.max(150, vh * 0.3))
  const labelTop = pinTopCenter + (base * 0.5) / 2 + 14
  const travel = Math.max(1, anchorY - pinTopCenter)

  // Earth centre (viewport px): follows the hero anchor, then clamps to the top.
  const centerRaw = useTransform(scrollY, (y) => Math.max(pinTopCenter, anchorY - y))
  const centerY = useSpring(centerRaw, { stiffness: 130, damping: 26, restDelta: 0.5 })

  // Large in the hero → small once pinned at the top.
  const scaleRaw = useTransform(scrollY, [0, travel], [1, 0.5], { clamp: true })
  const scale = useSpring(scaleRaw, { stiffness: 130, damping: 26, restDelta: 0.001 })

  const transform = useMotionTemplate`translate(-50%, -50%) translateY(${centerY}px) scale(${scale})`

  // Story progress 0→1 drives the pollution + healing arc.
  const storyProg = useTransform(scrollY, [storyTop, storyEnd], [0, 1], { clamp: true })
  useMotionValueEvent(storyProg, "change", (v) => {
    setPhase(Math.min(4, Math.max(0, Math.floor(v * 5))))
  })

  // Rotation: continuous auto-spin while in the hero, then driven purely by
  // scroll once the story begins (turns only as you scroll, stops when you do).
  const rotate = useMotionValue(0)
  const lastProg = useRef(0)
  useAnimationFrame((_, delta) => {
    if (reduce) return
    const y = scrollY.get()
    if (y < storyTop) {
      rotate.set(rotate.get() + (delta / 1000) * 24) // ~one turn / 15s
      lastProg.current = 0
    } else {
      const span = Math.max(1, storyEnd - storyTop)
      const prog = Math.min(1, Math.max(0, (y - storyTop) / span))
      rotate.set(rotate.get() + (prog - lastProg.current) * 720) // two turns across the story
      lastProg.current = prog
    }
  })

  const damage = useTransform(storyProg, [0, 0.25, 0.55, 0.8, 1], [0, 0.5, 0.95, 0.4, 0])
  const sickness = useTransform(damage, [0, 1], [0, 0.6])
  const filter = useTransform(sickness, (s) => `grayscale(${s}) brightness(${1 - s * 0.22})`)
  const spot1 = useTransform(damage, [0.1, 0.45], [0, 1])
  const spot2 = useTransform(damage, [0.25, 0.7], [0, 1])
  const spot3 = useTransform(damage, [0.45, 0.9], [0, 1])

  // Fade out once the story ends so the Earth never overlaps later sections.
  const opacity = useTransform(
    scrollY,
    [storyEnd - vh * 1.15, storyEnd - vh * 0.55],
    [1, 0],
    { clamp: true },
  )
  const labelOpacity = useTransform(
    scrollY,
    [storyTop - vh * 0.2, storyTop, storyEnd - vh * 0.7, storyEnd - vh * 0.35],
    [0, 1, 1, 0],
    { clamp: true },
  )

  return (
    <>
      <motion.div
        style={{
          transform: reduce
            ? `translate(-50%, -50%) translateY(${pinTopCenter}px) scale(0.6)`
            : transform,
          opacity: reduce ? 1 : opacity,
        }}
        className="pointer-events-none fixed left-1/2 top-0 z-[1] h-[clamp(120px,20vh,190px)] w-[clamp(120px,20vh,190px)] will-change-transform sm:h-[clamp(150px,30vh,260px)] sm:w-[clamp(150px,30vh,260px)]"
        aria-hidden="true"
      >
        {/* popup entrance (mount) — multiplies with the scroll-driven scale above */}
        <motion.div
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 14, delay: 0.25 }
          }
          className="h-full w-full"
        >
          {/* globe: auto-spins in the hero, scroll-driven rotation in the story */}
          <motion.div style={{ rotate }} className="relative h-full w-full">
            <motion.img
              src="/earth-icon.svg"
              alt=""
              style={{ filter }}
              className="h-full w-full select-none"
            />
            <motion.span
              style={{ opacity: spot1 }}
              className="absolute left-[26%] top-[24%] h-[9%] w-[11%] rounded-full bg-wood mix-blend-multiply"
            />
            <motion.span
              style={{ opacity: spot2 }}
              className="absolute left-[57%] top-[55%] h-[11%] w-[13%] rounded-full bg-[#503219] mix-blend-multiply"
            />
            <motion.span
              style={{ opacity: spot3 }}
              className="absolute left-[40%] top-[73%] h-[9%] w-[11%] rounded-full bg-wood mix-blend-multiply"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* live phase label, pinned just below the top-stuck Earth during the story */}
      <motion.div
        style={{ opacity: reduce ? 0 : labelOpacity, top: labelTop }}
        className="pointer-events-none fixed left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="rounded-pill border border-border bg-white/85 px-4 py-1.5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-primary-deep backdrop-blur sm:text-[0.7rem] sm:tracking-[0.16em]">
          {STAGES[phase]}
        </span>
        <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-fg3">
          {phase + 1} / {STAGES.length}
        </span>
      </motion.div>
    </>
  )
}
