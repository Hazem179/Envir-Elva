"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export type CharacterType = "envir" | "elva"
export type CharacterState = "normal" | "waving" | "pointing" | "sad"

interface CharacterDisplayProps {
  character: CharacterType
  state?: CharacterState
  className?: string
  animate?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "h-20 w-auto",
  md: "h-32 w-auto",
  lg: "h-48 w-auto",
  xl: "h-64 w-auto",
}

// Scale factor to normalize character sizes (Elva's images are naturally smaller)
const characterScale = {
  envir: "",
  elva: "scale-125",
}

export function CharacterDisplay({
  character,
  state = "normal",
  className = "",
  animate = true,
  size = "md",
}: CharacterDisplayProps) {
  const getImagePath = () => {
    const characterName = character === "envir" ? "Envir" : "Elva"

    switch (state) {
      case "waving":
        return `/${characterName}_waving.png`
      case "pointing":
        return `/${characterName}_pointing.png`
      case "sad":
        return `/${characterName}_sad.png`
      default:
        return `/${characterName}.png`
    }
  }

  const baseAnimation = animate
    ? {
      y: [0, -12, 0],
      rotate: [0, 2, -2, 0],
    }
    : {}

  const transition = animate
    ? {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    }
    : undefined

  return (
    <motion.div
      animate={baseAnimation}
      transition={transition}
      className={`relative ${sizeClasses[size]} ${characterScale[character]} ${className}`}
    >
      <img
        src={getImagePath()}
        alt={`${character} - ${state}`}
        className="w-full h-full object-contain"
      />
    </motion.div>
  )
}

interface CharacterColorProps {
  character: CharacterType
  shade?: "primary" | "light" | "dark"
}

export function getCharacterColor({ character, shade = "primary" }: CharacterColorProps): string {
  const colors = {
    envir: {
      primary: "#3ab308",
      light: "rgba(58, 179, 8, 0.1)",
      dark: "#166534",
    },
    elva: {
      primary: "#03aabd",
      light: "rgba(3, 170, 189, 0.1)",
      dark: "#0e7490",
    },
  }

  return colors[character][shade]
}
