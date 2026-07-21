'use client'

import { NumberTicker } from "@/components/ui/number-ticker";
import type { GitHubMetrics } from "@/lib/github";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface StatsStripProps {
  className?: string;
  metrics: GitHubMetrics;
  dockerPulls: number;
}

export default function StatsStrip({
  className,
  metrics,
  dockerPulls,
}: StatsStripProps) {
  const items = useMemo(
    () => [
      { label: "GitHub Stars", token: "stars", value: metrics.stars },
      { label: "Docker Pulls", token: "pulls", value: dockerPulls },
      { label: "S3 Coverage", token: "overview", text: "Published" },
      { label: "Release Channel", token: "maturity", text: "Beta" },
    ],
    [metrics, dockerPulls],
  );

  return (
    <section className={cn("text-muted-foreground", className)}>
      <dl className="grid overflow-hidden border-y border-border bg-card/20 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, token, value, text }, index) => (
          <div
            key={label}
            className="grid min-h-28 content-between border-b border-border/80 p-4 last:border-b-0 sm:[&:nth-child(n+3)]:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-5"
          >
            <div className="order-1 flex items-center justify-between gap-3">
              <code className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {token}
              </code>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                / {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <dt className="order-3 mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </dt>
            <dd className="order-2 mt-6 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
              {typeof value === "number" ? (
                <NumberTicker
                  value={value}
                  className="text-foreground"
                />
              ) : (
                <span>{text}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
