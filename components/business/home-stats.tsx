'use client'

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
    description: "Distributed architecture with horizontal and vertical scaling.",
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
    description: "Fully S3-compatible for seamless integration and migration.",
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

export default function HomeStats() {
  return (
    <section
      className="relative overflow-hidden border-y border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="03"
          eyebrow="Why RustFS"
          title="A storage core built for production pressure"
          description="A focused object storage foundation for modern AI, cloud-native, and enterprise workloads."
        />
        <div className="grid gap-4 lg:grid-cols-12">
          <article className="motion-card border border-border bg-card p-6 sm:p-8 lg:col-span-5">
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
          </article>

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:col-span-7">
            {reasons.slice(1, 5).map((item) => (
              <article key={item.title} className="motion-card bg-card p-6">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <code className="border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {item.token}
                  </code>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>

          <article className="motion-card grid border border-border bg-card lg:col-span-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <code className="border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {reasons[5].token}
              </code>
              <h3 className="mt-8 text-2xl font-semibold text-foreground">
                {reasons[5].title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {reasons[5].description}
              </p>
            </div>
            <div className="grid divide-y divide-border">
              {compatibilityRows.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
                >
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                  <code className="w-fit border border-border bg-background px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {item.meta}
                  </code>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
