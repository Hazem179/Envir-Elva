"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Sparkles, Home, Hand, Leaf, ShieldX, Play } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"

interface GameIntroProps {
    character: string
    onStart: () => void
}

const RULES = [
    { icon: <Leaf className="h-4 w-4" />, tint: "bg-green/15 text-green-dark", text: "Drag good items (🌳 💧 ♻️) to your guide to heal them" },
    { icon: <ShieldX className="h-4 w-4" />, tint: "bg-red-accent/15 text-red-accent", text: "Dodge harmful items (🗑️ 🏭 🚗) — they drain health" },
    { icon: <Hand className="h-4 w-4" />, tint: "bg-cyan/15 text-cyan-dark", text: "Chain good drops for combo bonuses & keep health above 0" },
]

export function GameIntro({ character, onStart }: GameIntroProps) {
    const router = useRouter()
    const characterName = character === "envir" ? "Envir" : "Elva"

    return (
        <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface-leaf p-4">
            <div className="hero-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-green/15 blur-3xl" aria-hidden="true" />

            <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 text-center shadow-[0_30px_70px_rgba(11,16,20,0.14)] backdrop-blur-md md:p-8"
            >
                <span className="inline-block rounded-pill bg-surface-leaf px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark">
                    Eco Health Game
                </span>

                <div className="relative mt-4 flex justify-center">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/20 blur-2xl" aria-hidden="true" />
                    <CharacterDisplay
                        character={(character || "envir") as "envir" | "elva"}
                        state="waving"
                        size="lg"
                        animate
                    />
                </div>

                <h1 className="mt-4 font-display text-3xl font-bold text-primary-leaf md:text-4xl">
                    Keep <span className="text-green-dark">{characterName}</span> Healthy
                </h1>
                <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-fg2">
                    Feed your guide eco-friendly choices and protect them from pollution!
                </p>

                <div className="mt-6 space-y-2.5 text-left">
                    {RULES.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2/70 px-4 py-3"
                        >
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${r.tint}`}>
                                {r.icon}
                            </span>
                            <p className="text-sm leading-snug text-fg1">{r.text}</p>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={onStart}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-green px-8 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_rgba(58,179,8,0.35)] transition-transform hover:scale-[1.02] active:scale-95"
                >
                    <Play className="h-5 w-5" fill="currentColor" />
                    Start Game
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
