"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Leaf, Droplets, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CharacterDisplay } from "@/components/character-display"

export default function WelcomePage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#f3fbee' }}>
      {/* Animated background elements - only render on client */}
      {isClient && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${Math.random() * 100}%` }}
              initial={{
                y: -50,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: "100vh",
                rotate: Math.random() * 360 + 360,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              <Leaf className="w-8 h-8" style={{ color: '#3ab308', opacity: 0.2 }} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 max-w-3xl"
        >
          {/* Characters Showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-end justify-center md:gap-16 sm:gap-0"
          >
            {/* Envir */}
            <div className="relative">
              <CharacterDisplay
                character="envir"
                state="normal"
                size="xl"
                animate={false}
                className="w-44 h-44 md:w-64 md:h-64"
              />
            </div>

            {/* Elva */}
            <div className="relative">
              <CharacterDisplay
                character="elva"
                state="normal"
                size="xl"
                animate={false}
                className="w-44 h-44 md:w-64 md:h-64"
              />
            </div>
          </motion.div>

          {/* Logo/Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight">
              <span style={{ color: '#3ab308' }}>Envir</span>
              <span className="text-foreground"> & </span>
              <span style={{ color: '#03aabd' }}>Elva</span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-balance" style={{ color: '#166534' }}>
              Learn to Save Our Planet
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed"
          >
            Join Envir and Elva on an exciting adventure to discover how you can help protect our environment. Play
            games, learn amazing facts, and become an eco-hero!
          </motion.p>

          {/* Start Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => router.push("/select-character")}
              className="text-lg md:text-xl px-10 md:px-14 py-6 md:py-8 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl font-bold"
              style={{ background: '#3ab308', color: 'white', border: 'none' }}
            >
              Start Your Adventure
            </Button>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-6"
          >
            <div className="flex items-center gap-2 text-sm" style={{ color: '#166534' }}>
              <Leaf className="w-4 h-4" style={{ color: '#3ab308' }} />
              <span>Ages 6-12</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#166534' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#a54438' }} />
              <span>Fun & Educational</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#166534' }}>
              <Droplets className="w-4 h-4" style={{ color: '#03aabd' }} />
              <span>Save the Planet</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
