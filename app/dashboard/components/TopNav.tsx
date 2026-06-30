"use client"

import { motion } from "framer-motion"
import { Home, User, Settings, LogOut, Leaf } from "lucide-react"
import { getCharacterColor } from "@/components/character-display"

interface TopNavProps {
  character: string
  onNavigate: (path: string) => void
}

export function TopNav({ character, onNavigate }: TopNavProps) {
  const primaryColor = getCharacterColor({ character: character as "envir" | "elva" })
  const secondaryColor = character === "envir" ? "#03aabd" : "#3ab308"

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-lg"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 12px ${primaryColor}40`
              }}
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold" style={{ color: primaryColor }}>
                Envir & Elva
              </h1>
              <p className="text-xs text-gray-500 font-medium">Eco Learning Platform</p>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex gap-2 items-center">
            <NavButton
              icon={<Home size={18} />}
              label="Home"
              onClick={() => onNavigate("/dashboard")}
              color={primaryColor}
            />
            <NavButton
              icon={<User size={18} />}
              label="Profile"
              onClick={() => onNavigate("/profile")}
              color={primaryColor}
            />
            <div className="hidden md:block">
              <NavButton
                icon={<Settings size={18} />}
                label="Settings"
                onClick={() => {}}
                color={primaryColor}
              />
            </div>
            <NavButton
              icon={<LogOut size={18} />}
              label="Exit"
              onClick={() => onNavigate("/")}
              variant="danger"
            />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function NavButton({ 
  icon, 
  label, 
  onClick, 
  variant = "default",
  color = "#3ab308"
}: { 
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: "default" | "danger"
  color?: string
}) {
  const isDanger = variant === "danger"
  
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group"
      style={{
        background: isDanger ? "#fee2e2" : "transparent",
        color: isDanger ? "#dc2626" : "#64748b",
        border: "none",
        borderRadius: "12px",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "14px",
        transition: "all 0.2s ease"
      }}
      title={label}
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-12px"
        style={{
          background: isDanger ? "#fecaca" : `${color}10`,
          opacity: 0,
          borderRadius: "12px"
        }}
        whileHover={{ opacity: 1 }}
      />
      
      <div className="relative z-10 flex items-center gap-2">
        {icon}
        <span className="hidden lg:inline">{label}</span>
      </div>
    </motion.button>
  )
}
