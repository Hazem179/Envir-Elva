// Envir & Elva "Eco Box" — calculation engine.
// Formulas follow the spec exactly (educational estimate, not a utility bill).
// Admin-editable values (emission factor, fixture flows) live here as constants,
// ready to be sourced from the Django API later.

export const EMISSION_FACTOR = 0.4 // kgCO2 per kWh (Egypt, IEA 2025 — editable)
export const DAYS_PER_MONTH = 30

// Fixed water assumptions (kids don't enter these; defaults from the spec)
export const WATER = {
  flushVolume: 6, // L/flush
  bathroomFlow: 6, // L/min
  kitchenFlow: 8, // L/min
  showerFlow: 9, // L/min
  kitchens: 1,
}

export type SelectedEquipment = { wattage: number; qty: number; hours: number }

export type EcoInputs = {
  people: number
  rooms: number
  lightsPerRoom: number
  lightingWattage: number
  lightingHours: number
  equipment: SelectedEquipment[]
  flushesPerDay: number
  handwashMin: number // bathroom faucet minutes / person / day
  showerMin: number // shower minutes / person / day
  kitchenMin: number // kitchen faucet minutes / day (household)
}

export type EnergyResult = {
  monthlyLightingKWh: number
  monthlyEquipmentKWh: number
  monthlyEnergyKWh: number
  annualEnergyKWh: number
  monthlyCO2: number
  annualCO2: number
}

export type WaterResult = {
  toilet: number
  bathroom: number
  kitchen: number
  shower: number
  totalDailyL: number
  monthlyL: number
  monthlyM3: number
  annualM3: number
}

export function calcEnergy(i: EcoInputs): EnergyResult {
  const totalLights = i.rooms * i.lightsPerRoom
  const dailyLighting = (totalLights * i.lightingWattage * i.lightingHours) / 1000
  const monthlyLightingKWh = dailyLighting * DAYS_PER_MONTH

  const dailyEquipment = i.equipment.reduce(
    (sum, e) => sum + (e.qty * e.wattage * e.hours) / 1000,
    0,
  )
  const monthlyEquipmentKWh = dailyEquipment * DAYS_PER_MONTH

  const monthlyEnergyKWh = monthlyLightingKWh + monthlyEquipmentKWh
  const annualEnergyKWh = monthlyEnergyKWh * 12

  return {
    monthlyLightingKWh,
    monthlyEquipmentKWh,
    monthlyEnergyKWh,
    annualEnergyKWh,
    monthlyCO2: monthlyEnergyKWh * EMISSION_FACTOR,
    annualCO2: annualEnergyKWh * EMISSION_FACTOR,
  }
}

export function calcWater(i: EcoInputs): WaterResult {
  const toilet = i.people * i.flushesPerDay * WATER.flushVolume
  const bathroom = i.people * i.handwashMin * WATER.bathroomFlow
  const kitchen = WATER.kitchens * i.kitchenMin * WATER.kitchenFlow
  const shower = i.people * i.showerMin * WATER.showerFlow
  const totalDailyL = toilet + bathroom + kitchen + shower
  const monthlyL = totalDailyL * DAYS_PER_MONTH
  const monthlyM3 = monthlyL / 1000
  return {
    toilet,
    bathroom,
    kitchen,
    shower,
    totalDailyL,
    monthlyL,
    monthlyM3,
    annualM3: monthlyM3 * 12,
  }
}

export type Band = { level: 0 | 1 | 2; label: string }

export function energyScore(monthlyEnergyKWh: number, people: number): Band {
  const perPerson = monthlyEnergyKWh / Math.max(1, people)
  if (perPerson < 50) return { level: 0, label: "Eco Hero" }
  if (perPerson <= 100) return { level: 1, label: "Good Saver" }
  return { level: 2, label: "Needs Improvement" }
}

export function waterScore(totalDailyL: number, people: number): Band {
  const perPerson = totalDailyL / Math.max(1, people)
  if (perPerson < 100) return { level: 0, label: "Water Hero" }
  if (perPerson <= 150) return { level: 1, label: "Good Saver" }
  return { level: 2, label: "Needs Improvement" }
}

// Overall level = the worse of the two (most room to improve)
export function overallLevel(energy: Band, water: Band): 0 | 1 | 2 {
  return Math.max(energy.level, water.level) as 0 | 1 | 2
}

export const OVERALL_MESSAGE = [
  {
    title: "Amazing, Eco Hero!",
    text: "Envir and Elva are proud of you. Your home uses energy and water carefully.",
  },
  {
    title: "Good start!",
    text: "You can save even more by turning off lights, using LED lamps, and closing the tap.",
  },
  {
    title: "Big saving chance!",
    text: "Envir and Elva found a great chance to save. Small changes cut your energy, water, and CO2.",
  },
] as const

// Turn abstract numbers into things a child can picture.
export function equivalences(energy: EnergyResult, water: WaterResult) {
  return {
    // a mature tree absorbs ~21 kg CO2 per year
    trees: Math.max(1, Math.round(energy.annualCO2 / 21)),
    // a bathtub holds ~150 L
    bathtubs: Math.max(1, Math.round(water.monthlyL / 150)),
    // a TV uses ~0.1 kWh per hour
    tvHours: Math.max(1, Math.round(energy.monthlyEnergyKWh / 0.1)),
  }
}

export const round = (n: number, d = 0) => {
  const f = 10 ** d
  return Math.round(n * f) / f
}
