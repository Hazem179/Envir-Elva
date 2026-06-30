"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Home, Play, Zap, Droplets, Leaf } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"

const STEPS = [
  { icon: <Zap className="h-4 w-4" />, tint: "bg-gold/15 text-[#9a6f04]", text: "Tell us about your lights and gadgets" },
  { icon: <Droplets className="h-4 w-4" />, tint: "bg-cyan/15 text-cyan-dark", text: "Show how your home uses water" },
  { icon: <Leaf className="h-4 w-4" />, tint: "bg-green/15 text-green-dark", text: "Get your Eco Score and saving challenges" },
]

export function EcoIntro({ onStart }: { onStart: () => void }) {
  const router = useRouter()
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface-leaf p-4">
      <div className="hero-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-border bg-white p-6 text-center shadow-[0_24px_60px_rgba(11,16,20,0.12)] md:p-8"
      >
        <span className="inline-block rounded-pill bg-surface-leaf px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark">
          An Eco Activity
        </span>

        <div className="mt-4 flex items-end justify-center gap-1">
          <div className="w-24 sm:w-28">
            <CharacterDisplay character="envir" state="waving" size="lg" animate />
          </div>
          <div className="w-24 sm:w-28">
            <CharacterDisplay character="elva" state="waving" size="lg" animate />
          </div>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold text-primary-leaf md:text-4xl">
          The Eco Box
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-fg2">
          Answer a few fun questions and discover how much energy and water your
          home uses — then learn how to save the planet!
        </p>

        <div className="mt-6 space-y-2.5 text-left">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2/60 px-4 py-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${s.tint}`}>{s.icon}</span>
              <p className="text-sm leading-snug text-fg1">{s.text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-green px-8 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_rgba(58,179,8,0.32)] transition-transform hover:scale-[1.02] active:scale-95"
        >
          <Play className="h-5 w-5" fill="currentColor" />
          Calculate My Eco Score
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-3 inline-flex items-center justify-center gap-2 font-display text-sm font-semibold text-fg2 transition-colors hover:text-primary-deep"
        >
          <Home className="h-4 w-4" />
          Back to Dashboard
        </button>
      </motion.div>
    </div>
  )
}
