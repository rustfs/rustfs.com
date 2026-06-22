'use client'

import { ArrowRightIcon, Code2Icon, GaugeIcon, NetworkIcon, ShieldCheckIcon } from "lucide-react";
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
          sectionNumber="03"
          eyebrow="Why RustFS"
          title="A storage core built for production pressure"
          description="A focused object storage foundation for modern AI, cloud-native, and enterprise workloads."
        />
        <div className="grid gap-4 lg:grid-cols-12">
          <article className="motion-card overflow-hidden border border-border bg-card lg:col-span-5">
            <div className="relative h-48 overflow-hidden border-b border-border bg-background">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
              />
              <div className="relative flex h-full items-end gap-2 p-5">
                {[42, 68, 54, 86, 72, 96].map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="w-full border border-border bg-card"
                    style={{ height: `${height}%` }}
                  >
                    <span className="block h-1/2 bg-brand/45" />
                  </span>
                ))}
              </div>
              <div className="absolute right-4 top-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                FIG.PERF
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <code className="border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {reasons[0].token}
              </code>
              <h3 className="mt-8 text-2xl font-semibold text-foreground">
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
            <div className="flex min-h-full w-full flex-col">
              <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="px-5 py-3">Operating advantages</span>
                <span className="border-l border-border px-4 py-3 text-brand">04 paths</span>
              </div>
              <div className="grid flex-1 grid-rows-4 divide-y divide-border">
                {reasons.slice(1, 5).map((item, index) => {
                  const Icon = reasonIcons[index];

                  return (
                    <article
                      key={item.title}
                      className="motion-card group grid min-h-0 gap-4 px-5 py-5 transition-colors hover:bg-muted/30 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                    >
                      <span className="motion-icon-tile flex size-11 items-center justify-center border border-border bg-background text-brand">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                      <code className="w-fit border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {item.token}
                      </code>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <article className="motion-card grid overflow-hidden border border-border bg-card lg:col-span-12 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative min-h-72 overflow-hidden border-b border-border bg-background lg:border-b-0 lg:border-r">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle,var(--brand)_1px,transparent_1.5px)] [background-size:18px_18px]"
              />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <code className="border border-border bg-card/80 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {reasons[5].token}
                  </code>
                  <h3 className="mt-8 max-w-md text-2xl font-semibold text-foreground">
                    {reasons[5].title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                    {reasons[5].description}
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-px bg-border text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {["SDK", "Tools", "Apps"].map((item) => (
                    <span key={item} className="bg-card/90 px-3 py-3">{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {compatibilityRows.map((item) => (
                <div
                  key={item.title}
                  className="motion-card group grid min-h-28 gap-4 px-6 py-5 transition-colors hover:bg-muted/30 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8"
                >
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="inline-flex items-center gap-3">
                    <code className="w-fit border border-border bg-background px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {item.meta}
                    </code>
                    <ArrowRightIcon className="motion-arrow size-4 text-brand" aria-hidden="true" />
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
