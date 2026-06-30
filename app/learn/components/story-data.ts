export interface StoryChapter {
    image: string
    title: string
    content: string
    narratorText?: string
}

export interface StoryData {
    title: string
    subtitle: string
    icon: string
    color: string
    chapters: StoryChapter[]
}

export const storyData: StoryData = {
    title: "The Leaf of Balance",
    subtitle: "Save Enviria from pollution",
    icon: "🍃",
    color: "from-emerald-500 to-teal-400",
    chapters: [
        {
            image: "/Story/1.jpg",
            title: "The Green Enviria",
            content: "Enviria was once a green world full of forests, rivers, and clean air. Animals played freely, and nature flourished everywhere.",
            narratorText: "Long ago, Enviria was a paradise of nature and life..."
        },
        {
            image: "/Story/2.jpg",
            title: "The Fall",
            content: "But over the years, waste increased and people forgot how to care for nature. Factories polluted the air, and rivers turned grey.",
            narratorText: "Slowly, the balance of nature began to break..."
        },
        {
            image: "/Story/3.jpg",
            title: "The Leaf of Balance",
            content: "Only one magical leaf remained — The Leaf of Balance — holding the power to restore Enviria. It glowed with the last hope of nature.",
            narratorText: "One magical leaf held the key to saving everything..."
        },
        {
            image: "/Story/4.jpg",
            title: "The Dimming",
            content: "Your mission begins when the leaf suddenly dims. Its light flickers as pollution grows stronger. Time is running out!",
            narratorText: "But the leaf's power was fading fast..."
        },
        {
            image: "/Story/5.jpg",
            title: "The Guardian Owl",
            content: "The Guardian Owl appears and says: 'Envir needs your help. Pollution is rising… and only you can bring back the balance.'",
            narratorText: "A wise messenger brought an urgent call to action..."
        },
        {
            image: "/Story/6.jpg",
            title: "The Mission Begins",
            content: "To save Enviria, you must complete challenges, answer questions, and make choices that show you understand how to protect the planet.",
            narratorText: "Your journey to save Enviria starts now..."
        },
        {
            image: "/Story/7.jpg",
            title: "Enviria Restored",
            content: "The leaf will glow brighter with every correct decision… until Enviria is green again. Are you ready to become an eco-hero?",
            narratorText: "With your help, Enviria can be saved!"
        }
    ]
}
