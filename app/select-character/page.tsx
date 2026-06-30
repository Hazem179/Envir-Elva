"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sparkles, Heart, Zap, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CharacterDisplay, getCharacterColor } from "@/components/character-display"
import Head from "next/head"

type Character = "envir" | "elva" | null

export default function SelectCharacterPage() {

  const router = useRouter()
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(null)
  const [showWelcome, setShowWelcome] = useState(false)

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character)
    setShowWelcome(true)
  }

  const handleContinue = () => {
    if (selectedCharacter) {
      localStorage.setItem("selectedCharacter", selectedCharacter)
      router.push("/register")
    }
  }

  return (
    <>
    <Head>
      <title>Select Your Guide</title>
    </Head>
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#f3fbee' }}>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance" style={{ color: '#166534' }}>Choose Your Guide</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Who will join you on your eco-adventure?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
          {/* Envir Card */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`relative overflow-hidden cursor-pointer transition-all duration-300`}
              style={{
                border: selectedCharacter === "envir" ? '4px solid #3ab308' : '4px solid transparent',
                boxShadow: selectedCharacter === "envir" ? '0 20px 50px rgba(58, 179, 8, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              onClick={() => handleCharacterSelect("envir")}
            >
              <div className="p-8 space-y-6">
                {/* Character Avatar */}
                <motion.div
                  className="relative w-48 h-48 mx-auto flex items-center justify-center"
                  animate={{
                    scale: selectedCharacter === "envir" ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: selectedCharacter === "envir" ? Number.POSITIVE_INFINITY : 0 }}
                >
                  <CharacterDisplay
                    character="envir"
                    state={selectedCharacter === "envir" ? "waving" : "normal"}
                    size="lg"
                    animate={selectedCharacter === "envir"}
                  />
                  {selectedCharacter === "envir" && (
                    <motion.div
                      className="absolute -top-2 -right-2 rounded-full p-2"
                      style={{ background: getCharacterColor({ character: "envir" }), color: 'white' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Character Info */}
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold" style={{ color: '#3ab308' }}>Envir</h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(58, 179, 8, 0.1)' }}>
                    <Zap className="w-4 h-4" style={{ color: '#3ab308' }} />
                    <span className="text-sm font-medium" style={{ color: '#3ab308' }}>Male Guide</span>
                  </div>
                  <p className="text-foreground/80 text-pretty leading-relaxed">
                    Adventurous and curious, Envir loves exploring nature and discovering eco-smart solutions. He'll
                    teach you exciting ways to protect our planet!
                  </p>
                </div>

                {/* Traits */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Adventurous", "Curious", "Eco-Smart"].map((trait) => (
                    <span key={trait} className="px-3 py-1 text-sm rounded-full" style={{ background: 'rgba(58, 179, 8, 0.2)', color: '#3ab308' }}>
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Elva Card */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`relative overflow-hidden cursor-pointer transition-all duration-300`}
              style={{
                border: selectedCharacter === "elva" ? '4px solid #03aabd' : '4px solid transparent',
                boxShadow: selectedCharacter === "elva" ? '0 20px 50px rgba(3, 170, 189, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              onClick={() => handleCharacterSelect("elva")}
            >
              <div className="p-8 space-y-6">
                {/* Character Avatar */}
                <motion.div
                  className="relative w-48 h-48 mx-auto flex items-center justify-center"
                  animate={{
                    scale: selectedCharacter === "elva" ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: selectedCharacter === "elva" ? Number.POSITIVE_INFINITY : 0 }}
                >
                  <CharacterDisplay
                    character="elva"
                    state={selectedCharacter === "elva" ? "waving" : "normal"}
                    size="lg"
                    animate={selectedCharacter === "elva"}
                  />
                  {selectedCharacter === "elva" && (
                    <motion.div
                      className="absolute -top-2 -right-2 rounded-full p-2"
                      style={{ background: getCharacterColor({ character: "elva" }), color: 'white' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Character Info */}
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold" style={{ color: '#03aabd' }}>Elva</h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(3, 170, 189, 0.1)' }}>
                    <Heart className="w-4 h-4" style={{ color: '#03aabd' }} />
                    <span className="text-sm font-medium" style={{ color: '#03aabd' }}>Female Guide</span>
                  </div>
                  <p className="text-foreground/80 text-pretty leading-relaxed">
                    Creative and caring, Elva is passionate about eco-friendly living and helping others. She'll inspire
                    you to make a difference every day!
                  </p>
                </div>

                {/* Traits */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Creative", "Caring", "Eco-Friendly"].map((trait) => (
                    <span key={trait} className="px-3 py-1 text-sm rounded-full" style={{ background: 'rgba(3, 170, 189, 0.2)', color: '#03aabd' }}>
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

      </div>


<AnimatePresence>
  {showWelcome && selectedCharacter && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowWelcome(false)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-card rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative" // ✅ The "relative" class is key
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => setShowWelcome(false)}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Waving Character Above Dialog */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2"
          initial={{ y: -50, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 150
          }}
        >
          <CharacterDisplay
            character={selectedCharacter as "envir" | "elva"}
            state="waving"
            size="md"
            animate={true}
          />
        </motion.div>

        {/* --- ADDED PADDING TO THE CONTENT DIV --- */}
        <div className="text-center space-y-6 pt-12"> {/* ✅ Added pt-12 for space */}
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Hi! I'm {selectedCharacter === "envir" ? "Envir" : "Elva"}!</h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              {selectedCharacter === "envir"
                ? "I'm so excited to explore the world of sustainability with you! Together, we'll discover amazing ways to protect our planet and have fun while doing it. Ready to become an eco-hero?"
                : "I'm thrilled to be your guide on this eco-adventure! We'll learn creative ways to care for our Earth and make every day count. Let's make a difference together!"}
            </p>
          </div>

          <Button 
            size="lg" 
            onClick={handleContinue} 
            className="text-lg px-10 py-6 rounded-full"
            style={{ background: '#3ab308', color: 'white', border: 'none' }}
          >
            Let's Get Started!
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
    </>
  )
}
