"use client"

import { motion } from "framer-motion"
import { Award, Lock } from "lucide-react"
import type { BadgeData } from "./types"

interface BadgesSectionProps {
  badges: BadgeData[]
}

export function BadgesSection({ badges }: BadgesSectionProps) {
  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <div className="badges-section">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <motion.h2
          className="section-title"
          style={{ margin: 0 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Award size={36} />
          Your Badges
        </motion.h2>

        <motion.div
          style={{
            background: "#3ab308",
            color: "white",
            padding: "12px 24px",
            borderRadius: "999px",
            fontWeight: 800,
            fontSize: "18px"
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          {unlockedCount} / {badges.length} Collected! 🏆
        </motion.div>
      </div>

      <div className="badges-grid">
        {badges.map((badge, index) => {
          return (
            <motion.div
              key={badge.id}
              className={`badge-item ${badge.unlocked ? "unlocked" : "locked"}`}
              style={{ color: badge.color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: badge.unlocked ? 1.15 : 1.05 }}
              title={badge.description}
            >
              <div className="badge-icon-wrapper" style={{
                padding: 0,
                overflow: 'hidden',
                filter: badge.unlocked ? 'none' : 'grayscale(100%) opacity(0.5)'
              }}>
                {badge.unlocked ? (
                  <img
                    src={badge.imageIcon}
                    alt={badge.name}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: 'contain',
                      backgroundColor: 'white',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  <div style={{
                    position: 'relative',
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={badge.imageIcon}
                      alt={badge.name}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: 'contain',
                        backgroundColor: 'white',
                        borderRadius: '50%'
                      }}
                    />
                    <Lock
                      size={24}
                      style={{
                        position: 'absolute',
                        color: '#666',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        padding: '4px'
                      }}
                    />
                  </div>
                )}
              </div>
              <span className="badge-name">{badge.name}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
