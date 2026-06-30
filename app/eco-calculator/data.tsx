import type { LucideIcon } from "lucide-react"
import {
  Lightbulb,
  Tv,
  Laptop,
  Monitor,
  Fan,
  AirVent,
  Refrigerator,
  Gamepad2,
  Droplets,
  Bath,
  ShowerHead,
  CookingPot,
} from "lucide-react"

export type LightingType = {
  id: string
  name: string
  wattage: number
  note: string
}

// Kid-simple: pick a bulb card, wattage is filled automatically.
export const LIGHTING_TYPES: LightingType[] = [
  { id: "led", name: "LED", wattage: 8, note: "Uses the least energy" },
  { id: "cfl", name: "CFL", wattage: 15, note: "Curly energy-saver" },
  { id: "fluorescent", name: "Fluorescent", wattage: 18, note: "Long tube light" },
  { id: "incandescent", name: "Old bulb", wattage: 60, note: "Uses the most energy" },
]

export type EquipmentDef = {
  id: string
  name: string
  wattage: number
  defaultHours: number
  maxHours: number
  icon: LucideIcon
}

export const EQUIPMENT: EquipmentDef[] = [
  { id: "tv", name: "TV", wattage: 100, defaultHours: 3, maxHours: 12, icon: Tv },
  { id: "laptop", name: "Laptop", wattage: 60, defaultHours: 3, maxHours: 12, icon: Laptop },
  { id: "desktop", name: "Computer", wattage: 150, defaultHours: 3, maxHours: 12, icon: Monitor },
  { id: "fan", name: "Fan", wattage: 50, defaultHours: 6, maxHours: 18, icon: Fan },
  { id: "ac", name: "Air Cond.", wattage: 1000, defaultHours: 4, maxHours: 16, icon: AirVent },
  { id: "fridge", name: "Fridge", wattage: 150, defaultHours: 8, maxHours: 24, icon: Refrigerator },
  { id: "console", name: "Game Console", wattage: 100, defaultHours: 2, maxHours: 10, icon: Gamepad2 },
]

export const LightingIcon = Lightbulb

// Water habit sliders (flow rates/volumes are fixed defaults in eco-calc.ts)
export const WATER_SLIDERS = {
  flushesPerDay: { label: "Toilet flushes a day (each person)", min: 1, max: 10, def: 5, icon: Droplets },
  handwashMin: { label: "Minutes at the sink a day (each person)", min: 1, max: 15, def: 5, icon: Droplets },
  showerMin: { label: "Shower minutes a day (each person)", min: 1, max: 20, def: 7, icon: ShowerHead },
  kitchenMin: { label: "Kitchen tap minutes a day (whole home)", min: 5, max: 40, def: 20, icon: CookingPot },
}

export type Challenge = {
  id: string
  title: string
  text: string
  kind: "energy" | "water"
  icon: LucideIcon
}

export const CHALLENGES: Challenge[] = [
  { id: "lights-off", title: "Lights Off", text: "Turn off lights when you leave a room.", kind: "energy", icon: Lightbulb },
  { id: "led", title: "Switch to LED", text: "Ask a grown-up to use LED bulbs.", kind: "energy", icon: Lightbulb },
  { id: "screens", title: "Screens Off", text: "Turn off the TV and console when not playing.", kind: "energy", icon: Tv },
  { id: "fan-first", title: "Fan First", text: "Use a fan before the air conditioner.", kind: "energy", icon: Fan },
  { id: "tap-off", title: "Close the Tap", text: "Close the tap while brushing your teeth.", kind: "water", icon: Droplets },
  { id: "short-shower", title: "Short Shower", text: "Make your shower 1–2 minutes shorter.", kind: "water", icon: ShowerHead },
  { id: "fix-leak", title: "Fix Leaks", text: "Tell an adult about any dripping tap.", kind: "water", icon: Bath },
  { id: "bowl-wash", title: "Wash in a Bowl", text: "Wash fruit in a bowl, not under the tap.", kind: "water", icon: CookingPot },
]
