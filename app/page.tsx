import GetStartedToday from "@/app/components/get-started-today";
import HomeDifferents from "@/app/components/home-differents";
import HomeFeatures from "@/app/components/home-features";
import HomeHero from "@/app/components/home-hero";
import HomeMultiClouds from "@/app/components/home-multi-clouds";
import HomeStats from "@/app/components/home-stats";
import HomeReviews from "@/app/components/reviews";
import Subscribe from "@/app/components/subscribe";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeStats />
      <HomeFeatures />
      <HomeDifferents />
      <HomeMultiClouds />
      <GetStartedToday />
      <HomeReviews />
      <Subscribe />

    </main>
  );
}
