"use client"

import { useState, useEffect } from "react"
import { GameIntro } from "./components/game-intro"
import { GameBoard } from "./components/game-board"
import { GameOver } from "./components/game-over"
import { useDocumentTitle } from "@/hooks/use-document-title"

export default function DragDropPage() {
  const [character, setCharacter] = useState<string>("")
  const [gameState, setGameState] = useState<"intro" | "playing" | "over">("intro")
  const [finalScore, setFinalScore] = useState(0)
  const [finalItems, setFinalItems] = useState(0)

  useDocumentTitle("Health Game")

  useEffect(() => {
    const selectedCharacter = localStorage.getItem("selectedCharacter")
    if (selectedCharacter) {
      setCharacter(selectedCharacter)
    }
  }, [])

  const handleStart = () => {
    setGameState("playing")
    setFinalScore(0)
    setFinalItems(0)
  }

  const handleGameOver = (score: number, itemsCollected: number) => {
    setFinalScore(score)
    setFinalItems(itemsCollected)
    setGameState("over")
  }

  const handleRestart = () => {
    setGameState("playing")
    setFinalScore(0)
    setFinalItems(0)
  }

  if (gameState === "intro") {
    return <GameIntro character={character} onStart={handleStart} />
  }

  if (gameState === "over") {
    return (
      <GameOver
        character={character}
        score={finalScore}
        itemsCollected={finalItems}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <GameBoard
      character={character}
      onGameOver={handleGameOver}
    />
  )
}
