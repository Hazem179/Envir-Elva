"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { DailyQuest } from "./types"

interface DailyQuestBoardProps {
  quests: DailyQuest[]
}

export function DailyQuestBoard({ quests }: DailyQuestBoardProps) {
  return (
    <section className="daily-quest-board">
      <div className="daily-quest-board__header">
        <h2>Daily eco quests</h2>
        <span className="daily-quest-board__count">{quests.length} active</span>
      </div>
      <div className="daily-quest-board__grid">
        {quests.map((quest) => (
          <Card className="daily-quest-board__card" key={quest.id}>
            <div className="daily-quest-board__icon">
              {React.createElement(quest.icon, { className: "daily-quest-board__icon-svg" })}
            </div>
            <div className="daily-quest-board__info">
              <h3>{quest.title}</h3>
              <p>{quest.description}</p>
            </div>
            <div className="daily-quest-board__progress">
              <div className="daily-quest-board__progress-label">
                <span>Progress</span>
                <strong>{quest.progress}/{quest.total}</strong>
              </div>
              <Progress value={(quest.progress / quest.total) * 100} className="daily-quest-board__progress-bar" />
            </div>
            <Button size="sm" className="daily-quest-board__cta">
              Continue
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
