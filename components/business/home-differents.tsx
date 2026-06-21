'use client'

import { CheckIcon, XIcon } from "lucide-react";
import HomeSectionHeader from "./home-section-header";

const comparisonRows = [
  {
    other: "Memory safety depends on runtime and implementation discipline",
    rustfs: "Memory-safe Rust development",
  },
  {
    other: "Telemetry and logging may leave local control boundaries",
    rustfs: "Self-hosted control with no foreign logging",
  },
  {
    other: "License terms can restrict commercial redistribution",
    rustfs: "Business-friendly Apache 2.0 license",
  },
  {
    other: "S3 behavior can differ across products and gateways",
    rustfs: "Full S3 support for existing cloud ecosystems",
  },
  {
    other: "Platform coverage often depends on separate editions",
    rustfs: "Broad multi-architecture support",
  },
  {
    other: "Pricing and support can drift as storage grows",
    rustfs: "Predictable open-source foundation and support path",
  },
];

export default function HomeDifferents() {
  return (
    <section className="relative border-t border-border bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="04"
          eyebrow="Competitive profile"
          title="RustFS vs. legacy object storage"
          description="Choose RustFS when memory safety, S3 compatibility, open licensing, and predictable operations matter more than vendor lock-in."
        />

        <div className="border border-border bg-card">
          <div className="grid border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:grid-cols-2">
            <div className="border-b border-border px-5 py-3 lg:border-b-0 lg:border-r">
              Other object storage
            </div>
            <div className="px-5 py-3 text-brand">
              RustFS
            </div>
          </div>

          <div className="divide-y divide-border">
            {comparisonRows.map((row, index) => (
              <div key={row.rustfs} className="grid lg:grid-cols-2">
                <div className="grid grid-cols-[3.5rem_1fr] border-b border-border text-muted-foreground lg:border-b-0 lg:border-r">
                  <span className="flex items-center justify-center border-r border-border">
                    <XIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="px-5 py-5 text-sm leading-6">{row.other}</span>
                </div>
                <div className="grid grid-cols-[3.5rem_1fr] text-foreground">
                  <span className="flex items-center justify-center border-r border-border text-brand">
                    <CheckIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="px-5 py-5 text-sm font-medium leading-6">
                    <span className="mr-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      WIN.{String(index + 1).padStart(2, "0")}
                    </span>
                    {row.rustfs}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
