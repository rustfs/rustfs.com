'use client'

import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type Metrics = {
  stars: number;
  forks: number;
  commits: number;
  dockerPulls: number;
  fetchedAt?: string;
};

const defaultMetrics: Metrics = {
  stars: 0,
  forks: 0,
  commits: 0,
  dockerPulls: 0,
};

// Fallback values when API fails
const fallbackMetrics: Metrics = {
  stars: 11000, // 11k
  forks: 500,   // 500+
  commits: 2000, // 2k+
  dockerPulls: 157000, // 157k+
};

export default function StatsStrip({
  className,
  dockerPulls: initialDockerPulls
}: {
  className?: string;
  dockerPulls?: number;
}) {
  const [metrics, setMetrics] = useState<Metrics>(() => ({
    ...defaultMetrics,
    dockerPulls: initialDockerPulls ?? fallbackMetrics.dockerPulls,
  }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    const key = 'rustfs.metrics.v1';
    const ttl = 1000 * 60 * 60; // 1 hour

    async function fetchRepo() {
      const res = await fetch('https://api.github.com/repos/rustfs/rustfs');
      if (!res.ok) throw new Error('repo failed');
      const json = await res.json();
      return {
        stars: json.stargazers_count ?? 0,
        forks: json.forks_count ?? 0,
      } as Partial<Metrics>;
    }

    async function fetchCommits() {
      const res = await fetch('https://api.github.com/repos/rustfs/rustfs/commits?per_page=1');
      if (!res.ok) throw new Error('commits failed');
      const link = res.headers.get('link');
      const match = link?.match(/page=(\d+)>; rel="last"/);
      if (match?.[1]) return Number(match[1]);
      const data = await res.json();
      return Array.isArray(data) ? data.length : 0;
    }

    async function load() {
      try {
        const cached = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
        let cachedMetrics: Metrics | null = null;

        if (cached) {
          const parsed = JSON.parse(cached) as { metrics: Metrics; ts: number };
          if (Date.now() - parsed.ts < ttl) {
            cachedMetrics = parsed.metrics;
            setMetrics(parsed.metrics);
            setLoading(false);
            // Continue to fetch fresh data in background
          }
        }

        const [repo, commits] = await Promise.all([
          fetchRepo().catch((err) => {
            console.error('Failed to fetch repo:', err);
            return cachedMetrics ? { stars: cachedMetrics.stars, forks: cachedMetrics.forks } as Partial<Metrics> : null;
          }),
          fetchCommits().catch((err) => {
            console.error('Failed to fetch commits:', err);
            return cachedMetrics?.commits ?? null;
          }),
        ]);

        const merged: Metrics = {
          stars: repo?.stars ?? fallbackMetrics.stars,
          forks: repo?.forks ?? fallbackMetrics.forks,
          commits: commits ?? fallbackMetrics.commits,
          dockerPulls: initialDockerPulls ?? cachedMetrics?.dockerPulls ?? fallbackMetrics.dockerPulls,
          fetchedAt: new Date().toISOString(),
        };

        if (!canceled) {
          setMetrics(merged);
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify({ metrics: merged, ts: Date.now() }));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();
    return () => { canceled = true; };
  }, [initialDockerPulls]);

  const items = useMemo(() => ([
    { label: 'GitHub Stars', value: metrics.stars },
    { label: 'GitHub Forks', value: metrics.forks },
    { label: 'Repo Commits', value: metrics.commits },
    { label: 'Docker Pulls', value: metrics.dockerPulls },
  ]), [metrics]);

  return (
    <section className={cn("text-gray-600 dark:text-gray-300 body-font", className)}>
      <div className="container px-5 py-12 lg:py-16 xl:py-20 mx-auto">
        <div className="flex flex-wrap -m-4 text-left">
          {items.map(({ label, value }) => (
            <div key={label} className="px-4 sm:w-1/4 w-1/2 pl-6 border-l mt-4 xl:mt-0">
              <h2 className="title-font font-extrabold sm:text-4xl text-3xl text-gray-900 dark:text-gray-50">
                {loading ? (
                  '—'
                ) : (
                  <NumberTicker
                    value={value}
                    className="text-gray-900 dark:text-gray-50"
                  />
                )}
              </h2>
              <p className="mt-4 text-base text-muted-foreground font-bold text-left uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
