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

  const items = useMemo(() => {
    const positiveCount = (value: number) =>
      Number.isInteger(value) && value > 0 ? value : undefined;
    const stars = positiveCount(currentMetrics.stars);
    const commits = positiveCount(currentMetrics.commits);
    const pulls = positiveCount(currentDockerPulls);
    const stats: Array<{ label: string; value?: number; text?: string }> = [];

    if (stars !== undefined) {
      stats.push({ label: "GitHub Stars", value: stars });
    }
    stats.push({ label: "Deployments", text: "4,200,000+" });
    if (commits !== undefined) {
      stats.push({ label: "Repo Commits", value: commits });
    }
    if (pulls !== undefined) {
      stats.push({ label: "Docker Pulls", value: pulls });
    }

    return stats;
  }, [currentMetrics, currentDockerPulls]);

  return (
    <section className={cn("text-muted-foreground", className)}>
      <dl className="grid grid-cols-2 overflow-hidden border-y border-border bg-card/20 lg:grid-cols-4">
        {items.map(({ label, value, text }) => (
          <div
            key={label}
            className="flex min-h-24 flex-col justify-end border-b border-border/80 px-3 py-4 [&:nth-child(n+3)]:border-b-0 [&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-5"
          >
            <dt className="type-label-sm order-2 mt-3 text-muted-foreground">
              {label}
            </dt>
            <dd className="type-headline-sm order-1 text-foreground tabular-nums sm:type-headline-md lg:type-headline-lg">
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
