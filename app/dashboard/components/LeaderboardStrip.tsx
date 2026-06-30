"use client"

import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import type { LeaderboardEntry } from "./types"

interface LeaderboardStripProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardStrip({ entries }: LeaderboardStripProps) {
  return (
    <section className="leaderboard-strip">
      <div className="leaderboard-strip__header">
        <h2>Eco stars</h2>
        <span>Cheer for your friends and climb the glow board</span>
      </div>
      <div className="leaderboard-strip__scroller" role="list">
        {entries.map((entry) => (
          <Card
            key={entry.rank}
            role="listitem"
            className={`leaderboard-strip__card ${entry.isUser ? "leaderboard-strip__card--self" : ""}`}
          >
            <div className="leaderboard-strip__rank">#{entry.rank}</div>
            <div className="leaderboard-strip__avatar" aria-hidden>{entry.avatar}</div>
            <div className="leaderboard-strip__info">
              <span className="leaderboard-strip__name">{entry.name}</span>
              <span className="leaderboard-strip__xp">{entry.xp} XP</span>
            </div>
            {entry.rank <= 3 && <Trophy className={`leaderboard-strip__trophy leaderboard-strip__trophy--${entry.rank}`} />}
            {entry.isUser && <span className="leaderboard-strip__you">You</span>}
          </Card>
        ))}
      </div>
    </section>
  )
}
