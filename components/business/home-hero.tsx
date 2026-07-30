'use client'

import type { GitHubMetrics } from "@/lib/github"
import ContactUsButton from "./buttons/contact-us"
import DownloadLink from "./buttons/download-link"
import GlobePanel from "./globe-panel"
import StatsStrip from "./stats-strip"

interface HomeHeroProps {
  dockerPulls: number;
  metrics: GitHubMetrics;
}

const stackItems = [
  { label: "Apache 2.0", value: "open source" },
  { label: "S3 API", value: "drop-in" },
  { label: "Rust core", value: "memory-safe" },
  { label: "AI data", value: "petabyte-scale" },
];

const heroButtonClassName = "!h-14 !min-h-14 w-full !px-0 !py-0 leading-none sm:!w-48";

export default function HomeHero({ dockerPulls, metrics }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="relative z-10">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Rust-native object storage
            </p>
            <h1 className="w-full font-display text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-primary sm:text-5xl xl:text-6xl">
              High-Performance, S3-Compatible Object Storage for AI Data Centers
            </h1>
            <p className="mt-6 w-full text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              RustFS is the world&apos;s fastest-growing, next-generation distributed object storage. Built from the ground up in Rust and open-sourced under the Apache 2.0 license, RustFS offers native S3 compatibility, serving as a powerful, production-ready alternative to MinIO and Ceph.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-sm xl:grid-cols-4">
              {stackItems.map((item) => (
                <div key={item.label} className="relative pl-4">
                  <span className="absolute left-0 top-1 h-8 w-px bg-border" />
                  <dt className="font-semibold text-foreground">{item.label}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <DownloadLink className={`${heroButtonClassName} bg-foreground text-background shadow-none hover:bg-foreground/90 hover:text-background active:bg-foreground/80 active:text-background focus-visible:outline-border`} />
              <ContactUsButton className={`${heroButtonClassName} bg-muted text-foreground shadow-none hover:bg-foreground hover:text-background active:bg-foreground active:text-background focus-visible:outline-border`} />
            </div>
          </div>

          <GlobePanel className="lg:min-h-[34rem]" />
        </div>

        <StatsStrip className="mt-10" dockerPulls={dockerPulls} metrics={metrics} />
      </div>
    </section>
  )
}
