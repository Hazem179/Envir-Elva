"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Target, Gift } from "lucide-react"
import type { DailyQuest } from "./types"

interface DailyQuestsProps {
  quests: DailyQuest[]
}

export function DailyQuests({ quests }: DailyQuestsProps) {
  return (
    <div className="daily-quests-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Target size={36} />
        Today's Missions!
      </motion.h2>

      <div className="quests-grid">
        {quests.map((quest, index) => {
          const progress = (quest.progress / quest.total) * 100
          const isComplete = quest.progress >= quest.total

          return (
            <motion.div
              key={quest.id}
              className="quest-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="quest-header">
                <div className="quest-icon-wrapper" style={{ padding: 0, overflow: 'hidden' }}>
                  <img
                    src={quest.imageIcon}
                    alt={quest.title}
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: 'contain',
                      backgroundColor: 'white',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="quest-title">{quest.title}</h3>
                  {isComplete && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ color: "#3ab308", fontWeight: 700, fontSize: "14px" }}
                    >
                      <CheckCircle2 size={16} style={{ display: "inline", marginRight: "4px" }} />
                      Complete! 🎉
                    </motion.div>
                  )}
                </div>
              </div>

              <p className="quest-description">{quest.description}</p>

              {quest.reward && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '12px',
                  color: '#03aabd',
                  fontWeight: 600,
                  fontSize: '13px'
                }}>
                  <Gift size={14} />
                  <span>Reward: {quest.reward}</span>
                </div>
              )}

              <div className="quest-progress-wrapper">
                <div className="progress-label">
                  <span>{quest.progress} / {quest.total}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div
                    className="progress-bar-fill"
                    style={{ backgroundColor: "#03aabd" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
