"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Star, Smile, Meh, Frown, Send, Sparkles } from "lucide-react"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  lessonTitle: string
  character: string
}

export function FeedbackModal({ isOpen, onClose, lessonTitle, character }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0)
  const [mood, setMood] = useState<string>("")
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRating(0)
      setMood("")
      setComment("")
      onClose()
    }, 2000)
  }

  const moods = [
    { id: "happy", icon: Smile, label: "Loved it!", color: "text-primary" },
    { id: "neutral", icon: Meh, label: "It was okay", color: "text-accent" },
    { id: "sad", icon: Frown, label: "Didn't like it", color: "text-destructive" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-card rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!submitted ? (
              <>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose} type="button">
                  <X className="w-5 h-5" />
                </Button>

                <div className="text-center space-y-6">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-7xl"
                  >
                    {character === "envir" ? "🌱" : "🌸"}
                  </motion.div>

                  <div>
                    <h2 className="text-3xl font-bold mb-2">Great Job!</h2>
                    <p className="text-lg text-muted-foreground">You completed: {lessonTitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    {/* Star Rating */}
                    <div className="space-y-3">
                      <label className="font-semibold text-lg block">How would you rate this lesson?</label>
                      <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-10 h-10 transition-colors ${
                                star <= rating ? "text-accent fill-accent" : "text-muted-foreground"
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Mood Selector */}
                    <div className="space-y-3">
                      <label className="font-semibold text-lg block">How did you feel?</label>
                      <div className="grid grid-cols-3 gap-3">
                        {moods.map((moodOption) => (
                          <motion.button
                            key={moodOption.id}
                            type="button"
                            onClick={() => setMood(moodOption.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              mood === moodOption.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <moodOption.icon className={`w-8 h-8 mx-auto mb-2 ${moodOption.color}`} />
                            <p className="text-sm font-medium">{moodOption.label}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-3">
                      <label htmlFor="comment" className="font-semibold text-lg block">
                        Any thoughts? (Optional)
                      </label>
                      <Textarea
                        id="comment"
                        placeholder="Tell us what you learned or what you'd like to see more of..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg py-6 gap-2">
                      <Send className="w-5 h-5" />
                      Submit Feedback
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1 }}
                  className="text-8xl"
                >
                  <Sparkles className="w-20 h-20 text-accent mx-auto" />
                </motion.div>

                <div>
                  <h2 className="text-4xl font-bold mb-3">Thank You!</h2>
                  <p className="text-xl text-muted-foreground">Your feedback helps us improve!</p>
                </div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl"
                >
                  {character === "envir" ? "🌱" : "🌸"}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
