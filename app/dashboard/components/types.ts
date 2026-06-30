import type { LucideIcon } from "lucide-react"

export interface UserStats {
  name: string
  level: number
  xp: number
  xpToNextLevel: number
  streak: number
  totalBadges: number
  rank: number
}

export interface AdventureHighlight {
  label: string
  icon: LucideIcon
}

export interface AdventureBuddy {
  name: string
  emoji: string
  mood: string
  energy: number
}

export interface AdventureGame {
  id: string
  title: string
  tagline: string
  description: string
  icon: LucideIcon
  imageIcon?: string
  route: string
  gradient: [string, string]
  accent: string
  highlights: AdventureHighlight[]
  missionSteps: string[]
  progress: {
    label: string
    value: number
  }
  buddies: AdventureBuddy[]
}

export interface DailyQuest {
  id: number
  title: string
  description: string
  imageIcon: string
  progress: number
  total: number
  reward?: string
}

export interface BadgeData {
  id: number
  name: string
  imageIcon: string
  color: string
  unlocked: boolean
  description?: string
}

export interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  avatar: string
  isUser?: boolean
}
