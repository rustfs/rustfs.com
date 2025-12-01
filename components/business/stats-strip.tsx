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
      { label: "GitHub Forks", value: metrics.forks },
      { label: "Repo Commits", value: metrics.commits },
      { label: "Docker Pulls", value: dockerPulls },
    ],
    [metrics, dockerPulls],
  );

  return (
    <section className={cn("text-gray-600 dark:text-gray-300 body-font", className)}>
      <div className="container px-5 py-12 lg:py-16 xl:py-20 mx-auto">
        <div className="flex flex-wrap -m-4 text-left">
          {items.map(({ label, value }) => (
            <div key={label} className="px-4 sm:w-1/4 w-1/2 pl-6 border-l mt-4 xl:mt-0">
              <h2 className="title-font font-extrabold sm:text-4xl text-2xl text-gray-900 dark:text-gray-50">
                <NumberTicker
                  value={value}
                  className="text-gray-900 dark:text-gray-50"
                />
              </h2>
              <p className="mt-4 text-base text-muted-foreground font-bold text-left uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
