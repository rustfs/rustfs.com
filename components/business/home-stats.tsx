'use client'

import { ArrowRightIcon, Code2Icon, GaugeIcon, NetworkIcon, ShieldCheckIcon } from "lucide-react";
import HomeSectionHeader from "./home-section-header";

const reasons = [
  {
    title: "Rust-native core",
    token: "runtime",
    description: "A memory-safe storage core designed for teams that want direct control over infrastructure and code.",
  },
  {
    title: "Security reviewability",
    token: "trust",
    description: "Self-hosted control with documented identity, encryption, and audit surfaces to evaluate.",
  },
  {
    title: "Architecture without a metadata tier",
    token: "scale",
    description: "A decentralized peer-to-peer design with strong read-after-write consistency.",
  },
  {
    title: "Familiar evaluation path",
    token: "dx",
    description: "Start on one node, exercise existing S3 clients, then validate the topology you intend to operate.",
  },
  {
    title: "Open Source",
    token: "oss",
    description: "Apache-2.0 licensed, business-friendly, and vendor-independent.",
  },
  {
    title: "Published S3 coverage",
    token: "s3",
    description: "Broad S3 API coverage with a published overview to use alongside workload-specific testing.",
  },
];

const compatibilityRows = [
  {
    title: "AWS SDKs",
    detail: "Run the operations your application depends on and compare results with the published coverage overview.",
    meta: "VERIFY",
  },
  {
    title: "MinIO tools",
    detail: "Evaluate familiar clients and migration steps before changing a production endpoint.",
    meta: "MIGRATE",
  },
  {
    title: "Cloud apps",
    detail: "Confirm multipart, lifecycle, policy, and event behavior for each workload.",
    meta: "TEST",
  },
];

const reasonIcons = [ShieldCheckIcon, NetworkIcon, Code2Icon, GaugeIcon];

export default function HomeStats() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-background py-20 text-foreground sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="03"
          eyebrow="Why RustFS"
          title="Why teams evaluate RustFS"
          description="A focused open-source alternative for teams comparing S3 behavior, infrastructure control, and long-term operating freedom."
        />
        <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-12">
          <article className="overflow-hidden bg-card/45 lg:col-span-5">
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
                ARCH.CORE
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <code className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                {reasons[0].token}
              </code>
              <h3 className="mt-8 text-2xl font-semibold text-foreground">
                {reasons[0].title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {reasons[0].description}
              </p>
              <div className="mt-8 border-l border-brand/35 pl-4">
                <pre className="overflow-x-auto text-xs leading-6 text-muted-foreground">
                  <code>{`[rustfs]
runtime = "memory-safe"
license = "apache-2.0"
mode = "public-beta"`}</code>
                </pre>
              </div>
            </div>
          </article>

          <div className="flex overflow-hidden bg-card/40 lg:col-span-7">
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
                      className="grid min-h-0 gap-4 px-5 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                    >
                      <span className="motion-icon-tile flex size-11 items-center justify-center text-brand">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                      <code className="w-fit text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {item.token}
                      </code>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <article className="grid overflow-hidden bg-card/40 lg:col-span-12 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative min-h-72 overflow-hidden border-b border-border bg-background lg:border-b-0 lg:border-r">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle,var(--brand)_1px,transparent_1.5px)] [background-size:18px_18px]"
              />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <code className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
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
                  className="grid min-h-28 gap-4 px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8"
                >
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="inline-flex items-center gap-3">
                    <code className="w-fit text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {item.meta}
                    </code>
                    <ArrowRightIcon className="size-4 text-brand" aria-hidden="true" />
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
