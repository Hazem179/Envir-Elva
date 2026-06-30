"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Star, Trophy, ArrowRight, Home, X } from "lucide-react"
import { ExitWarningDialog } from "@/components/exit-warning-dialog"
import { CharacterDisplay, getCharacterColor } from "@/components/character-display"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What happens when we recycle plastic bottles?",
    options: [
      "They disappear forever",
      "They get turned into new products",
      "They go to the ocean",
      "They become trash",
    ],
    correctAnswer: 1,
    explanation: "Recycling turns old plastic into new products, saving resources and reducing waste!",
  },
  {
    id: 2,
    question: "Which of these saves the most water?",
    options: [
      "Taking a long bath",
      "Leaving the tap running while brushing teeth",
      "Taking a short shower",
      "Washing the car every day",
    ],
    correctAnswer: 2,
    explanation: "Short showers use much less water than baths and help conserve this precious resource!",
  },
  {
    id: 3,
    question: "What is renewable energy?",
    options: [
      "Energy that runs out quickly",
      "Energy from the sun, wind, or water",
      "Energy from coal and oil",
      "Energy that costs money",
    ],
    correctAnswer: 1,
    explanation: "Renewable energy comes from natural sources like sun, wind, and water that never run out!",
  },
  {
    id: 4,
    question: "Why are trees important for our planet?",
    options: [
      "They look pretty",
      "They give us shade",
      "They clean the air and provide oxygen",
      "They are homes for birds",
    ],
    correctAnswer: 2,
    explanation: "Trees are amazing! They clean the air, give us oxygen, and help fight climate change!",
  },
  {
    id: 5,
    question: "What should you do with food scraps?",
    options: ["Throw them in regular trash", "Compost them", "Leave them outside", "Burn them"],
    correctAnswer: 1,
    explanation: "Composting food scraps creates nutrient-rich soil and reduces waste in landfills!",
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [character, setCharacter] = useState<string>("")
  const characterKey = (character || "envir") as "envir" | "elva"
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [showExitWarning, setShowExitWarning] = useState(false)

  useEffect(() => {
    const selectedCharacter = localStorage.getItem("selectedCharacter")
    if (selectedCharacter) {
      setCharacter(selectedCharacter)
    }
  }, [])

  useEffect(() => {
    if (!quizComplete) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ""
      }

      window.addEventListener("beforeunload", handleBeforeUnload)
      return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [quizComplete])

  const handleExitAttempt = () => {
    if (!quizComplete) {
      setShowExitWarning(true)
    } else {
      router.push("/dashboard")
    }
  }

  const handleConfirmExit = () => {
    router.push("/dashboard")
  }

  const handleAnswerSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = (score / questions.length) * 100
    const xpEarned = score * 50

    return (
      <div className="min-h-screen bg-surface-leaf flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 md:p-12 text-center space-y-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-8xl"
            >
              {percentage >= 80 ? "🏆" : percentage >= 60 ? "⭐" : "🌱"}
            </motion.div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {percentage >= 80 ? "Amazing Work!" : percentage >= 60 ? "Great Job!" : "Keep Learning!"}
              </h1>
              <p className="text-xl text-muted-foreground">
                You scored {score} out of {questions.length}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Card className="p-4 bg-primary/10">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-2xl font-bold text-primary">{percentage.toFixed(0)}%</p>
              </Card>
              <Card className="p-4 bg-accent/10">
                <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">XP Earned</p>
                <p className="text-2xl font-bold text-accent">+{xpEarned}</p>
              </Card>
            </div>

            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-6xl"
            >
              
              <CharacterDisplay
                              character={characterKey}
                              state="waving"
                              size="xl"
                              animate={false}
                              className="w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 mx-auto"
                            />
            </motion.div>

            <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty">
              {percentage >= 80
                ? "You're an eco-champion! Keep up the fantastic work protecting our planet!"
                : percentage >= 60
                  ? "You're doing great! Keep learning and you'll be an eco-expert in no time!"
                  : "Every step counts! Keep practicing and you'll master these concepts soon!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={handleRestart} className="gap-2">
                <Trophy className="w-5 h-5" />
                Try Again
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/dashboard")} className="gap-2">
                <Home className="w-5 h-5" />
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <>
      <ExitWarningDialog
        open={showExitWarning}
        onOpenChange={setShowExitWarning}
        onConfirm={handleConfirmExit}
        score={score}
      />

      <div className="min-h-screen bg-surface-leaf p-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between"
          >
            <Button
              variant="ghost"
              onClick={handleExitAttempt}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <X className="w-5 h-5" />
              Exit Quiz
            </Button>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-accent" />
              <span className="font-bold text-lg">Score: {score}</span>
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">{progress.toFixed(0)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </Card>
          </motion.div>

          {/* Character */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: showResult ? (isCorrect ? [0, 10, -10, 0] : [0, -5, 5, 0]) : 0,
              }}
              transition={{ duration: 1, repeat: showResult ? 2 : 0 }}
              className="text-7xl"
            >
              <CharacterDisplay
                              character={characterKey}
                              state="waving"
                              size="xl"
                              animate={false}
                              className="w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 mx-auto"
                            />
            </motion.div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-balance">{question.question}</h2>

                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrectAnswer = index === question.correctAnswer
                    const showCorrect = showResult && isCorrectAnswer
                    const showIncorrect = showResult && isSelected && !isCorrectAnswer

                    return (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: showResult ? 1 : 1.02 }}
                        whileTap={{ scale: showResult ? 1 : 0.98 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showResult}
                          className={`w-full h-auto p-4 text-left justify-start text-base md:text-lg transition-all ${
                            isSelected && !showResult
                              ? "bg-primary/10 border-primary ring-2 ring-primary"
                              : showCorrect
                                ? "bg-primary/20 border-primary text-primary"
                                : showIncorrect
                                  ? "bg-destructive/20 border-destructive text-destructive"
                                  : ""
                          }`}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 flex-shrink-0 ${
                                isSelected && !showResult
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : showCorrect
                                    ? "border-primary bg-primary"
                                    : showIncorrect
                                      ? "border-destructive bg-destructive"
                                      : "border-muted-foreground/30"
                              }`}
                            >
                              {showCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                              ) : showIncorrect ? (
                                <XCircle className="w-5 h-5 text-destructive-foreground" />
                              ) : (
                                <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                              )}
                            </div>
                            <span className="flex-1 text-pretty">{option}</span>
                          </div>
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <Card
                        className={`mt-6 p-4 ${isCorrect ? "bg-primary/10 border-primary" : "bg-secondary/10 border-secondary"}`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-semibold mb-1">{isCorrect ? "Correct!" : "Not quite!"}</p>
                            <p className="text-sm text-muted-foreground text-pretty">{question.explanation}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Button */}
                <div className="mt-8">
                  {!showResult ? (
                    <Button
                      size="lg"
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                      className="w-full text-lg py-6"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button size="lg" onClick={handleNext} className="w-full text-lg py-6 gap-2">
                      {currentQuestion < questions.length - 1 ? (
                        <>
                          Next Question
                          <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          See Results
                          <Trophy className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
