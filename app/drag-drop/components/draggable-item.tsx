"use client"

import { motion } from "framer-motion"
import { GameItem } from "./game-data"

interface DraggableItemProps {
    item: GameItem
    index: number
    totalItems: number
    dropZoneRef: React.RefObject<HTMLDivElement | null>
    onDrop: (item: GameItem) => void
    isMobile: boolean
}

export function DraggableItem({
    item,
    index,
    totalItems,
    dropZoneRef,
    onDrop,
    isMobile,
}: DraggableItemProps) {
    // Calculate orbit position - spawn FARTHER from character
    const radius = isMobile ? 130 : 200
    const angle = (index / Math.max(totalItems, 6)) * 2 * Math.PI - Math.PI / 2
    const orbitX = Math.cos(angle) * radius
    const orbitY = Math.sin(angle) * radius

    const handleDragEnd = (event: any, info: any) => {
        if (!dropZoneRef.current) return

        const dropZone = dropZoneRef.current.getBoundingClientRect()
        const dropCenterX = dropZone.left + dropZone.width / 2
        const dropCenterY = dropZone.top + dropZone.height / 2

        const distance = Math.sqrt(
            Math.pow(info.point.x - dropCenterX, 2) +
            Math.pow(info.point.y - dropCenterY, 2),
        )

        const threshold = isMobile ? 90 : 110

        if (distance < threshold) {
            onDrop(item)
        }
    }

    const bubble = item.isGood
        ? "border-green/70 bg-[#eafbe0] shadow-[0_8px_20px_rgba(58,179,8,0.2)]"
        : "border-red-accent/55 bg-[#fdeae3] shadow-[0_8px_20px_rgba(193,71,59,0.18)]"

    const label = item.isGood
        ? "bg-green text-white"
        : "bg-red-accent text-white"

    return (
        <motion.div
            drag
            dragElastic={0.3}
            dragConstraints={{ left: -260, right: 260, top: -260, bottom: 260 }}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragEnd={handleDragEnd}
            initial={{ x: orbitX, y: orbitY, scale: 0, opacity: 0 }}
            animate={{ x: orbitX, y: orbitY, scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
            whileHover={{ scale: 1.12, zIndex: 50 }}
            whileDrag={{ scale: 1.25, zIndex: 100 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="absolute left-1/2 top-1/2 -ml-9 -mt-9 cursor-grab touch-none active:cursor-grabbing"
        >
            {/* gentle idle bob (separate layer so it doesn't fight the drag transform) */}
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: (index % 6) * 0.25 }}
                className="flex select-none flex-col items-center gap-1.5"
            >
                <div
                    className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[3px] backdrop-blur-sm md:h-20 md:w-20 ${bubble}`}
                >
                    <span className="text-4xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] md:text-[2.7rem]">
                        {item.emoji}
                    </span>
                </div>
                <span
                    className={`rounded-pill px-2.5 py-0.5 font-display text-[0.6rem] font-bold uppercase tracking-wide shadow-sm ${label}`}
                >
                    {item.name}
                </span>
            </motion.div>
        </motion.div>
    )
}
