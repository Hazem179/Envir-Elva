"use client"

import { Progress } from "@/components/ui/progress"
import { Award, Flame, Trophy } from "lucide-react"
import type { UserStats } from "./types"

interface ProgressTilesProps {
  stats: UserStats
}

export function ProgressTiles({ stats }: ProgressTilesProps) {
  const xpPercent = Math.min(100, (stats.xp / stats.xpToNextLevel) * 100)

  return (
    <section className="progress-tiles">
      <div className="progress-tiles__card progress-tiles__card--xp">
        <div className="progress-tiles__icon">
          <Trophy />
        </div>
        <div className="progress-tiles__content">
          <span className="progress-tiles__label">Level Power</span>
          <strong className="progress-tiles__value">Level {stats.level}</strong>
          <Progress value={xpPercent} className="progress-tiles__progress" />
          <span className="progress-tiles__hint">{stats.xp} / {stats.xpToNextLevel} XP</span>
        </div>
      </div>

      <div className="progress-tiles__card progress-tiles__card--badges">
        <div className="progress-tiles__icon">
          <Award />
        </div>
        <div className="progress-tiles__content">
          <span className="progress-tiles__label">Shiny Badges</span>
          <strong className="progress-tiles__value">{stats.totalBadges}</strong>
          <span className="progress-tiles__hint">Collect more by finishing quests</span>
        </div>
      </div>

      <div className="progress-tiles__card progress-tiles__card--streak">
        <div className="progress-tiles__icon">
          <Flame />
        </div>
        <div className="progress-tiles__content">
          <span className="progress-tiles__label">Fire Streak</span>
          <strong className="progress-tiles__value">{stats.streak} days</strong>
          <span className="progress-tiles__hint">Keep learning every day</span>
        </div>
      </div>
    </section>
  )
}
