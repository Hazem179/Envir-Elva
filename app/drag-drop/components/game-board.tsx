"use client"

import { motion, AnimatePresence, useAnimationControls } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Heart, Sparkles, Trophy, X, Hand, Flame } from "lucide-react"
import { CharacterDisplay } from "@/components/character-display"
import { ExitWarningDialog } from "@/components/exit-warning-dialog"
import { GameItem, gameItems } from "./game-data"
import { DraggableItem } from "./draggable-item"

interface GameBoardProps {
    character: string
    onGameOver: (score: number, itemsCollected: number) => void
}

type Popup = { id: number; text: string; isGood: boolean }
type Particle = { id: number; dx: number; dy: number; emoji: string }

const GOOD_PARTICLES = ["✨", "🍃", "💚", "⭐"]

export function GameBoard({ character, onGameOver }: GameBoardProps) {
    const [health, setHealth] = useState(100)
    const [score, setScore] = useState(0)
    const [combo, setCombo] = useState(0)
    const [currentItems, setCurrentItems] = useState<(GameItem & { uid: number })[]>([])
    const [itemsCollected, setItemsCollected] = useState(0)
    const [showFeedback, setShowFeedback] = useState<{ message: string; isGood: boolean } | null>(null)
    const [showExitWarning, setShowExitWarning] = useState(false)
    const [characterState, setCharacterState] = useState<"normal" | "sad" | "waving">("waving")
    const [ringFlash, setRingFlash] = useState<"good" | "bad" | null>(null)
    const [popups, setPopups] = useState<Popup[]>([])
    const [particles, setParticles] = useState<Particle[]>([])
    const [isMobile, setIsMobile] = useState(false)

    const dropZoneRef = useRef<HTMLDivElement>(null)
    const happyAudioRef = useRef<HTMLAudioElement | null>(null)
    const sadAudioRef = useRef<HTMLAudioElement | null>(null)
    const idRef = useRef(0)
    const shake = useAnimationControls()

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        happyAudioRef.current = new Audio("/happy.mp3")
        sadAudioRef.current = new Audio("/sad.mp3")
        const t = setTimeout(() => setCharacterState("normal"), 2000)
        return () => clearTimeout(t)
    }, [])

    // Spawn items
    useEffect(() => {
        const maxItems = isMobile ? 4 : 6
        const interval = setInterval(() => {
            setCurrentItems((prev) => {
                if (prev.length >= maxItems) return prev
                const randomItem = gameItems[Math.floor(Math.random() * gameItems.length)]
                return [...prev, { ...randomItem, uid: Date.now() + Math.random() }]
            })
        }, 1900)
        return () => clearInterval(interval)
    }, [isMobile])

    useEffect(() => {
        if (health <= 0) onGameOver(score, itemsCollected)
    }, [health, score, itemsCollected, onGameOver])

    useEffect(() => {
        if (health <= 30) setCharacterState("sad")
        else if (characterState === "sad" && health > 30) setCharacterState("normal")
    }, [health, characterState])

    const spawnParticles = () => {
        const burst: Particle[] = Array.from({ length: 7 }).map(() => {
            const a = Math.random() * Math.PI * 2
            const d = 60 + Math.random() * 70
            return {
                id: idRef.current++,
                dx: Math.cos(a) * d,
                dy: Math.sin(a) * d,
                emoji: GOOD_PARTICLES[Math.floor(Math.random() * GOOD_PARTICLES.length)],
            }
        })
        setParticles((p) => [...p, ...burst])
        const ids = burst.map((b) => b.id)
        setTimeout(() => setParticles((p) => p.filter((x) => !ids.includes(x.id))), 900)
    }

    const addPopup = (text: string, isGood: boolean) => {
        const id = idRef.current++
        setPopups((p) => [...p, { id, text, isGood }])
        setTimeout(() => setPopups((p) => p.filter((x) => x.id !== id)), 1000)
    }

    const handleItemDrop = (item: GameItem & { uid: number }) => {
        setCurrentItems((prev) => prev.filter((i) => i.uid !== item.uid))
        setItemsCollected((prev) => prev + 1)

        if (item.isGood) {
            const newCombo = combo + 1
            const points = 10 * Math.min(newCombo, 5)
            setCombo(newCombo)
            setHealth((h) => Math.min(100, h + 10))
            setScore((s) => s + points)
            setShowFeedback({ message: item.description, isGood: true })
            setRingFlash("good")
            addPopup(`+${points}`, true)
            spawnParticles()
            happyAudioRef.current?.play().catch(() => { })
        } else {
            setCombo(0)
            setHealth((h) => Math.max(0, h - 15))
            setScore((s) => Math.max(0, s - 5))
            setShowFeedback({ message: item.description, isGood: false })
            setRingFlash("bad")
            addPopup("-15", false)
            shake.start({ x: [0, -10, 10, -7, 7, 0], transition: { duration: 0.4 } })
            sadAudioRef.current?.play().catch(() => { })
        }

        setTimeout(() => setShowFeedback(null), 1800)
        setTimeout(() => setRingFlash(null), 500)
    }

    const characterEmotionalState = health <= 30 ? "sad" : characterState

    // health bar visuals
    const healthGradient =
        health > 60
            ? "#3ab308"
            : health > 30
                ? "#d97706"
                : "#c1473b"

    const ringColor =
        ringFlash === "good"
            ? "border-green shadow-[0_0_40px_rgba(58,179,8,0.55)]"
            : ringFlash === "bad"
                ? "border-red-accent shadow-[0_0_40px_rgba(193,71,59,0.5)]"
                : "border-cyan/40"

    return (
        <>
            <ExitWarningDialog
                open={showExitWarning}
                onOpenChange={setShowExitWarning}
                onConfirm={() => (window.location.href = "/dashboard")}
                score={score}
            />

            <div className="relative min-h-[100svh] overflow-hidden bg-surface-leaf p-3 md:p-5">
                {/* ambient background */}
                <div className="hero-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-green/15 blur-3xl" aria-hidden="true" />

                <div className="relative mx-auto max-w-4xl space-y-3 md:space-y-4">
                    {/* HUD */}
                    <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/60 bg-white/80 px-3 py-2.5 shadow-[0_12px_30px_rgba(11,16,20,0.08)] backdrop-blur-md md:px-4">
                        <button
                            onClick={() => setShowExitWarning(true)}
                            className="flex items-center gap-1.5 rounded-pill px-3 py-2 font-display text-sm font-semibold text-red-accent transition-colors hover:bg-red-accent/10"
                        >
                            <X className="h-4 w-4" />
                            <span className="hidden sm:inline">Exit</span>
                        </button>

                        <div className="flex items-center gap-2 md:gap-3">
                            <Stat icon={<Trophy className="h-4 w-4" />} value={score} tint="bg-gold/15 text-[#9a6f04]" />
                            <Stat icon={<Sparkles className="h-4 w-4" />} value={itemsCollected} tint="bg-cyan/15 text-cyan-dark" />
                            <AnimatePresence>
                                {combo >= 2 && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        key={combo}
                                        className="flex items-center gap-1.5 rounded-pill bg-orange/15 px-3 py-1.5 font-display text-sm font-bold text-orange"
                                    >
                                        <Flame className="h-4 w-4" />
                                        x{combo}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Health bar */}
                    <div className="rounded-3xl border border-white/60 bg-white/80 p-3 shadow-[0_12px_30px_rgba(11,16,20,0.06)] backdrop-blur-md md:p-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={health > 30 ? { scale: [1, 1.18, 1] } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Heart
                                    className="h-6 w-6"
                                    style={{ color: health > 60 ? "#3ab308" : health > 30 ? "#d97706" : "#c1473b" }}
                                    fill="currentColor"
                                />
                            </motion.div>
                            <div className="flex-1">
                                <div className="mb-1 flex items-center justify-between font-display text-sm font-semibold text-primary-deep">
                                    <span>Health</span>
                                    <span>{health}%</span>
                                </div>
                                <div className="h-3.5 w-full overflow-hidden rounded-pill bg-surface-2">
                                    <motion.div
                                        className="h-full rounded-pill"
                                        style={{ background: healthGradient }}
                                        animate={{ width: `${health}%` }}
                                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Game arena */}
                    <motion.div
                        animate={shake}
                        className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_24px_60px_rgba(11,16,20,0.12)]"
                        style={{ height: isMobile ? "62vh" : "520px" }}
                    >
                        {/* drop zone / character */}
                        <div ref={dropZoneRef} className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                                animate={{ scale: health > 60 ? [1, 1.03, 1] : health > 30 ? [0.97, 1, 0.97] : [0.9, 0.93, 0.9] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="relative"
                            >
                                {/* soft aura */}
                                <div
                                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/20 blur-2xl md:h-60 md:w-60"
                                    aria-hidden="true"
                                />
                                <CharacterDisplay
                                    character={(character || "envir") as "envir" | "elva"}
                                    state={characterEmotionalState}
                                    size={isMobile ? "md" : "lg"}
                                    animate={health > 30}
                                />

                                {/* drop ring */}
                                <motion.div
                                    animate={{ scale: ringFlash ? [1, 1.12, 1] : [1, 1.08, 1], opacity: ringFlash ? 0.9 : [0.3, 0.5, 0.3] }}
                                    transition={{ duration: ringFlash ? 0.4 : 2.2, repeat: ringFlash ? 0 : Infinity }}
                                    className={`pointer-events-none absolute inset-0 -m-7 rounded-full border-[3px] border-dashed transition-colors md:-m-9 ${ringColor}`}
                                />

                                {/* score popups */}
                                <AnimatePresence>
                                    {popups.map((p) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ y: -8, opacity: 0, scale: 0.6 }}
                                            animate={{ y: -70, opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.9, ease: "easeOut" }}
                                            className="absolute left-1/2 top-0 -translate-x-1/2 font-display text-2xl font-extrabold drop-shadow"
                                            style={{ color: p.isGood ? "#2f9406" : "#c1473b" }}
                                        >
                                            {p.text}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* particle burst */}
                                <AnimatePresence>
                                    {particles.map((pt) => (
                                        <motion.span
                                            key={pt.id}
                                            initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                                            animate={{ x: pt.dx, y: pt.dy, opacity: 0, scale: 1.2 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.85, ease: "easeOut" }}
                                            className="pointer-events-none absolute left-1/2 top-1/2 text-xl"
                                        >
                                            {pt.emoji}
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* floating items */}
                        <AnimatePresence>
                            {currentItems.map((item, index) => (
                                <DraggableItem
                                    key={item.uid}
                                    item={item}
                                    index={index}
                                    totalItems={currentItems.length}
                                    dropZoneRef={dropZoneRef}
                                    onDrop={() => handleItemDrop(item)}
                                    isMobile={isMobile}
                                />
                            ))}
                        </AnimatePresence>

                        {/* feedback toast */}
                        <AnimatePresence>
                            {showFeedback && (
                                <motion.div
                                    initial={{ scale: 0.6, opacity: 0, y: -16 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.6, opacity: 0 }}
                                    className="absolute left-1/2 top-4 z-50 -translate-x-1/2"
                                >
                                    <div
                                        className={`rounded-pill border-2 px-4 py-2 font-display text-sm font-semibold shadow-lg backdrop-blur ${showFeedback.isGood
                                            ? "border-green/40 bg-green/15 text-green-dark"
                                            : "border-red-accent/40 bg-red-accent/15 text-red-accent"
                                            }`}
                                    >
                                        {showFeedback.message}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* instruction pill */}
                        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
                            <div className="flex items-center gap-1.5 rounded-pill border border-white/60 bg-white/85 px-4 py-2 font-display text-xs font-semibold text-fg2 shadow-sm backdrop-blur">
                                <Hand className="h-3.5 w-3.5 text-cyan-dark" />
                                Drag the <span className="text-green-dark">green</span> items to{" "}
                                {character === "envir" ? "Envir" : "Elva"}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

function Stat({ icon, value, tint }: { icon: React.ReactNode; value: number; tint: string }) {
    return (
        <div className={`flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-display text-sm font-bold ${tint}`}>
            {icon}
            <motion.span key={value} initial={{ scale: 1.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                {value}
            </motion.span>
        </div>
    )
}
