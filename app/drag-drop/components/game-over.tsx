"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Heart, Sparkles, Trophy, Home, RotateCcw } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"

interface GameOverProps {
    character: string
    score: number
    itemsCollected: number
    onRestart: () => void
}

export function GameOver({ character, score, itemsCollected, onRestart }: GameOverProps) {
    const router = useRouter()
    const xpEarned = score * 2

    const tier =
        score >= 100
            ? { emoji: "🏆", title: "Eco Champion!", msg: "Incredible — the planet is thriving thanks to you!", state: "waving" as const }
            : score >= 50
                ? { emoji: "⭐", title: "Great Work!", msg: "You're becoming a real eco-hero. Keep going!", state: "pointing" as const }
                : { emoji: "🌱", title: "Good Start!", msg: "Every hero starts somewhere — try again!", state: "normal" as const }

    return (
        <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface-leaf p-4">
            <div className="hero-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-green/15 blur-3xl" aria-hidden="true" />

            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 text-center shadow-[0_30px_70px_rgba(11,16,20,0.14)] backdrop-blur-md md:p-8"
            >
                <motion.div
                    animate={{ scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                    className="text-6xl md:text-7xl"
                >
                    {tier.emoji}
                </motion.div>

                <h1 className="mt-2 font-display text-3xl font-bold text-primary-leaf md:text-4xl">{tier.title}</h1>
                <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-fg2">{tier.msg}</p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                    <StatCard icon={<Trophy className="h-6 w-6" />} label="Score" value={score} tint="bg-gold/15" color="#9a6f04" />
                    <StatCard icon={<Sparkles className="h-6 w-6" />} label="Items" value={itemsCollected} tint="bg-cyan/15" color="#028798" />
                    <StatCard icon={<Heart className="h-6 w-6" />} label="XP" value={`+${xpEarned}`} tint="bg-green/15" color="#2f9406" />
                </div>

                <div className="relative mt-6 flex justify-center">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/20 blur-2xl" aria-hidden="true" />
                    <CharacterDisplay
                        character={(character || "envir") as "envir" | "elva"}
                        state={tier.state}
                        size="md"
                        animate
                    />
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={onRestart}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-green px-8 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_rgba(58,179,8,0.35)] transition-transform hover:scale-[1.02] active:scale-95"
                    >
                        <RotateCcw className="h-5 w-5" />
                        Play Again
                    </button>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-pill border-2 border-cyan bg-white px-8 py-3.5 font-display font-semibold text-cyan-dark transition-colors hover:bg-cyan hover:text-white"
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

function StatCard({
    icon,
    label,
    value,
    tint,
    color,
}: {
    icon: React.ReactNode
    label: string
    value: number | string
    tint: string
    color: string
}) {
    return (
        <div className={`flex flex-col items-center gap-1 rounded-2xl border border-border ${tint} p-3`}>
            <span style={{ color }}>{icon}</span>
            <span className="text-xs font-semibold text-fg3">{label}</span>
            <span className="font-display text-xl font-extrabold" style={{ color }}>
                {value}
            </span>
        </div>
    )
}
