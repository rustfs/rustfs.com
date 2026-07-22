'use client'

import { ActivityIcon, Code2Icon, GaugeIcon, HardDriveIcon, NetworkIcon, ShieldCheckIcon } from "lucide-react";
import { DataFlowLine } from "./data-flow-motion";
import HomeSectionHeader from "./home-section-header";

const reasons = [
  {
    title: "High-Performance",
    token: "perf",
    description: "Built with Rust. Zero-overhead. Hardware-saturated.",
  },
  {
    title: "Security & Compliance",
    token: "trust",
    description: "Self-hosted control, built-in security, and enterprise compliance.",
  },
  {
    title: "Availability & Scale",
    token: "scale",
    description: "Distributed architecture with horizontal and vertical scaling, built to avoid single points of failure.",
  },
  {
    title: "Developer-First Experience",
    token: "dx",
    description: "Cross-platform support, versatile installations, and one-click deployment.",
  },
  {
    title: "Open Source",
    token: "oss",
    description: "Apache-2.0 licensed, business-friendly, and vendor-independent.",
  },
  {
    title: "S3-Compatible",
    token: "s3",
    description: "Fully S3-compatible for seamless integration and effortless migration.",
  },
];

const compatibilityRows = [
  {
    title: "AWS SDKs",
    detail: "Keep application storage code unchanged.",
    meta: "S3 API",
  },
  {
    title: "MinIO tools",
    detail: "Reuse familiar migration and admin workflows.",
    meta: "MC / CLI",
  },
  {
    title: "Cloud apps",
    detail: "Connect S3-aware analytics, backup, and AI pipelines.",
    meta: "DROP-IN",
  },
];

const reasonIcons = [ShieldCheckIcon, NetworkIcon, Code2Icon, GaugeIcon];

export default function HomeStats() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="Why RustFS"
          title={<><span className="lg:whitespace-nowrap">A storage core built for</span>{" "}<span className="lg:whitespace-nowrap">production pressure</span></>}
          description="A focused object storage foundation for modern AI, cloud-native, and enterprise workloads."
        />
        <div className="grid gap-4 lg:grid-cols-12">
          <article className="motion-card overflow-hidden border border-border bg-card lg:col-span-5">
            <div className="relative h-52 overflow-hidden border-b border-border bg-background">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
              />
              <div className="absolute inset-x-5 top-4 flex items-center justify-between font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span>Parallel I/O path</span>
                <span className="text-brand">Rust core</span>
              </div>
              <div className="relative grid h-full grid-cols-[4.5rem_auto_6rem_auto_minmax(0,1fr)] items-center gap-2 px-5 pb-5 pt-10">
                <div className="grid h-20 place-items-center border border-border bg-card px-2 text-center">
                  <ActivityIcon className="size-4 text-brand" />
                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    S3 requests
                  </span>
                </div>
                <DataFlowLine direction="horizontal" className="w-5 sm:w-7" />
                <div className="grid h-24 place-items-center border border-brand bg-brand/10 px-3 text-center">
                  <GaugeIcon className="size-5 text-brand" />
                  <div>
                    <p className="font-mono text-[10px] font-semibold text-foreground">RustFS I/O</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">scheduler</p>
                  </div>
                </div>
                <DataFlowLine direction="horizontal" className="w-5 sm:w-7" delay={0.35} />
                <div className="grid gap-2">
                  {["Disk 01", "Disk 02", "Disk 03"].map((disk, index) => (
                    <div key={disk} className="flex items-center gap-2 border border-border bg-card px-2 py-2">
                      <HardDriveIcon className="size-3.5 shrink-0 text-brand" />
                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {disk}
                      </span>
                      <span className="ml-auto h-1 w-3 bg-brand/40" style={{ opacity: 1 - index * 0.2 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-foreground">
                {reasons[0].title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {reasons[0].description}
              </p>
              <div className="mt-8 border border-border bg-background p-4">
                <pre className="overflow-x-auto text-xs leading-6 text-muted-foreground">
                  <code>{`[rustfs]
runtime = "memory-safe"
io = "hardware-saturated"
mode = "distributed"`}</code>
                </pre>
              </div>
            </div>
          </article>

          <div className="flex overflow-hidden border border-border bg-card lg:col-span-7">
            <div className="grid min-h-full w-full grid-rows-4 divide-y divide-border">
              {reasons.slice(1, 5).map((item, index) => {
                const Icon = reasonIcons[index];

                return (
                  <article
                    key={item.title}
                    className="grid min-h-0 gap-4 px-5 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                  >
                    <span className="flex size-11 items-center justify-center bg-background text-brand">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                    <code className="w-fit text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {item.token}
                    </code>
                  </article>
                );
              })}
            </div>
          </div>

          <article className="grid overflow-hidden border border-border bg-card lg:col-span-12 lg:grid-cols-4">
            <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
              <code className="text-[10px] uppercase tracking-[0.14em] text-brand">{reasons[5].token}</code>
              <h3 className="mt-3 text-xl font-semibold text-foreground">{reasons[5].title}</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{reasons[5].description}</p>
            </div>
            {compatibilityRows.map((item) => (
              <div key={item.title} className="border-b border-border p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <code className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">{item.meta}</code>
                <h4 className="mt-3 text-base font-semibold text-foreground">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}
