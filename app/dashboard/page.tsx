"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CharacterHero } from "./components/CharacterHero"
import { AdventureCards } from "./components/AdventureCards"
import { EcoBoxBanner } from "./components/EcoBoxBanner"
import { DailyQuests } from "./components/DailyQuests"
import { BadgesSection } from "./components/BadgesSection"
import { TopNav } from "./components/TopNav"
import { adventureGames, badgeShelf, dailyQuests } from "./data"
import type { UserStats } from "./components/types"
import "@/styles/dashboard.css"
import { useDocumentTitle } from "@/hooks/use-document-title"

const defaultStats: UserStats = {
  name: "Eco-Hero",
  level: 5,
  xp: 350,
  xpToNextLevel: 500,
  streak: 7,
  totalBadges: 12,
  rank: 42,
}

export default function DashboardPage() {
  const router = useRouter()
  const [character, setCharacter] = useState<string>("envir")
  const [stats, setStats] = useState<UserStats>(defaultStats)
  useDocumentTitle(DashboardPage.name)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const selectedCharacter = localStorage.getItem("selectedCharacter")
    const userData = localStorage.getItem("userData")

    if (!selectedCharacter) {
      router.push("/select-character")
      return
    }

    setCharacter(selectedCharacter)

    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setStats((prev) => ({
          ...prev,
          name: parsed.name || prev.name,
          level: parsed.level || prev.level,
          xp: parsed.xp || prev.xp,
          xpToNextLevel: parsed.xpToNextLevel || prev.xpToNextLevel,
          streak: parsed.streak || prev.streak,
          totalBadges: parsed.totalBadges || prev.totalBadges,
          rank: parsed.rank || prev.rank,
        }))
      } catch (error) {
        console.error("Failed to parse userData", error)
      }
    }
  }, [router])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  const handleStartAdventure = (route: string) => {
    router.push(route)
  }

  return (
    <div className="dashboard-container">
      <TopNav character={character} onNavigate={handleNavigate} />

      <div className="dashboard-content">
        <CharacterHero character={character} stats={stats} />

        <AdventureCards games={adventureGames} onStart={handleStartAdventure} />

        <EcoBoxBanner />

        <DailyQuests quests={dailyQuests} />

        <BadgesSection badges={badgeShelf} />
      </div>
    </div>
  )
}
