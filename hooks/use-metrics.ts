'use client';

import type { GitHubMetrics } from '@/lib/github';
import { useCallback, useEffect, useState } from 'react';

const FALLBACK_METRICS: GitHubMetrics = {
  stars: 30000,
  forks: 1300,
  commits: 2000,
};

const FALLBACK_DOCKER_PULLS = 6371731;

async function fetchGitHubMetrics(): Promise<GitHubMetrics> {
  const [repoRes, commitsRes] = await Promise.all([
    fetch('https://api.github.com/repos/rustfs/rustfs', {
      headers: { Accept: 'application/vnd.github+json' },
    }),
    fetch('https://api.github.com/repos/rustfs/rustfs/commits?per_page=1', {
      headers: { Accept: 'application/vnd.github+json' },
    }),
  ]);

  if (!repoRes.ok || !commitsRes.ok) {
    return FALLBACK_METRICS;
  }

  const repo = (await repoRes.json()) as {
    stargazers_count?: number;
    forks_count?: number;
  };
  const link = commitsRes.headers.get('link');
  let commits = 0;

  const match = link?.match(/page=(\d+)>; rel="last"/);
  if (match?.[1]) {
    commits = Number(match[1]);
  } else {
    const data = await commitsRes.json();
    commits = Array.isArray(data) ? data.length : 0;
  }

  return {
    stars: repo.stargazers_count ?? FALLBACK_METRICS.stars,
    forks: repo.forks_count ?? FALLBACK_METRICS.forks,
    commits:
      Number.isFinite(commits) && commits > 0
        ? commits
        : FALLBACK_METRICS.commits,
  };
}

async function fetchDockerPulls(): Promise<number> {
  try {
    const res = await fetch(
      'https://hub.docker.com/v2/repositories/rustfs/rustfs/',
    );
    if (res.ok) {
      const json = (await res.json()) as { pull_count?: number };
      return json.pull_count ?? FALLBACK_DOCKER_PULLS;
    }
  } catch {
    // ignore
  }
  return FALLBACK_DOCKER_PULLS;
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<GitHubMetrics>(FALLBACK_METRICS);
  const [dockerPulls, setDockerPulls] = useState(FALLBACK_DOCKER_PULLS);

  const load = useCallback(async () => {
    const [gh, dp] = await Promise.all([
      fetchGitHubMetrics(),
      fetchDockerPulls(),
    ]);
    setMetrics(gh);
    setDockerPulls(dp);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { metrics, dockerPulls };
}
