import Contact from "@components/contact"
import Clients from "@components/home/clients"
import Differents from "@components/home/differents"
import Features from "@components/home/features"
import Features1 from "@components/home/features1"
import Hero from "@components/home/hero"
import RecentNews from "@components/home/recent-news"
import Reviews from "@components/home/reviews"
import Stats from "@components/home/stats"
import Subscribe from "@components/subscribe"

export default function Home() {
  return (
    <>
      <Hero />

      <div className="bg-neutral-50 dark:bg-neutral-900">
        <Features />
      </div>
      <Clients />

      <div className="bg-neutral-50 dark:bg-neutral-900">
        <Stats />
      </div>

      <Features1 />

      <div className="bg-neutral-50 dark:bg-neutral-900">
        <Differents />
      </div>


      <Reviews />

      <div className="bg-neutral-50 dark:bg-neutral-900">
        <RecentNews />
      </div>

      <Contact />

      <div className="bg-neutral-50 dark:bg-neutral-900">
        <Subscribe />
      </div>
    </>
  )
}
