'use client'

import { NumberTicker } from "@/components/ui/number-ticker";
import type { GitHubMetrics } from "@/lib/github";
import { HOMEPAGE_METRICS_API_PATH, isHomepageMetrics } from "@/lib/homepage-metrics";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

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
  const [currentMetrics, setCurrentMetrics] = useState(metrics);
  const [currentDockerPulls, setCurrentDockerPulls] = useState(dockerPulls);

  useEffect(() => {
    const controller = new AbortController();

    async function refreshMetrics() {
      try {
        const response = await fetch(HOMEPAGE_METRICS_API_PATH, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }

        const refreshedMetrics: unknown = await response.json();
        if (isHomepageMetrics(refreshedMetrics)) {
          setCurrentMetrics(refreshedMetrics.github);
          setCurrentDockerPulls(refreshedMetrics.docker.pulls);
        }
      } catch {
        // Keep the build-time fallback when the runtime cache is unavailable.
      }
    }

    void refreshMetrics();
    return () => controller.abort();
  }, []);

  const items = useMemo(
    () => [
      { label: "GitHub Stars", value: currentMetrics.stars },
      { label: "Global Instances", text: "2,700,000+" },
      { label: "Repo Commits", value: currentMetrics.commits },
      { label: "Docker Pulls", value: currentDockerPulls },
    ],
    [currentMetrics, currentDockerPulls],
  );

  return (
    <section className={cn("text-muted-foreground", className)}>
      <dl className="grid grid-cols-2 overflow-hidden border-y border-border bg-card/20 lg:grid-cols-4">
        {items.map(({ label, value, text }) => (
          <div
            key={label}
            className="flex min-h-24 flex-col justify-end border-b border-border/80 px-3 py-4 [&:nth-child(n+3)]:border-b-0 [&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-5"
          >
            <dt className="order-2 mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </dt>
            <dd className="order-1 text-[clamp(1.25rem,5.5vw,2rem)] font-semibold tabular-nums tracking-[-0.035em] text-foreground sm:text-4xl">
              {typeof value === "number" ? (
                <NumberTicker
                  value={value}
                  className="tracking-[-0.035em] text-foreground"
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
