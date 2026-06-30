"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface DashboardNavbarProps {
  character: string
  onNavigate: (path: string) => void
}

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Missions", path: "/learn" },
  { label: "Quizzes", path: "/quiz" },
  { label: "Play", path: "/drag-drop" },
  { label: "Eco Box", path: "/eco-calculator" },
]

export function DashboardNavbar({ character, onNavigate }: DashboardNavbarProps) {
  const avatarSrc = character === "envir" ? "/Envir.png" : "/Elva.png"
  const pathname = usePathname()

  const handleBrandKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onNavigate("/dashboard")
    }
  }

  return (
    <header className="dashboard-navbar">
      <div
        className="dashboard-navbar__brand"
        onClick={() => onNavigate("/dashboard")}
        role="button"
        tabIndex={0}
        onKeyDown={handleBrandKeyDown}
      >
        <div className="dashboard-navbar__brand-icon">
          <Image src={avatarSrc} alt="Eco buddy" fill sizes="56px" />
        </div>
        <div>
          <p className="dashboard-navbar__brand-title">EcoLearn</p>
          <span className="dashboard-navbar__brand-subtitle">Planet heroes academy</span>
        </div>
      </div>

      <nav className="dashboard-navbar__links">
        {NAV_LINKS.map((link) => (
          <Button
            key={link.path}
            variant="ghost"
            className={`dashboard-navbar__link${pathname === link.path ? " dashboard-navbar__link--active" : ""}`}
            onClick={() => onNavigate(link.path)}
          >
            {link.label}
          </Button>
        ))}
      </nav>

      <div className="dashboard-navbar__actions">
        <Button variant="outline" className="dashboard-navbar__action" onClick={() => onNavigate("/profile")}>
          Profile
        </Button>
        <Button variant="default" className="dashboard-navbar__action" onClick={() => onNavigate("/settings")}>
          Settings
        </Button>
      </div>
    </header>
  )
}
