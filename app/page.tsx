import { NavBar } from "@/components/landing/nav-bar"
import { Hero } from "@/components/landing/hero"
import { ScrollEarth } from "@/components/landing/scroll-earth"
import { StoryTimeline } from "@/components/landing/story-timeline"
import { LearnSection } from "@/components/landing/learn-section"
import { OurStories } from "@/components/landing/our-stories"
import { Actions } from "@/components/landing/actions"
import { Subscribe } from "@/components/landing/subscribe"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <>
      <NavBar />
      {/* single Earth shared by the hero and the story timeline */}
      <ScrollEarth />
      <main>
        <Hero />
        <StoryTimeline />
        <LearnSection />
        <OurStories />
        <Actions />
        <Subscribe />
        <Footer />
      </main>
    </>
  )
}
