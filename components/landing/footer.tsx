const groups = [
  {
    title: "Explore",
    links: [
      { href: "#story", label: "The Story" },
      { href: "#learn", label: "Learn" },
      { href: "#stories", label: "Comics" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "#act", label: "Take Action" },
      { href: "#subscribe", label: "Subscribe" },
      { href: "#top", label: "Back to top" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-primary px-4 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* brand */}
          <div>
            <p className="font-display text-xl font-bold">Envir &amp; Elva</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              An interactive eco-story that turns everyday habits into little
              adventures for children.
            </p>
            <p className="mt-4 font-display text-sm font-semibold text-white/90">
              Learning today. Protecting tomorrow.
            </p>
          </div>

          {/* link groups */}
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/55">
                {g.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-white/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  )
}
