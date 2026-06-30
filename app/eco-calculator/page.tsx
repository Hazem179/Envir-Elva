"use client"

import { useEffect, useState } from "react"
import { useDocumentTitle } from "@/hooks/use-document-title"
import { Users, Home, Lightbulb, Clock } from "lucide-react"
import { StepShell, Stepper, SliderField, ChoiceCard } from "./components/controls"
import { EcoIntro } from "./components/EcoIntro"
import { EcoResults } from "./components/EcoResults"
import { EcoChallenges } from "./components/EcoChallenges"
import { LIGHTING_TYPES, EQUIPMENT, WATER_SLIDERS, LightingIcon } from "./data"
import type { EcoInputs } from "@/lib/eco-calc"

type Phase = "intro" | "rooms" | "equipment" | "water" | "results" | "challenges"

export default function EcoCalculatorPage() {
  useDocumentTitle("Eco Box")

  const [phase, setPhase] = useState<Phase>("intro")

  // household + lighting
  const [people, setPeople] = useState(4)
  const [rooms, setRooms] = useState(4)
  const [lightsPerRoom, setLightsPerRoom] = useState(2)
  const [lightingId, setLightingId] = useState("led")
  const [lightingHours, setLightingHours] = useState(6)

  // equipment: id -> { qty, hours }
  const [equip, setEquip] = useState<Record<string, { qty: number; hours: number }>>({})

  // water habits
  const [flushesPerDay, setFlushes] = useState(WATER_SLIDERS.flushesPerDay.def)
  const [handwashMin, setHandwash] = useState(WATER_SLIDERS.handwashMin.def)
  const [showerMin, setShower] = useState(WATER_SLIDERS.showerMin.def)
  const [kitchenMin, setKitchen] = useState(WATER_SLIDERS.kitchenMin.def)

  useEffect(() => {
    // pre-fill fridge (always on) so first-timers get a realistic number
  }, [])

  const toggleEquip = (id: string) =>
    setEquip((prev) => {
      if (prev[id]) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      const def = EQUIPMENT.find((e) => e.id === id)!
      return { ...prev, [id]: { qty: 1, hours: def.defaultHours } }
    })

  const reset = () => {
    setEquip({})
    setPhase("rooms")
  }

  const buildInputs = (): EcoInputs => {
    const lightingWattage = LIGHTING_TYPES.find((l) => l.id === lightingId)!.wattage
    const equipment = Object.entries(equip).map(([id, v]) => {
      const def = EQUIPMENT.find((e) => e.id === id)!
      return { wattage: def.wattage, qty: v.qty, hours: v.hours }
    })
    return {
      people,
      rooms,
      lightsPerRoom,
      lightingWattage,
      lightingHours,
      equipment,
      flushesPerDay,
      handwashMin,
      showerMin,
      kitchenMin,
    }
  }

  if (phase === "intro") return <EcoIntro onStart={() => setPhase("rooms")} />

  if (phase === "results")
    return (
      <EcoResults
        inputs={buildInputs()}
        onChallenges={() => setPhase("challenges")}
        onRestart={reset}
      />
    )

  if (phase === "challenges") return <EcoChallenges />

  // ---- STEP 1: rooms & lights ----
  if (phase === "rooms") {
    return (
      <StepShell
        stepIndex={0}
        total={5}
        mascot="envir"
        prompt="First, tell me about your home, rooms, and lights."
        title="Your home & lights"
        hideBack
        onNext={() => setPhase("equipment")}
      >
        <div className="space-y-3">
          <Stepper label="People at home" value={people} min={1} max={12} onChange={setPeople} icon={<Users className="h-4 w-4" />} />
          <Stepper label="Rooms" value={rooms} min={1} max={15} onChange={setRooms} icon={<Home className="h-4 w-4" />} />
          <Stepper label="Lights per room" value={lightsPerRoom} min={1} max={8} onChange={setLightsPerRoom} icon={<Lightbulb className="h-4 w-4" />} />

          <div>
            <p className="mb-2 mt-1 font-display text-sm font-semibold text-primary-deep">What kind of bulbs?</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {LIGHTING_TYPES.map((l) => (
                <ChoiceCard
                  key={l.id}
                  selected={lightingId === l.id}
                  onClick={() => setLightingId(l.id)}
                  icon={<LightingIcon className="h-7 w-7" />}
                  title={l.name}
                  note={l.note}
                />
              ))}
            </div>
          </div>

          <SliderField
            label="Lights on each day"
            value={lightingHours}
            min={1}
            max={12}
            onChange={setLightingHours}
            suffix="h"
            icon={<Clock className="h-4 w-4" />}
          />
        </div>
      </StepShell>
    )
  }

  // ---- STEP 2: equipment ----
  if (phase === "equipment") {
    const selectedIds = Object.keys(equip)
    return (
      <StepShell
        stepIndex={1}
        total={5}
        mascot="envir"
        prompt="Now tap the gadgets you have at home."
        title="Your gadgets"
        onBack={() => setPhase("rooms")}
        onNext={() => setPhase("water")}
      >
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {EQUIPMENT.map((e) => {
            const on = !!equip[e.id]
            const Icon = e.icon
            return (
              <button
                key={e.id}
                onClick={() => toggleEquip(e.id)}
                aria-pressed={on}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 transition-all ${
                  on ? "border-green bg-green/10" : "border-border bg-white hover:border-green/40"
                }`}
              >
                <Icon className={`h-7 w-7 ${on ? "text-green-dark" : "text-fg2"}`} />
                <span className="font-display text-xs font-bold text-primary-deep">{e.name}</span>
              </button>
            )
          })}
        </div>

        {selectedIds.length > 0 && (
          <div className="mt-4 space-y-3 border-t border-border pt-4">
            {selectedIds.map((id) => {
              const def = EQUIPMENT.find((e) => e.id === id)!
              const v = equip[id]
              return (
                <div key={id} className="rounded-2xl border border-border bg-surface-2/60 p-3">
                  <p className="mb-2 font-display text-sm font-bold text-primary-deep">{def.name}</p>
                  <div className="space-y-2.5">
                    <Stepper
                      label="How many"
                      value={v.qty}
                      min={1}
                      max={6}
                      onChange={(qty) => setEquip((p) => ({ ...p, [id]: { ...p[id], qty } }))}
                    />
                    <SliderField
                      label="Hours each day"
                      value={v.hours}
                      min={1}
                      max={def.maxHours}
                      onChange={(hours) => setEquip((p) => ({ ...p, [id]: { ...p[id], hours } }))}
                      suffix="h"
                      icon={<Clock className="h-4 w-4" />}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {selectedIds.length === 0 && (
          <p className="mt-4 text-center text-sm text-fg3">Tap a gadget above to add it (or skip if you have none).</p>
        )}
      </StepShell>
    )
  }

  // ---- STEP 3: water ----
  return (
    <StepShell
      stepIndex={2}
      total={5}
      mascot="elva"
      prompt="My turn! Let's see how your home uses water."
      title="Your water habits"
      onBack={() => setPhase("equipment")}
      onNext={() => setPhase("results")}
      nextLabel="See My Score"
    >
      <div className="space-y-3">
        {(["flushesPerDay", "handwashMin", "showerMin", "kitchenMin"] as const).map((key) => {
          const cfg = WATER_SLIDERS[key]
          const Icon = cfg.icon
          const value = { flushesPerDay, handwashMin, showerMin, kitchenMin }[key]
          const setter = { flushesPerDay: setFlushes, handwashMin: setHandwash, showerMin: setShower, kitchenMin: setKitchen }[key]
          return (
            <SliderField
              key={key}
              label={cfg.label}
              value={value}
              min={cfg.min}
              max={cfg.max}
              onChange={setter}
              icon={<Icon className="h-4 w-4" />}
            />
          )
        })}
      </div>
    </StepShell>
  )
}
