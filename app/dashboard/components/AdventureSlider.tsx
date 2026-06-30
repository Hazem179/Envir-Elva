"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { AdventureGame } from "./types"

interface AdventureSliderProps {
  games: AdventureGame[]
  activeIndex: number
  onIndexChange: (index: number) => void
  onStart: (route: string) => void
}

export function AdventureSlider({ games, activeIndex, onIndexChange, onStart }: AdventureSliderProps) {
  const current = games[activeIndex]

  const next = () => onIndexChange((activeIndex + 1) % games.length)
  const prev = () => onIndexChange((activeIndex - 1 + games.length) % games.length)

  return (
    <section className="adventure-slider">
      <div className="adventure-slider__header">
        <h2>Choose your mission</h2>
        <div className="adventure-slider__nav">
          <button type="button" className="adventure-slider__nav-button" onClick={prev} aria-label="Previous mission">
            <ChevronLeft />
          </button>
          <span className="adventure-slider__pill">{activeIndex + 1}/{games.length}</span>
          <button type="button" className="adventure-slider__nav-button" onClick={next} aria-label="Next mission">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="adventure-slider__viewport">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="adventure-slider__motion"
          >
            <div
              className="adventure-slider__card"
              style={{ background: current.gradient[0] }}
            >
              <div className="adventure-slider__body">
                <div className="adventure-slider__tagline">
                  <Badge variant="secondary" className="adventure-slider__badge">
                    {current.tagline}
                  </Badge>
                  <span className="adventure-slider__route">Tap to see {current.title}</span>
                </div>
                <h3>{current.title}</h3>
                <p className="adventure-slider__description">{current.description}</p>

                <div className="adventure-slider__highlights">
                  {current.highlights.map((highlight) => (
                    <div className="adventure-slider__highlight" key={highlight.label}>
                      {React.createElement(highlight.icon, { className: "adventure-slider__highlight-icon" })}
                      <span>{highlight.label}</span>
                    </div>
                  ))}
                </div>

                <div className="adventure-slider__mission">
                  <h4>Todays plan</h4>
                  <ul className="adventure-slider__mission-list">
                    {current.missionSteps.map((step) => (
                      <li key={step}>
                        <span className="adventure-slider__mission-bullet">✨</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="adventure-slider__progress">
                  <span>{current.progress.label}</span>
                  <Progress value={current.progress.value} className="adventure-slider__progress-bar" />
                  <span className="adventure-slider__progress-value">{current.progress.value}%</span>
                </div>

                <div className="adventure-slider__actions">
                  <Button className="adventure-slider__cta" onClick={() => onStart(current.route)}>
                    <Play className="adventure-slider__cta-icon" />
                    Start Mission
                  </Button>
                </div>
              </div>

              <div className="adventure-slider__buddies">
                {current.buddies.map((buddy) => (
                  <div className="adventure-slider__buddy" key={buddy.name}>
                    <span className="adventure-slider__buddy-emoji">{buddy.emoji}</span>
                    <div>
                      <span className="adventure-slider__buddy-name">{buddy.name}</span>
                      <span className="adventure-slider__buddy-mood">{buddy.mood}</span>
                    </div>
                    <div className="adventure-slider__buddy-energy" aria-label={`${buddy.energy}% energy`}>
                      <div style={{ width: `${buddy.energy}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
