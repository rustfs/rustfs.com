import GetStartedToday from "@/components/business/get-started-today";
import HomeDifferents from "@/components/business/home-differents";
import HomeFeatures from "@/components/business/home-features";
import HomeHero from "@/components/business/home-hero";
import HomeMultiClouds from "@/components/business/home-multi-clouds";
import HomeStats from "@/components/business/home-stats";
import HomeReviews from "@/components/business/reviews";
import Subscribe from "@/components/business/subscribe";
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <HomeHero />
      <HomeFeatures />
      <HomeStats />
      <HomeDifferents />
      <HomeMultiClouds />
      <HomeReviews />
      <GetStartedToday />
      <Subscribe />
    </main>
  );
}
