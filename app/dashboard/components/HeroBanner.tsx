"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"
import type { UserStats } from "./types"

interface HeroBannerProps {
  character: string
  stats: UserStats
  onStart: () => void
}

export function HeroBanner({ character, stats, onStart }: HeroBannerProps) {
  const avatarSrc = character === "envir" ? "/Envir_happy.PNG" : "/Elva.png"
  const avatarAlt = character === "envir" ? "Envir" : "Elva"

  return (
    <div className="hero-banner">
      <div className="hero-banner__content">
        <div className="hero-banner__tag">Ready to shine, {stats.name}?</div>
        <h1 className="hero-banner__title">Let's grow our planet powers today</h1>
        <p className="hero-banner__subtitle">
          Pick a mission, cheer on your buddy, and earn sparkly badges for every brave eco move you make.
        </p>
        <div className="hero-banner__actions">
          <Button className="hero-banner__cta" onClick={onStart}>
            Start Adventure
          </Button>
          <div className="hero-banner__streak">
            <Flame className="hero-banner__streak-icon" />
            <div>
              <span className="hero-banner__streak-label">Fire Streak</span>
              <span className="hero-banner__streak-value">{stats.streak} days</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-banner__avatar">
        <motion.div
          className="hero-banner__avatar-inner"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <img src={avatarSrc} alt={avatarAlt} className="hero-banner__avatar-img" />
        </motion.div>
      </div>
    </div>
  )
}
