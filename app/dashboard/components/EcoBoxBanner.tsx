"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calculator, Droplets, Zap, ArrowRight } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"

export function EcoBoxBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby="eco-box-heading"
      className="relative overflow-hidden rounded-[28px] border border-border bg-white p-5 shadow-[0_18px_40px_-18px_rgba(7,67,58,0.3)] sm:p-7"
    >
      {/* flat accent rail (no gradient) */}
      <span className="absolute inset-y-0 left-0 w-1.5 bg-cyan" aria-hidden="true" />

      <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-sky px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.12em] text-cyan-dark">
            <Calculator className="h-3.5 w-3.5" />
            Eco Tool
          </span>

          <h2 id="eco-box-heading" className="mt-3 font-display text-2xl font-bold text-primary-deep sm:text-3xl">
            Measure your home&apos;s Eco Score
          </h2>
          <p className="mt-1.5 max-w-md text-pretty leading-relaxed text-fg2">
            Answer a few fun questions about your lights, gadgets, and water to
            see your energy, CO₂, and water use.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-gold/15 px-3 py-1 font-display text-xs font-semibold text-[#9a6f04]">
              <Zap className="h-3.5 w-3.5" /> Energy
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-cyan/15 px-3 py-1 font-display text-xs font-semibold text-cyan-dark">
              <Droplets className="h-3.5 w-3.5" /> Water
            </span>
          </div>

          <Link
            href="/eco-calculator"
            className="mt-5 inline-flex items-center gap-2 rounded-pill bg-green px-6 py-3 font-display font-bold text-white shadow-[0_10px_24px_rgba(58,179,8,0.3)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan active:scale-95"
          >
            Calculate My Eco Score
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* mascots — distinct tool feel, no game progress bars */}
        <div className="hidden items-end justify-center gap-1 sm:flex">
          <div className="w-24 lg:w-28">
            <CharacterDisplay character="envir" state="pointing" size="lg" animate />
          </div>
          <div className="w-24 lg:w-28">
            <CharacterDisplay character="elva" state="waving" size="lg" animate />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
