"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import type { BadgeData } from "./types"

interface BadgeCarouselProps {
  badges: BadgeData[]
}

export function BadgeCarousel({ badges }: BadgeCarouselProps) {
  const unlocked = badges.filter((badge) => badge.unlocked).length

  return (
    <section className="badge-carousel">
      <div className="badge-carousel__header">
        <h2>Treasure badges</h2>
        <span className="badge-carousel__summary">{unlocked} unlocked</span>
      </div>
      <div className="badge-carousel__list" role="list">
        {badges.map((badge) => (
          <Card className="badge-carousel__item" role="listitem" key={badge.id}>
            <div className="badge-carousel__icon" style={{ background: badge.color }}>
              {React.createElement(badge.icon, { className: "badge-carousel__icon-svg" })}
            </div>
            <span className="badge-carousel__name">{badge.name}</span>
            <span className={`badge-carousel__status ${badge.unlocked ? "badge-carousel__status--unlocked" : ""}`}>
              {badge.unlocked ? "Unlocked" : "Locked"}
            </span>
          </Card>
        ))}
      </div>
    </section>
  )
}
