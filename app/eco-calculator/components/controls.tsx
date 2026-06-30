"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Minus, Plus } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"

export function StepShell({
  stepIndex,
  total,
  mascot,
  prompt,
  title,
  children,
  onBack,
  onNext,
  nextLabel = "Next",
  canNext = true,
  hideBack = false,
}: {
  stepIndex: number
  total: number
  mascot: "envir" | "elva"
  prompt: ReactNode
  title?: string
  children: ReactNode
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  canNext?: boolean
  hideBack?: boolean
}) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-surface-leaf px-4 py-6">
      <div className="hero-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col">
        {/* progress */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-pill transition-colors ${i <= stepIndex ? "bg-green" : "bg-border"}`}
            />
          ))}
        </div>
        <p className="mt-2 text-center font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg3">
          Step {stepIndex + 1} of {total}
        </p>

        {/* mascot prompt */}
        <div className="mt-3 flex items-end gap-2">
          <div className="w-16 shrink-0 sm:w-20">
            <CharacterDisplay character={mascot} state="pointing" size="sm" animate />
          </div>
          <div className="relative mb-2 flex-1 rounded-2xl rounded-bl-sm border border-border bg-white px-4 py-3 shadow-sm">
            <p className="font-display text-sm font-semibold leading-snug text-primary-deep">{prompt}</p>
          </div>
        </div>

        {/* content */}
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 rounded-3xl border border-border bg-white p-5 shadow-[0_14px_36px_rgba(11,16,20,0.08)] sm:p-6"
        >
          {title && (
            <h2 className="mb-4 font-display text-xl font-bold text-primary-deep">{title}</h2>
          )}
          {children}
        </motion.div>

        {/* nav */}
        <div className="mt-5 flex items-center justify-between gap-3">
          {hideBack ? (
            <span />
          ) : (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 rounded-pill px-4 py-3 font-display text-sm font-semibold text-fg2 transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <button
            onClick={onNext}
            disabled={!canNext}
            className="inline-flex items-center gap-1.5 rounded-pill bg-green px-7 py-3 font-display font-bold text-white shadow-[0_10px_24px_rgba(58,179,8,0.3)] transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {nextLabel}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  icon,
  suffix,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  icon?: ReactNode
  suffix?: string
}) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-2/60 px-3 py-2.5">
      <span className="flex items-center gap-2 font-display text-sm font-semibold text-primary-deep">
        {icon && <span className="text-cyan-dark">{icon}</span>}
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={dec}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white text-primary-deep transition-colors hover:border-green disabled:opacity-40"
        >
          <Minus className="h-5 w-5" />
        </button>
        <span className="min-w-[3ch] text-center font-display text-xl font-extrabold tabular-nums text-primary-deep">
          {value}
          {suffix ? <span className="ml-0.5 text-xs font-semibold text-fg3">{suffix}</span> : null}
        </span>
        <button
          onClick={inc}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white text-primary-deep transition-colors hover:border-green disabled:opacity-40"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  icon,
  suffix,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  icon?: ReactNode
  suffix?: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-2/60 px-3 py-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-display text-sm font-semibold text-primary-deep">
          {icon && <span className="text-cyan-dark">{icon}</span>}
          {label}
        </span>
        <span className="shrink-0 rounded-pill bg-green/15 px-2.5 py-0.5 font-display text-sm font-extrabold tabular-nums text-green-dark">
          {value}
          {suffix ? <span className="ml-0.5 text-xs">{suffix}</span> : null}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-2 w-full cursor-pointer appearance-none rounded-pill bg-border accent-green"
      />
    </div>
  )
}

export function ChoiceCard({
  selected,
  onClick,
  icon,
  title,
  note,
}: {
  selected: boolean
  onClick: () => void
  icon: ReactNode
  title: string
  note?: string
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 text-center transition-all ${
        selected
          ? "border-green bg-green/10 shadow-[0_8px_20px_rgba(58,179,8,0.18)]"
          : "border-border bg-white hover:border-green/40"
      }`}
    >
      <span className={selected ? "text-green-dark" : "text-fg2"}>{icon}</span>
      <span className="font-display text-sm font-bold text-primary-deep">{title}</span>
      {note && <span className="text-[0.7rem] leading-tight text-fg3">{note}</span>}
    </button>
  )
}
