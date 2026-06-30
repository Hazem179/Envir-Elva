export interface GameItem {
    id: number
    emoji: string
    name: string
    isGood: boolean
    description: string
}

export const gameItems: GameItem[] = [
    { id: 1, emoji: "🌳", name: "Tree", isGood: true, description: "Trees clean our air!" },
    { id: 2, emoji: "💧", name: "Water", isGood: true, description: "Fresh water is precious!" },
    { id: 3, emoji: "♻️", name: "Recycle", isGood: true, description: "Recycling saves resources!" },
    { id: 4, emoji: "☀️", name: "Solar", isGood: true, description: "Clean energy from the sun!" },
    { id: 5, emoji: "🌸", name: "Flower", isGood: true, description: "Nature is beautiful!" },
    { id: 6, emoji: "🗑️", name: "Trash", isGood: false, description: "Pollution hurts our planet!" },
    { id: 7, emoji: "🏭", name: "Factory", isGood: false, description: "Factories can pollute!" },
    { id: 8, emoji: "🚗", name: "Car", isGood: false, description: "Cars create emissions!" },
    { id: 9, emoji: "💡", name: "Light", isGood: false, description: "Wasting energy hurts Earth!" },
    { id: 10, emoji: "🛢️", name: "Oil", isGood: false, description: "Fossil fuels pollute!" },
    { id: 11, emoji: "🚲", name: "Bike", isGood: true, description: "Bikes are clean travel!" },
    { id: 12, emoji: "🌱", name: "Sprout", isGood: true, description: "New plants grow our future!" },
    { id: 13, emoji: "🛍️", name: "Plastic", isGood: false, description: "Plastic bags harm wildlife!" },
    { id: 14, emoji: "💨", name: "Smoke", isGood: false, description: "Smoke pollutes the air!" },
]

export interface GameState {
    health: number
    score: number
    itemsCollected: number
    gameStarted: boolean
    gameOver: boolean
}
