"use client"

import type { AdventureBuddy } from "./types"

interface BuddyShowcaseProps {
  buddies: AdventureBuddy[]
}

export function BuddyShowcase({ buddies }: BuddyShowcaseProps) {
  return (
    <section className="buddy-showcase">
      <h2 className="buddy-showcase__title">Buddy energy check</h2>
      <div className="buddy-showcase__grid">
        {buddies.map((buddy) => (
          <div className="buddy-showcase__card" key={buddy.name}>
            <span className="buddy-showcase__emoji" aria-hidden>{buddy.emoji}</span>
            <div className="buddy-showcase__info">
              <span className="buddy-showcase__name">{buddy.name}</span>
              <span className="buddy-showcase__mood">{buddy.mood}</span>
              <div className="buddy-showcase__energy" role="progressbar" aria-valuenow={buddy.energy} aria-valuemin={0} aria-valuemax={100}>
                <div style={{ width: `${buddy.energy}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
