import GetStartedToday from "@/components/business/get-started-today";
import HomeDifferents from "@/components/business/home-differents";
import HomeFeatures from "@/components/business/home-features";
import HomeHero from "@/components/business/home-hero";
import HomeMultiClouds from "@/components/business/home-multi-clouds";
import HomeStats from "@/components/business/home-stats";
import HomeReviews from "@/components/business/reviews";
import Subscribe from "@/components/business/subscribe";
import { locales } from '@/lib/constants';
import { getTranslations } from '@/lib/i18n-server';
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });

  return {
    title: t('titles.home'),
    description: t('descriptions.home'),
    keywords: t('keywords'),
    authors: [{ name: t('author') }],
    openGraph: {
      title: t('titles.home'),
      description: t('descriptions.home'),
      type: "website",
      locale: locale,
      alternateLocale: locale === 'zh' ? 'en' : 'zh',
    },
    twitter: {
      card: "summary_large_image",
      title: t('titles.home'),
      description: t('descriptions.home'),
    },
  };
}

export default async function HomePage() {
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
