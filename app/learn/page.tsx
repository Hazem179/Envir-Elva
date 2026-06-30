"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StoryIntro } from "./components/story-intro"
import { StoryReader } from "./components/story-reader"
import { FeedbackModal } from "@/components/feedback-modal"
import { storyData } from "./components/story-data"

export default function LearnPage() {
  const router = useRouter()
  const [character, setCharacter] = useState<string>("")
  const [storyStarted, setStoryStarted] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    const selectedCharacter = localStorage.getItem("selectedCharacter")
    if (selectedCharacter) {
      setCharacter(selectedCharacter)
    }
  }, [])

  const handleStartStory = () => {
    setStoryStarted(true)
    setCurrentChapter(0)
  }

  const handleChapterChange = (chapter: number) => {
    setCurrentChapter(chapter)
  }

  const handleComplete = () => {
    setShowFeedback(true)
  }

  const handleCloseFeedback = () => {
    setShowFeedback(false)
    router.push("/dashboard")
  }

  const handleExit = () => {
    setStoryStarted(false)
    setCurrentChapter(0)
  }

  // Show intro screen
  if (!storyStarted) {
    return (
      <StoryIntro
        character={character}
        onStart={handleStartStory}
      />
    )
  }

  // Show story reader
  return (
    <>
      <StoryReader
        currentChapter={currentChapter}
        onChapterChange={handleChapterChange}
        onComplete={handleComplete}
        onExit={handleExit}
      />

      <FeedbackModal
        isOpen={showFeedback}
        onClose={handleCloseFeedback}
        lessonTitle={storyData.title}
        character={character}
      />
    </>
  )
}
