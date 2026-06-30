"use client"

import { motion } from "framer-motion"
import { Star, Flame, Trophy, Heart, Zap, Award } from "lucide-react"
import type { UserStats } from "./types"
import { CharacterDisplay, getCharacterColor } from "@/components/character-display"

interface CharacterHeroProps {
  character: string
  stats: UserStats
}

export function CharacterHero({ character, stats }: CharacterHeroProps) {
  const characterMessages = {
    envir: [
      "Ready to save the planet today?",
      "You're doing amazing! Keep going!",
      "Every small action makes a BIG difference!",
      "Let's learn something new today!"
    ],
    elva: [
      "Let's make the Earth smile today!",
      "You're such a wonderful eco-hero!",
      "Together we can change the world!",
      "Time for another adventure!"
    ]
  }

  const message = characterMessages[character as keyof typeof characterMessages]?.[
    Math.floor(Math.random() * 4)
  ] || "Let's save the planet together!"
  
  const primaryColor = getCharacterColor({ character: character as "envir" | "elva" })
  const lightColor = getCharacterColor({ character: character as "envir" | "elva", shade: "light" })
  const darkColor = getCharacterColor({ character: character as "envir" | "elva", shade: "dark" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
      style={{ margin: "24px 0" }}
    >
      {/* Main Hero Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 md:p-8"
        style={{
          background: "white",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Gradient Border Top */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ background: primaryColor }}
        />

        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
          {/* Character Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative"
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: lightColor,
                  padding: "12px",
                  boxShadow: `0 8px 32px ${lightColor}`
                }}
              >
                <CharacterDisplay
                  character={(character || "envir") as "envir" | "elva"}
                  state="waving"
                  size="xl"
                  animate={true}
                  className="w-full h-full"
                />
              </motion.div>
              
              {/* Level Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -bottom-2 -right-2 rounded-full px-4 py-2 font-bold text-white shadow-lg"
                style={{ background: primaryColor }}
              >
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" fill="white" />
                  <span className="text-lg">{stats.level}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="flex-1 space-y-6">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: darkColor }}>
                Hey, {stats.name}! 👋
              </h2>
              <p className="text-lg text-gray-600">
                {message}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {/* Streak */}
              <StatCard
                icon={<Flame className="w-5 h-5" />}
                label="Streak"
                value={`${stats.streak}`}
                color="#f97316"
                delay={0.5}
              />

              {/* XP */}
              <StatCard
                icon={<Zap className="w-5 h-5" />}
                label="XP"
                value={stats.xp}
                color="#8b5cf6"
                delay={0.6}
              />

              {/* Badges */}
              <StatCard
                icon={<Award className="w-5 h-5" />}
                label="Badges"
                value={stats.totalBadges}
                color={primaryColor}
                delay={0.7}
              />

              {/* Rank */}
              <StatCard
                icon={<Trophy className="w-5 h-5" />}
                label="Rank"
                value={`#${stats.rank}`}
                color="#10b981"
                delay={0.8}
              />
            </motion.div>

            {/* XP Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center justify-between text-sm font-semibold mb-2">
                <span style={{ color: darkColor }}>Level {stats.level}</span>
                <span className="text-gray-500">{stats.xp} / {stats.xpToNextLevel} XP</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.xp / stats.xpToNextLevel) * 100}%` }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: primaryColor }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  color,
  delay
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative rounded-2xl p-4 cursor-pointer"
      style={{
        background: `${color}15`,
        border: `2px solid ${color}30`
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="rounded-lg p-1.5"
          style={{ background: color, color: "white" }}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </div>
    </motion.div>
  )
}
