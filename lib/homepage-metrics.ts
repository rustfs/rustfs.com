export const HOMEPAGE_METRICS_API_PATH = "/api/homepage-metrics";

export interface HomepageMetrics {
  schemaVersion: 1;
  github: {
    stars: number;
    forks: number;
    commits: number;
    updatedAt: string;
  };
  docker: {
    pulls: number;
    updatedAt: string;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && !Number.isNaN(Date.parse(value));
}

export function isHomepageMetrics(value: unknown): value is HomepageMetrics {
  if (!isRecord(value) || value.schemaVersion !== 1) {
    return false;
  }

  const github = value.github;
  const docker = value.docker;

  return (
    isRecord(github) &&
    isPositiveInteger(github.stars) &&
    isPositiveInteger(github.forks) &&
    isPositiveInteger(github.commits) &&
    isTimestamp(github.updatedAt) &&
    isRecord(docker) &&
    isPositiveInteger(docker.pulls) &&
    isTimestamp(docker.updatedAt)
  );
}
