import GetStartedToday from "@/components/business/get-started-today";
import HomeBlog from "@/components/business/home-blog";
import HomeContactCard from "@/components/business/home-contact-card";
import HomeDifferents from "@/components/business/home-differents";
import HomeFeatures from "@/components/business/home-features";
import HomeHero from "@/components/business/home-hero";
import HomeMultiClouds from "@/components/business/home-multi-clouds";
import HomeStats from "@/components/business/home-stats";
import SoftwareLogos from "@/components/business/software-logos";
import { getDockerPulls } from "@/lib/docker";
import { getGitHubMetrics } from "@/lib/github";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RustFS | High-Performance S3 Object Storage for AI & Cloud-Native",
  description: 'RustFS is an open-source, Apache 2.0-licensed distributed object storage system built in Rust. A high-performance, drop-in replacement for MinIO and Amazon S3 engineered for AI workloads.',
  keywords: 'RustFS, object storage, distributed storage, open source, Rust, Amazon S3, MinIO alternative, MinIO migration, Apache 2.0, cloud native storage, AI infrastructure',
  authors: [{ name: 'RustFS Team' }],
  openGraph: {
    title: "RustFS | High-Performance S3 Object Storage for AI & Cloud-Native",
    description: 'RustFS is an open-source, Apache 2.0-licensed distributed object storage system built in Rust. A high-performance, drop-in replacement for MinIO and Amazon S3 engineered for AI workloads.',
    type: "website",
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    title: "RustFS | High-Performance S3 Object Storage for AI & Cloud-Native",
    description: 'RustFS is an open-source, Apache 2.0-licensed distributed object storage system built in Rust. A high-performance, drop-in replacement for MinIO and Amazon S3 engineered for AI workloads.',
  },
};

export default async function HomePage() {
  const [dockerPulls, metrics] = await Promise.all([
    getDockerPulls(),
    getGitHubMetrics(),
  ]);

  return (
    <main className="flex-1 relative">
      <div className="relative z-10">
        <HomeHero dockerPulls={dockerPulls} metrics={metrics} />
        <SoftwareLogos />
        <HomeFeatures />
        <HomeStats />
        <HomeDifferents />
        <HomeMultiClouds />
        {/* <HomeReviews /> */}
        <GetStartedToday />
        <HomeBlog />
        <HomeContactCard />
      </div>
    </main>
  );
}
