"use client"

import { motion } from "framer-motion"
import { Play, Sparkles } from "lucide-react"
import type { AdventureGame } from "./types"

interface AdventureCardsProps {
  games: AdventureGame[]
  onStart: (route: string) => void
}

export function AdventureCards({ games, onStart }: AdventureCardsProps) {
  const getCardColor = (index: number) => {
    const colors = ["#3ab308", "#03aabd", "#a54438"]
    return colors[index % colors.length]
  }

  return (
    <div className="adventures-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles size={36} />
        Choose Your Adventure!
        <Sparkles size={36} />
      </motion.h2>

      <div className="adventures-grid">
        {games.map((game, index) => {
          const IconComponent = game.icon
          const cardColor = getCardColor(index)

          return (
            <motion.div
              key={game.id}
              className="adventure-card"
              style={{ color: cardColor }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="adventure-icon-circle"
                style={game.imageIcon ? {
                  backgroundColor: 'white',
                  padding: 0,
                  overflow: 'hidden'
                } : {}}
              >
                {game.imageIcon ? (
                  <img
                    src={game.imageIcon}
                    alt={game.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <IconComponent className="adventure-icon" />
                )}
              </div>

              {/* Content */}
              <h3 className="adventure-title">{game.title}</h3>
              <p className="adventure-tagline">{game.tagline}</p>
              <p className="adventure-description">{game.description}</p>

              {/* Progress */}
              <div className="adventure-progress">
                <div className="progress-label">
                  <span>{game.progress.label}</span>
                  <span>{game.progress.value}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div
                    className="progress-bar-fill"
                    style={{ backgroundColor: cardColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${game.progress.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                className="adventure-start-btn"
                style={{ backgroundColor: cardColor }}
                onClick={() => onStart(game.route)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} style={{ display: "inline", marginRight: "8px" }} />
                Start Playing!
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
