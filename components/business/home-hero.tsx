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
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="relative z-10">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Rust-native object storage
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-primary sm:text-5xl xl:text-6xl">
              S3-compatible object storage for AI data centers.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              High-performance Rust core, native S3 compatibility, and self-hosted control for AI data centers, cloud-native platforms, and MinIO migrations.
            </p>

            <dl className="mt-8 grid overflow-hidden border border-brand/60 bg-brand text-brand-foreground shadow-[0_16px_48px_color-mix(in_oklch,var(--brand)_18%,transparent)] sm:grid-cols-2 xl:grid-cols-4">
              {stackItems.map((item) => (
                <div key={item.label} className="min-h-28 border-b border-brand-foreground/20 p-4 last:border-b-0 sm:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0">
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-foreground/75">{item.label}</dt>
                  <dd className="mt-4 font-mono text-xs leading-6 text-brand-foreground/90">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <DownloadLink className={`${heroButtonClassName} bg-foreground text-background shadow-none hover:bg-foreground/90 hover:text-background active:bg-foreground/80 active:text-background focus-visible:outline-border`} />
              <ContactUsButton className={`${heroButtonClassName} bg-muted text-foreground shadow-none hover:bg-foreground hover:text-background active:bg-foreground active:text-background focus-visible:outline-border`} />
            </div>
          </div>

          <GlobePanel className="lg:min-h-[36rem]" />
        </div>

        <StatsStrip className="mt-10" dockerPulls={dockerPulls} metrics={metrics} />
      </div>
    </section>
  )
}
