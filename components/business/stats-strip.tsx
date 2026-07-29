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
      { label: "GitHub Stars", value: metrics.stars },
      { label: "Global Instances", text: "1500000+" },
      { label: "Repo Commits", value: metrics.commits },
      { label: "Docker Pulls", value: dockerPulls },
    ],
    [metrics, dockerPulls],
  );

  return (
    <section className={cn("text-muted-foreground", className)}>
      <dl className="grid overflow-hidden border-y border-border bg-card/20 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, value, text }) => (
          <div
            key={label}
            className="flex min-h-24 flex-col justify-end border-b border-border/80 p-4 last:border-b-0 sm:[&:nth-child(n+3)]:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-5"
          >
            <dt className="order-2 mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </dt>
            <dd className="order-1 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
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
