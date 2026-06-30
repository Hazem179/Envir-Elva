"use client"

import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    ChevronRight,
    ChevronLeft,
    Home,
    RotateCcw,
    CheckCircle,
    Sparkles,
    Leaf
} from "lucide-react"
import { storyData } from "./story-data"

interface StoryReaderProps {
    currentChapter: number
    onChapterChange: (chapter: number) => void
    onComplete: () => void
    onExit: () => void
}

export function StoryReader({
    currentChapter,
    onChapterChange,
    onComplete,
    onExit
}: StoryReaderProps) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showText, setShowText] = useState(true)

    const chapter = storyData.chapters[currentChapter]
    const isLastChapter = currentChapter === storyData.chapters.length - 1
    const isFirstChapter = currentChapter === 0
    const progress = ((currentChapter + 1) / storyData.chapters.length) * 100

    const handleNext = () => {
        if (isLastChapter) {
            onComplete()
        } else {
            setImageLoaded(false)
            onChapterChange(currentChapter + 1)
        }
    }

    const handlePrevious = () => {
        if (!isFirstChapter) {
            setImageLoaded(false)
            onChapterChange(currentChapter - 1)
        }
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50
        if (info.offset.x > threshold && !isFirstChapter) {
            handlePrevious()
        } else if (info.offset.x < -threshold) {
            handleNext()
        }
    }

    const goToChapter = (index: number) => {
        setImageLoaded(false)
        onChapterChange(index)
    }

    return (
        <div className="fixed inset-0 bg-black">
            {/* Full-screen image container */}
            <motion.div
                className="absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentChapter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        {/* Image fills entire screen */}
                        <img
                            src={chapter.image}
                            alt={chapter.title}
                            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            onLoad={() => setImageLoaded(true)}
                        />

                        {/* Loading state */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-primary flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Leaf className="w-12 h-12 text-emerald-400/50" />
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Tap zones for mobile navigation */}
                <div className="absolute inset-0 flex">
                    <button
                        className="w-1/3 h-full focus:outline-none"
                        onClick={handlePrevious}
                        disabled={isFirstChapter}
                    />
                    <button
                        className="w-1/3 h-full focus:outline-none"
                        onClick={() => setShowText(!showText)}
                    />
                    <button
                        className="w-1/3 h-full focus:outline-none"
                        onClick={handleNext}
                    />
                </div>
            </motion.div>

            {/* Gradient for text readability */}
            <div
                className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none transition-opacity duration-300 ${showText ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Top bar - floating */}
            <div className="absolute top-0 left-0 right-0 z-30 p-2 flex items-center justify-between safe-area-inset-top">
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                    <span className="text-base">🍃</span>
                    <span className="text-xs text-white/80 font-medium">
                        {currentChapter + 1}/{storyData.chapters.length}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="flex-1 mx-3 max-w-[120px] md:max-w-[200px]">
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-emerald-400 rounded-full"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70"
                        onClick={() => goToChapter(0)}
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70"
                        onClick={onExit}
                    >
                        <Home className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Bottom content - floating overlay */}
            <div
                className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${showText ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
                    }`}
            >
                {/* Story content */}
                <div className="px-4 pb-2 md:px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentChapter}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Chapter badge */}
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/30 backdrop-blur-sm mb-2">
                                <Sparkles className="w-3 h-3 text-emerald-300" />
                                <span className="text-emerald-200 text-[10px] font-semibold uppercase tracking-wider">
                                    Chapter {currentChapter + 1}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-xl md:text-3xl font-bold text-white drop-shadow-lg mb-1.5">
                                {chapter.title}
                            </h2>

                            {/* Content - compact on mobile */}
                            <p className="text-xs md:text-sm text-white/85 leading-relaxed max-w-xl line-clamp-3 md:line-clamp-none">
                                {chapter.content}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation bar */}
                <div className="px-3 py-2 md:py-3 bg-black/60 backdrop-blur-md safe-area-inset-bottom">
                    <div className="flex items-center justify-between gap-2 max-w-xl mx-auto">
                        {/* Previous */}
                        <button
                            onClick={handlePrevious}
                            disabled={isFirstChapter}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white/70 disabled:opacity-30 active:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="text-xs font-medium hidden sm:inline">Prev</span>
                        </button>

                        {/* Chapter dots */}
                        <div className="flex items-center gap-1">
                            {storyData.chapters.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToChapter(index)}
                                    className={`transition-all rounded-full ${index === currentChapter
                                        ? "w-4 h-1.5 bg-emerald-400"
                                        : index < currentChapter
                                            ? "w-1.5 h-1.5 bg-emerald-400/50"
                                            : "w-1.5 h-1.5 bg-white/30"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Next/Complete */}
                        {isLastChapter ? (
                            <button
                                onClick={onComplete}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-semibold active:bg-emerald-600 transition-colors"
                            >
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs">Done</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-semibold active:bg-emerald-600 transition-colors"
                            >
                                <span className="text-xs">Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tap hint - shows briefly */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
                <div className="flex items-center gap-8 text-white/50 text-xs">
                    <div className="flex flex-col items-center gap-1">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Prev</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-5 h-5 border-2 border-white/50 rounded" />
                        <span>Hide text</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <ChevronRight className="w-5 h-5" />
                        <span>Next</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
