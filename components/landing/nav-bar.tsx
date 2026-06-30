"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const links = [
  { href: "#story", label: "The Story" },
  { href: "#learn", label: "Learn" },
  { href: "#stories", label: "Comics" },
  { href: "#act", label: "Take Action" },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="min-w-0 shrink truncate font-display text-lg font-bold tracking-tight text-primary-leaf sm:text-xl"
        >
          Envir <span className="text-cyan-dark">&amp;</span> Elva
        </a>

        {/* desktop nav */}
        <div className="hidden items-center gap-1 sm:flex sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-pill px-3 py-2 font-display text-sm font-semibold text-fg2 transition-colors hover:bg-surface-leaf hover:text-primary-leaf sm:px-4"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#subscribe"
            className="ml-1 rounded-pill bg-green px-4 py-2 font-display text-sm font-semibold text-white shadow-[0_6px_16px_rgba(58,179,8,0.3)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan active:scale-95 sm:ml-2"
          >
            Subscribe
          </a>
        </div>

        {/* mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-primary-leaf transition-colors hover:bg-surface-leaf focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18M3 12h18M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden border-t border-border bg-white/95 backdrop-blur-md sm:hidden"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-display text-base font-semibold text-fg1 transition-colors hover:bg-surface-leaf hover:text-primary-leaf"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#subscribe"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-pill bg-green px-4 py-3 text-center font-display font-semibold text-white shadow-[0_6px_16px_rgba(58,179,8,0.3)] active:scale-[0.98]"
              >
                Subscribe
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
