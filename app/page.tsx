import GetStartedToday from "@/components/business/get-started-today";
import HomeDifferents from "@/components/business/home-differents";
import HomeFeatures from "@/components/business/home-features";
import HomeHero from "@/components/business/home-hero";
import HomeMultiClouds from "@/components/business/home-multi-clouds";
import HomeStats from "@/components/business/home-stats";
import HomeReviews from "@/components/business/reviews";
import Subscribe from "@/components/business/subscribe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RustFS - High-Performance Distributed Storage System Built with Rust',
  description: 'RustFS is a high-performance, Limitless Scalability, secure and reliable distributed storage system built with Rust, S3 protocol compatible, supporting multi-cloud storage.',
  keywords: 'RustFS, distributed storage, cloud storage, S3 compatible, high performance, open source, MinIO alternative',
  authors: [{ name: 'RustFS Team' }],
  openGraph: {
    title: 'RustFS - High-Performance Distributed Storage System Built with Rust',
    description: 'RustFS is a high-performance, Limitless Scalability, secure and reliable distributed storage system built with Rust, S3 protocol compatible, supporting multi-cloud storage.',
    type: "website",
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    title: 'RustFS - High-Performance Distributed Storage System Built with Rust',
    description: 'RustFS is a high-performance, Limitless Scalability, secure and reliable distributed storage system built with Rust, S3 protocol compatible, supporting multi-cloud storage.',
  },
};

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
