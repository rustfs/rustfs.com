import HomeDifferents from "@/components/ui/home-differents";
import HomeFeatures from "@/components/ui/home-features";
import HomeFeatures2 from "@/components/ui/home-features2";
import HomeStats from "@/components/ui/home-stats";
import GetStartedToday from "../components/ui/get-started-today";
import HomeHero from "../components/ui/home-hero";
import HomeReviews from "../components/ui/reviews";
import Subscribe from "../components/ui/subscribe";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeStats />
      <HomeFeatures />
      <HomeDifferents />
      <HomeFeatures2 />
      <GetStartedToday />
      <HomeReviews />
      <Subscribe />

    </main>
  );
}
