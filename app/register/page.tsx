"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CharacterDisplay, getCharacterColor } from "@/components/character-display"

export default function RegisterPage() {
  const router = useRouter()
  const [character, setCharacter] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  })

  const characterKey = (character || "envir") as "envir" | "elva"
  const bubbleBackground = getCharacterColor({ character: characterKey, shade: "light" })
  const bubbleBorder = getCharacterColor({ character: characterKey })
  const bubbleText = getCharacterColor({ character: characterKey, shade: "dark" })

  const passwordValid = formData.password.length >= 8
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0
  const canSubmit =
    formData.name.trim().length > 0 &&
    formData.age.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    passwordValid &&
    passwordsMatch

  useEffect(() => {
    const selectedCharacter = localStorage.getItem("selectedCharacter")
    if (!selectedCharacter) {
      router.push("/select-character")
    } else {
      setCharacter(selectedCharacter)
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      setTouched({ password: true, confirmPassword: true })
      return
    }
    localStorage.setItem("userData", JSON.stringify(formData))
    localStorage.setItem("isRegistered", "true")
    router.push("/dashboard")
  }

  const handleGuest = () => {
    localStorage.setItem("isRegistered", "false")
    router.push("/dashboard")
  }

  return (
    <div className="relative min-h-screen min-h-[100dvh] overflow-hidden" style={{ background: '#f3fbee' }}>
      <div className="relative z-10 flex items-center justify-center min-h-screen min-h-[100dvh] px-4 py-6 lg:py-0">
        <div className="grid w-full max-w-6xl items-center gap-10 lg:gap-14 lg:grid-cols-2">
          {/* Character & message */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center gap-5 lg:gap-7"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 220, damping: 18 }}
              className="relative rounded-2xl px-6 py-4 shadow-2xl border-2 max-w-xs md:max-w-sm"
              style={{ background: bubbleBackground, borderColor: bubbleBorder }}
            >
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: bubbleText }}>
                Welcome, Future Eco-Hero!
              </h1>
              <p className="text-sm text-center" style={{ color: '#64748b' }}>
                Let's get you started on your journey
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mt-3 lg:mt-2"
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

          {/* Registration form */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="bg-white/85 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-6 sm:p-7 lg:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Type your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 text-lg border-2 border-primary/30 bg-white/80 backdrop-blur-sm rounded-2xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all px-4 font-medium"
                />
              </div>

              {/* Age Input */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="How old are you?"
                  min="6"
                  max="12"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  className="h-12 text-lg border-2 border-primary/30 bg-white/80 backdrop-blur-sm rounded-2xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all px-4 font-medium"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Email <span className="text-gray-400 normal-case"></span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 text-lg border-2 border-primary/30 bg-white/80 backdrop-blur-sm rounded-2xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all px-4 font-medium"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  className="h-12 text-lg border-2 border-primary/30 bg-white/80 backdrop-blur-sm rounded-2xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all px-4 font-medium"
                  required
                />
                {touched.password && !passwordValid && (
                  <p className="text-sm text-destructive">
                    Password should be at least 8 characters long.
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-type your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                  className="h-12 text-lg border-2 border-primary/30 bg-white/80 backdrop-blur-sm rounded-2xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all px-4 font-medium"
                  required
                />
                {touched.confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-destructive">Passwords do not match.</p>
                )}
                {formData.confirmPassword.length > 0 && passwordsMatch && (
                  <p className="text-sm text-emerald-600">Perfect! Passwords match.</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-transform"
                  style={{ background: '#3ab308', color: 'white', border: 'none' }}
                  disabled={!canSubmit}
                >
                  START LEARNING
                </Button>
              </motion.div>

              {/* Guest Mode */}
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGuest}
                  className="w-full h-11 text-base font-bold rounded-full hover:scale-105 transition-transform border-2"
                >
                  Continue as Guest
                </Button>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-500 text-center mt-3 px-4">
                💡 Create a profile to save your progress and earn achievements!
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
