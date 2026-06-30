"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Leaf, Play, Sparkles } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"
import { storyData } from "./story-data"

interface StoryIntroProps {
    character: string
    onStart: () => void
}

export function StoryIntro({ character, onStart }: StoryIntroProps) {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-primary relative overflow-hidden">
            {/* Floating leaves animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: -50,
                            rotate: 0
                        }}
                        animate={{
                            y: "110vh",
                            rotate: 360,
                            x: `${Math.random() * 100}%`
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 8,
                            ease: "linear"
                        }}
                    >
                        🍃
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 safe-area-inset">
                {/* Character */}
                <motion.div
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="mb-4 md:mb-6"
                >
                    <CharacterDisplay
                        character={(character || "envir") as "envir" | "elva"}
                        state="waving"
                        size="lg"
                        animate={true}
                    />
                </motion.div>

                {/* Glowing Leaf Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.4 }}
                    className="mb-6 md:mb-8"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            boxShadow: [
                                "0 0 20px rgba(52, 211, 153, 0.3)",
                                "0 0 60px rgba(52, 211, 153, 0.6)",
                                "0 0 20px rgba(52, 211, 153, 0.3)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green flex items-center justify-center"
                    >
                        <Leaf className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mb-6 px-4"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
                        {storyData.title}
                    </h1>
                    <p className="text-base md:text-lg text-emerald-200/80 max-w-sm mx-auto">
                        {storyData.subtitle}
                    </p>
                </motion.div>

                {/* Story preview */}
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm md:text-base text-white/70 max-w-lg text-center mb-8 leading-relaxed px-6"
                >
                    Enviria was once a green world full of life.
                    But pollution is rising, and only <strong className="text-emerald-300">you</strong> can bring back the balance...
                </motion.p>

                {/* Start button */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Button
                            size="lg"
                            onClick={onStart}
                            className="px-8 py-5 md:px-10 md:py-6 text-lg md:text-xl font-bold rounded-2xl bg-green text-white shadow-2xl hover:shadow-green/40 transition-all gap-2 md:gap-3"
                        >
                            <Play className="w-5 h-5 md:w-6 md:h-6" />
                            Begin Story
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Back to dashboard */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6"
                >
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/dashboard")}
                        className="text-white/60 hover:text-white hover:bg-white/10 gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Dashboard
                    </Button>
                </motion.div>

                {/* Chapter count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="absolute bottom-4 text-white/40 text-xs flex items-center gap-2"
                >
                    <Sparkles className="w-3 h-3" />
                    {storyData.chapters.length} Chapters
                </motion.div>
            </div>
        </div>
    )
}
