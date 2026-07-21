'use client'

import { ArrowRightIcon } from "lucide-react";
import HomeSectionHeader from "./home-section-header";

const comparisonRows = [
  {
    lens: "License",
    question: "Can the software remain an open, business-friendly foundation?",
    rustfs: "Apache 2.0 licensed",
  },
  {
    lens: "S3 coverage",
    question: "Can teams inspect behavior instead of relying on a blanket compatibility claim?",
    rustfs: "Published coverage overview plus workload tests",
  },
  {
    lens: "Architecture",
    question: "Does the control plane require a distinct metadata server?",
    rustfs: "Decentralized peer-to-peer design",
  },
  {
    lens: "Migration",
    question: "Can an existing S3 or MinIO estate be evaluated incrementally?",
    rustfs: "Client-first validation and migration guides",
  },
  {
    lens: "Operations",
    question: "Can teams run the software on infrastructure they control?",
    rustfs: "Self-hosted binaries, containers, and Kubernetes paths",
  },
  {
    lens: "Maturity",
    question: "Is the current product status visible before adoption?",
    rustfs: "Public beta with feature-level status",
  },
];

export default function HomeDifferents() {
  return (
    <section className="relative border-t border-border bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="04"
          eyebrow="Evaluation lens"
          title="Make the storage decision with evidence"
          description="The useful comparison is not a generic feature checklist. It is whether RustFS fits your API surface, topology, operating model, and risk tolerance today."
        />

        <div className="border border-border bg-card/40">
          <div className="grid border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:grid-cols-2">
            <div className="border-b border-border px-5 py-3 lg:border-b-0 lg:border-r">
              Question to validate
            </div>
            <div className="px-5 py-3 text-brand">
              RustFS
            </div>
          </div>

          <div className="divide-y divide-border">
            {comparisonRows.map((row, index) => (
              <div key={row.rustfs} className="grid lg:grid-cols-2">
                <div className="grid border-b border-border px-5 py-4 text-muted-foreground lg:grid-cols-[7rem_1fr] lg:border-b-0 lg:border-r">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">{row.lens}</span>
                  <span className="mt-2 text-sm leading-6 lg:mt-0">{row.question}</span>
                </div>
                <div className="grid grid-cols-[3rem_1fr] text-foreground">
                  <span className="flex items-center justify-center border-r border-border text-brand">
                    <ArrowRightIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="px-5 py-4 text-sm font-medium leading-6">
                    <span className="mr-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      NOW.{String(index + 1).padStart(2, "0")}
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
