"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Zap, Cloud, Droplets, RotateCcw, ArrowRight, TreePine, Bath, Tv } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"
import {
  calcEnergy,
  calcWater,
  energyScore,
  waterScore,
  overallLevel,
  equivalences,
  OVERALL_MESSAGE,
  round,
  type EcoInputs,
} from "@/lib/eco-calc"

const BADGE_STYLE = [
  "bg-green/15 text-green-dark",
  "bg-gold/15 text-[#9a6f04]",
  "bg-red-accent/15 text-red-accent",
]

export function EcoResults({
  inputs,
  onChallenges,
  onRestart,
}: {
  inputs: EcoInputs
  onChallenges: () => void
  onRestart: () => void
}) {
  const router = useRouter()
  const energy = calcEnergy(inputs)
  const water = calcWater(inputs)
  const eScore = energyScore(energy.monthlyEnergyKWh, inputs.people)
  const wScore = waterScore(water.totalDailyL, inputs.people)
  const level = overallLevel(eScore, wScore)
  const msg = OVERALL_MESSAGE[level]
  const eq = equivalences(energy, water)
  const reaction = level === 0 ? "waving" : level === 1 ? "pointing" : "normal"

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-surface-leaf px-4 py-8">
      <div className="hero-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto w-full max-w-2xl"
      >
        {/* header */}
        <div className="text-center">
          <span className="inline-block rounded-pill bg-surface-2 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cyan-dark">
            Your Eco Score
          </span>
          <div className="mt-3 flex justify-center">
            <div className="w-28">
              <CharacterDisplay character="elva" state={reaction} size="lg" animate />
            </div>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary-leaf md:text-4xl">{msg.title}</h1>
          <p className="mx-auto mt-2 max-w-md text-pretty leading-relaxed text-fg2">{msg.text}</p>
        </div>

        {/* score badges */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <ScoreBadge label="Energy" value={eScore.label} level={eScore.level} icon={<Zap className="h-5 w-5" />} />
          <ScoreBadge label="Water" value={wScore.label} level={wScore.level} icon={<Droplets className="h-5 w-5" />} />
        </div>

        {/* numbers */}
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <NumberCard icon={<Zap className="h-5 w-5" />} tint="bg-gold/15" color="#9a6f04" value={`${round(energy.monthlyEnergyKWh)}`} unit="kWh / month" label="Energy" />
          <NumberCard icon={<Cloud className="h-5 w-5" />} tint="bg-fg2/10" color="#576a78" value={`${round(energy.monthlyCO2)}`} unit="kg CO₂ / month" label="Carbon" />
          <NumberCard icon={<Droplets className="h-5 w-5" />} tint="bg-cyan/15" color="#028798" value={`${round(water.monthlyM3, 1)}`} unit="m³ / month" label="Water" />
        </div>

        {/* equivalences */}
        <div className="mt-4 rounded-3xl border border-border bg-white p-5 shadow-[0_12px_30px_rgba(11,16,20,0.06)]">
          <p className="mb-3 font-display text-sm font-bold text-primary-deep">What does that mean?</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Equiv icon={<TreePine className="h-6 w-6 text-green-dark" />} big={eq.trees} text={`trees a year to clean your carbon`} />
            <Equiv icon={<Bath className="h-6 w-6 text-cyan-dark" />} big={eq.bathtubs} text={`bathtubs of water each month`} />
            <Equiv icon={<Tv className="h-6 w-6 text-[#9a6f04]" />} big={eq.tvHours} text={`hours of TV from your energy`} />
          </div>
        </div>

        {/* actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onChallenges}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-green px-7 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_rgba(58,179,8,0.32)] transition-transform hover:scale-[1.02] active:scale-95"
          >
            Take a Saving Challenge
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-cyan bg-white px-6 py-3.5 font-display font-semibold text-cyan-dark transition-colors hover:bg-cyan hover:text-white"
          >
            <RotateCcw className="h-5 w-5" />
            Try Again
          </button>
        </div>

        <p className="mx-auto mt-5 max-w-md text-center text-xs leading-relaxed text-fg3">
          This is a simple, fun estimate for learning — real energy and water use can
          differ. <button onClick={() => router.push("/dashboard")} className="story-link">Back to Dashboard</button>
        </p>
      </motion.div>
    </div>
  )
}

function ScoreBadge({ label, value, level, icon }: { label: string; value: string; level: number; icon: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-border px-4 py-3 ${BADGE_STYLE[level]}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70">{icon}</span>
      <div>
        <p className="font-display text-[0.65rem] font-semibold uppercase tracking-wide opacity-80">{label}</p>
        <p className="font-display text-lg font-extrabold leading-tight">{value}</p>
      </div>
    </div>
  )
}

function NumberCard({ icon, tint, color, value, unit, label }: { icon: React.ReactNode; tint: string; color: string; value: string; unit: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 text-center shadow-[0_8px_24px_rgba(11,16,20,0.05)]">
      <span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${tint}`} style={{ color }}>{icon}</span>
      <p className="mt-2 font-display text-2xl font-extrabold tabular-nums text-primary-deep">{value}</p>
      <p className="text-xs font-semibold text-fg3">{unit}</p>
    </div>
  )
}

function Equiv({ icon, big, text }: { icon: React.ReactNode; big: number; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface-2/60 px-3 py-2.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">{icon}</span>
      <p className="text-sm leading-snug text-fg2">
        <span className="font-display text-lg font-extrabold text-primary-deep">{big}</span> {text}
      </p>
    </div>
  )
}
