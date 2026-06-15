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
      { label: "Global Instances", token: "nodes", text: "1M+" },
      { label: "Repo Commits", token: "commits", value: metrics.commits },
      { label: "Docker Pulls", token: "pulls", value: dockerPulls },
    ],
    [metrics, dockerPulls],
  );

  return (
    <section className={cn("text-muted-foreground", className)}>
      <div className="grid gap-y-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, token, value, text }, index) => (
          <div
            key={label}
            className="lg:border-r lg:border-border lg:px-6 lg:first:pl-0 lg:last:border-r-0"
          >
            <div className="mb-4 flex items-center gap-3">
              <code className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {token}
              </code>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                / {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="font-extrabold text-3xl text-foreground sm:text-4xl">
              {typeof value === "number" ? (
                <NumberTicker
                  value={value}
                  className="text-foreground"
                />
              ) : (
                <span>{text}</span>
              )}
            </h2>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
