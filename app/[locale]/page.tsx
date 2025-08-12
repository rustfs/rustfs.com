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
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('RustFS - High-Performance Distributed Storage System Built with Rust'),
    description: t('RustFS is a high-performance, unlimited scaling, secure and reliable distributed storage system built with Rust, S3 protocol compatible, supporting multi-cloud storage.'),
    keywords: t('RustFS, distributed storage, cloud storage, S3 compatible, high performance, open source, MinIO alternative'),
    authors: [{ name: "RustFS Team" }],
    openGraph: {
      title: t('RustFS - High-Performance Distributed Storage System Built with Rust'),
      description: t('RustFS is a high-performance, unlimited scaling, secure and reliable distributed storage system built with Rust, S3 protocol compatible, supporting multi-cloud storage.'),
      type: "website",
      locale: locale,
      alternateLocale: locale === 'zh' ? 'en' : 'zh',
    },
    twitter: {
      card: "summary_large_image",
      title: t('RustFS - High-Performance Distributed Storage System Built with Rust'),
      description: t('RustFS is a high-performance, unlimited scaling, secure and reliable distributed storage system built with Rust, S3 protocol compatible, supporting multi-cloud storage.'),
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
