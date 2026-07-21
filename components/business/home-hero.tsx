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
  { label: "Apache 2.0", value: "business-friendly" },
  { label: "S3 API", value: "published overview" },
  { label: "Rust core", value: "memory-safe" },
  { label: "Release", value: "public beta" },
];

const heroButtonClassName = "!h-14 !min-h-14 w-full !px-0 !py-0 leading-none sm:!w-48";

export default function HomeHero({ dockerPulls, metrics }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="relative z-10">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Open source / public beta
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-primary sm:text-5xl xl:text-6xl">
              Open S3-compatible storage, built in Rust.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Keep familiar S3 clients, run on your infrastructure, and evaluate a memory-safe Apache 2.0 storage core for private cloud, migration, and modern data workloads.
            </p>

            <dl className="mt-8 grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
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
              <ContactUsButton label="Evaluate migration" className={`${heroButtonClassName} bg-muted text-foreground shadow-none hover:bg-foreground hover:text-background active:bg-foreground active:text-background focus-visible:outline-border`} />
            </div>
          </div>

          <GlobePanel className="lg:min-h-[34rem]" />
        </div>

        <StatsStrip className="mt-10" dockerPulls={dockerPulls} metrics={metrics} />
        <div className="mt-4 grid gap-3 border-b border-border pb-5 text-xs leading-6 text-muted-foreground sm:grid-cols-[1fr_auto] sm:items-center">
          <p>
            Current maturity: public beta. Distributed mode, lifecycle management, and KMS remain under active validation.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold text-foreground">
            <a className="hover:text-brand" href="https://docs.rustfs.com/features/s3-compatibility/" target="_blank" rel="noopener noreferrer">
              Compatibility overview ↗
            </a>
            <a className="hover:text-brand" href="https://github.com/rustfs/rustfs#feature--status" target="_blank" rel="noopener noreferrer">
              Release status ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
