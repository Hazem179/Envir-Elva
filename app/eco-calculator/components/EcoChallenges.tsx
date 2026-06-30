"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Check, Home, Sparkles } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"
import { CHALLENGES } from "../data"

export function EcoChallenges() {
  const router = useRouter()
  const [picked, setPicked] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-surface-leaf px-4 py-8">
      <div className="hero-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-2xl">
        <div className="text-center">
          <span className="inline-block rounded-pill bg-surface-2 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark">
            Your Turn
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-primary-leaf md:text-4xl">
            Pick Your Saving Challenges
          </h1>
          <p className="mx-auto mt-2 max-w-md text-pretty leading-relaxed text-fg2">
            Choose the ones you&apos;ll try this week. Small actions add up to a big difference!
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {CHALLENGES.map((c) => {
            const on = picked.includes(c.id)
            const Icon = c.icon
            const tint = c.kind === "water" ? "text-cyan-dark" : "text-green-dark"
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                aria-pressed={on}
                className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                  on ? "border-green bg-green/10" : "border-border bg-white hover:border-green/40"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 ${tint}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-base font-bold text-primary-deep">{c.title}</p>
                  <p className="mt-0.5 text-sm leading-snug text-fg2">{c.text}</p>
                </div>
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    on ? "border-green bg-green text-white" : "border-border text-transparent"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </span>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setDone(true)}
          disabled={picked.length === 0}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-green px-8 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_rgba(58,179,8,0.32)] transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <Sparkles className="h-5 w-5" />
          I&apos;m In! ({picked.length})
        </button>
      </div>

      {/* celebration */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-deep/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="w-full max-w-sm rounded-[2rem] border border-border bg-white p-7 text-center shadow-2xl"
            >
              <div className="mx-auto w-28">
                <CharacterDisplay character="envir" state="waving" size="lg" animate />
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-primary-leaf">You&apos;re an Eco-Hero!</h2>
              <p className="mt-2 text-pretty leading-relaxed text-fg2">
                You picked <span className="font-bold text-green-dark">{picked.length}</span> challenge
                {picked.length === 1 ? "" : "s"}. Go make the planet smile!
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-green px-7 py-3.5 font-display font-bold text-white shadow-[0_10px_24px_rgba(58,179,8,0.3)] transition-transform hover:scale-[1.02] active:scale-95"
              >
                <Home className="h-5 w-5" />
                Back to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
