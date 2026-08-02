import {
  HOMEPAGE_METRICS_API_PATH,
  type HomepageMetrics,
  isHomepageMetrics,
} from "../../../lib/homepage-metrics.ts";
import fallbackMetricsJson from "../../../public/homepage-metrics.json" with { type: "json" };

const CACHE_KEY = "homepage-metrics:v1";
const FETCH_TIMEOUT_MS = 10_000;
const FETCH_ATTEMPTS = 3;
const RESPONSE_HEADERS = {
  "Access-Control-Allow-Origin": "https://rustfs.com",
  "Cache-Control": "public, max-age=300, stale-while-revalidate=43200",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

if (!isHomepageMetrics(fallbackMetricsJson)) {
  throw new Error("Invalid bundled homepage metrics fallback");
}

const fallbackMetrics: HomepageMetrics = fallbackMetricsJson;

interface GitHubApiMetrics {
  stars: number;
  forks: number;
  commits: number;
}

interface DockerApiMetrics {
  pulls: number;
}

interface RefreshResult {
  metrics: HomepageMetrics;
  githubRefreshed: boolean;
  dockerRefreshed: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readPositiveInteger(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new Error(`Invalid ${key} value`);
  }

  return value;
}

async function fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (response.ok) {
        return response;
      }

      await response.body?.cancel();
      lastError = new Error(`Upstream returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Upstream request failed");
}

async function fetchGitHubMetrics(): Promise<GitHubApiMetrics> {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "RustFS-Homepage-Metrics",
  };
  const [repositoryResponse, commitsResponse] = await Promise.all([
    fetchWithRetry("https://api.github.com/repos/rustfs/rustfs", { headers }),
    fetchWithRetry("https://api.github.com/repos/rustfs/rustfs/commits?per_page=1", { headers }),
  ]);

  const repository = await repositoryResponse.json<unknown>();
  if (!isRecord(repository)) {
    throw new Error("Invalid GitHub repository response");
  }

  const lastPage = commitsResponse.headers
    .get("Link")
    ?.match(/[?&]page=(\d+)>; rel="last"/)?.[1];
  await commitsResponse.body?.cancel();
  const commits = Number(lastPage);
  if (!Number.isInteger(commits) || commits <= 0) {
    throw new Error("Invalid GitHub commit count");
  }

  return {
    stars: readPositiveInteger(repository, "stargazers_count"),
    forks: readPositiveInteger(repository, "forks_count"),
    commits,
  };
}

async function fetchDockerMetrics(): Promise<DockerApiMetrics> {
  const endpoints = [
    "https://hub.docker.com/v2/repositories/rustfs/rustfs/",
    "https://hub.docker.com/v2/namespaces/rustfs/repositories/rustfs",
  ];
  let lastError: unknown;

  for (const endpoint of endpoints) {
    try {
      const response = await fetchWithRetry(endpoint, {
        headers: { "User-Agent": "RustFS-Homepage-Metrics" },
      });
      const repository = await response.json<unknown>();
      if (!isRecord(repository)) {
        throw new Error("Invalid Docker Hub response");
      }

      return { pulls: readPositiveInteger(repository, "pull_count") };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Docker Hub request failed");
}

export function mergeHomepageMetrics(
  current: HomepageMetrics,
  githubResult: PromiseSettledResult<GitHubApiMetrics>,
  dockerResult: PromiseSettledResult<DockerApiMetrics>,
  refreshedAt: string,
): RefreshResult {
  const githubRefreshed = githubResult.status === "fulfilled";
  const dockerRefreshed = dockerResult.status === "fulfilled";

  return {
    metrics: {
      schemaVersion: 1,
      github: githubRefreshed
        ? { ...githubResult.value, updatedAt: refreshedAt }
        : current.github,
      docker: dockerRefreshed
        ? { ...dockerResult.value, updatedAt: refreshedAt }
        : current.docker,
    },
    githubRefreshed,
    dockerRefreshed,
  };
}

async function readCachedMetrics(env: Env): Promise<HomepageMetrics> {
  const cached = await readStoredMetrics(env);
  return isHomepageMetrics(cached) ? cached : fallbackMetrics;
}

async function readStoredMetrics(env: Env): Promise<unknown> {
  return env.HOMEPAGE_METRICS.get<unknown>(CACHE_KEY, {
    type: "json",
    cacheTtl: 300,
  });
}

export async function loadOrRefreshHomepageMetrics(
  read: () => Promise<unknown>,
  refresh: () => Promise<RefreshResult>,
): Promise<HomepageMetrics> {
  const cached = await read();
  return isHomepageMetrics(cached) ? cached : (await refresh()).metrics;
}

export async function refreshHomepageMetrics(env: Env): Promise<RefreshResult> {
  const current = await readCachedMetrics(env);
  const [githubResult, dockerResult] = await Promise.allSettled([
    fetchGitHubMetrics(),
    fetchDockerMetrics(),
  ]);
  const result = mergeHomepageMetrics(
    current,
    githubResult,
    dockerResult,
    new Date().toISOString(),
  );

  if (result.githubRefreshed || result.dockerRefreshed) {
    await env.HOMEPAGE_METRICS.put(CACHE_KEY, JSON.stringify(result.metrics));
  }

  console.log(JSON.stringify({
    event: "homepage_metrics_refresh",
    github: result.githubRefreshed ? "refreshed" : "retained",
    docker: result.dockerRefreshed ? "refreshed" : "retained",
    githubError: githubResult.status === "rejected" ? String(githubResult.reason) : undefined,
    dockerError: dockerResult.status === "rejected" ? String(dockerResult.reason) : undefined,
  }));

  return result;
}

function metricsResponse(metrics: HomepageMetrics, method: string): Response {
  return new Response(method === "HEAD" ? null : JSON.stringify(metrics), {
    headers: RESPONSE_HEADERS,
  });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== HOMEPAGE_METRICS_API_PATH) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers: { Allow: "GET, HEAD" } },
      );
    }

    try {
      const metrics = await loadOrRefreshHomepageMetrics(
        () => readStoredMetrics(env),
        () => refreshHomepageMetrics(env),
      );
      return metricsResponse(metrics, request.method);
    } catch (error) {
      console.error(JSON.stringify({
        event: "homepage_metrics_read_failed",
        error: error instanceof Error ? error.message : String(error),
      }));
      return metricsResponse(fallbackMetrics, request.method);
    }
  },

  scheduled(_controller, env, ctx): void {
    ctx.waitUntil(refreshHomepageMetrics(env));
  },
} satisfies ExportedHandler<Env>;
