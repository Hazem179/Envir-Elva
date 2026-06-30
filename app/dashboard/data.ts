import {
  Sparkles,
  BookOpen,
  Brain,
  Heart,
  Droplets,
  Recycle,
  Leaf,
  Flame,
  Star,
  Zap,
} from "lucide-react"
import type {
  AdventureGame,
  DailyQuest,
  BadgeData,
  LeaderboardEntry,
} from "./components/types"

export const brandPalette = {
  green: "#3ab308",
  teal: "#03aabd",
  rust: "#a54438",
  lime: "#8fe36a",
  aqua: "#30cbe1",
  blush: "#e66b54",
}

export const adventureGames: AdventureGame[] = [
  {
    id: "story",
    title: "Storybook Forest",
    tagline: "Flip, listen, and save the trees",
    description: "Pick a story path, help forest pals, and unlock shiny stickers along the way.",
    icon: BookOpen,
    imageIcon: "/icons/adventure_storybook.png",
    route: "/learn",
    gradient: [brandPalette.teal, brandPalette.green],
    accent: brandPalette.aqua,
    highlights: [
      { label: "Sticker Hunt", icon: Sparkles },
      { label: "Voice Friend", icon: Star },
    ],
    missionSteps: [
      "Wake the sleepy sprouts",
      "Collect 3 story charms",
      "Tell a happy planet fact",
    ],
    progress: {
      label: "Story Journey",
      value: 68,
    },
    buddies: [
      { name: "Luna", emoji: "🦉", mood: "Curious", energy: 92 },
      { name: "Milo", emoji: "🦊", mood: "Playful", energy: 87 },
      { name: "Pip", emoji: "🐸", mood: "Bouncy", energy: 76 },
    ],
  },
  {
    id: "quiz",
    title: "Quiz Sprint",
    tagline: "Speedy eco riddles",
    description: "Tap the right answers before the glow fades and race friends on the board.",
    icon: Brain,
    imageIcon: "/icons/adventure_quiz.png",
    route: "/quiz",
    gradient: [brandPalette.teal, brandPalette.aqua],
    accent: brandPalette.green,
    highlights: [
      { label: "Quick Think", icon: Flame },
      { label: "Cheer Squad", icon: Sparkles },
    ],
    missionSteps: [
      "Solve 5 green riddles",
      "Beat your best sparkle time",
      "Share a new planet win",
    ],
    progress: {
      label: "Quiz Dash",
      value: 52,
    },
    buddies: [
      { name: "Sunny", emoji: "🐣", mood: "Sunny", energy: 84 },
      { name: "Rex", emoji: "🦖", mood: "Brave", energy: 73 },
      { name: "Pebble", emoji: "🐧", mood: "Chill", energy: 66 },
    ],
  },
  {
    id: "move",
    title: "Eco Moves",
    tagline: "Dance, sort, and shine",
    description: "Drag the right treats, recycle fast, and keep your buddy smiling bright.",
    icon: Heart,
    imageIcon: "/icons/adventure_moves.png",
    route: "/drag-drop",
    gradient: [brandPalette.rust, brandPalette.blush],
    accent: brandPalette.teal,
    highlights: [
      { label: "Move & Match", icon: Zap },
      { label: "Happy Habitat", icon: Leaf },
    ],
    missionSteps: [
      "Sort 5 power snacks",
      "Recycle the sneaky cans",
      "Do the victory wiggle",
    ],
    progress: {
      label: "Move Groove",
      value: 74,
    },
    buddies: [
      { name: "Zuzu", emoji: "🦓", mood: "Stripy", energy: 89 },
      { name: "Mika", emoji: "🐼", mood: "Cuddly", energy: 81 },
      { name: "Nori", emoji: "🐢", mood: "Calm", energy: 70 },
    ],
  },
]

export const dailyQuests: DailyQuest[] = [
  {
    id: 1,
    title: "The 10-Minute Cleanup",
    description: "Collect 10 scattered litter items inside the app world in under 10 minutes.",
    imageIcon: "/icons/mission_cleanup_1769232832443.png",
    progress: 4,
    total: 10,
    reward: "+1 badge, +150 XP",
  },
  {
    id: 2,
    title: "Water Saver",
    description: "Complete three water-saving mini tasks: fixing leaks, closing taps, and choosing low-flow devices.",
    imageIcon: "/icons/mission_water_saver_1769232845628.png",
    progress: 1,
    total: 3,
    reward: "Water Hero Badge",
  },
  {
    id: 3,
    title: "Energy Guardian",
    description: "Spot all the energy-wasting habits in a room: lights left on, AC misuse, chargers plugged in.",
    imageIcon: "/icons/mission_energy_1769232860801.png",
    progress: 2,
    total: 5,
    reward: "+200 XP",
  },
  {
    id: 4,
    title: "The Recycling Rookie",
    description: "Sort 20 items correctly in the Waste Sort Challenge.",
    imageIcon: "/icons/mission_recycling_1769232876459.png",
    progress: 8,
    total: 20,
    reward: "Recycling Rookie Badge",
  },
  {
    id: 5,
    title: "Tree Planter Quest",
    description: "Plant 5 virtual trees and learn real-life planting tips.",
    imageIcon: "/icons/mission_tree_planter_1769232890759.png",
    progress: 2,
    total: 5,
    reward: "Tree Planter Badge",
  },
]

export const badgeShelf: BadgeData[] = [
  {
    id: 1,
    name: "EcoStarter",
    imageIcon: "/icons/badge_ecostarter_1769232921306.png",
    color: brandPalette.green,
    unlocked: true,
    description: "Awarded for completing your first mission."
  },
  {
    id: 2,
    name: "Zero Waste Champ",
    imageIcon: "/icons/badge_zero_waste_1769232934988.png",
    color: brandPalette.lime,
    unlocked: true,
    description: "Given after sorting 50 waste items correctly."
  },
  {
    id: 3,
    name: "Water Hero",
    imageIcon: "/icons/badge_water_hero_1769232951716.png",
    color: brandPalette.teal,
    unlocked: true,
    description: "Awarded for completing the Water Saver quest."
  },
  {
    id: 4,
    name: "Forest Guardian",
    imageIcon: "/icons/badge_forest_guardian_1769232966216.png",
    color: brandPalette.green,
    unlocked: false,
    description: "Earned after defending the forest for 5 consecutive levels."
  },
  {
    id: 5,
    name: "Green Architect",
    imageIcon: "/icons/badge_green_architect_1769232983502.png",
    color: brandPalette.aqua,
    unlocked: false,
    description: "Earned after finishing your first sustainable building in Green Builder."
  },
  {
    id: 6,
    name: "Climate Ambassador",
    imageIcon: "/icons/badge_climate_ambassador_1769232998274.png",
    color: brandPalette.teal,
    unlocked: false,
    description: "Special badge granted after completing all five beginner missions."
  },
]

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "EcoChampion", xp: 2450, avatar: "🌟" },
  { rank: 2, name: "GreenWarrior", xp: 2100, avatar: "🌿" },
  { rank: 3, name: "NatureKid", xp: 1850, avatar: "🌈" },
]
