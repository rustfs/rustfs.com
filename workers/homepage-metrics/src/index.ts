import {
  HOMEPAGE_METRICS_API_PATH,
  type HomepageMetrics,
  isHomepageMetrics,
} from "../../../lib/homepage-metrics.ts";
import fallbackMetricsJson from "../../../public/homepage-metrics.json" with { type: "json" };

const CACHE_KEY = "homepage-metrics:v1";
export const DOCKER_CACHE_KEY = "docker-metrics:v1";
const MAX_DOCKER_AGE_MS = 24 * 60 * 60 * 1000;
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
  if (isHomepageMetrics(cached)) return cached;
  const docker = await env.HOMEPAGE_METRICS.get<unknown>(DOCKER_CACHE_KEY, { type: "json", cacheTtl: 300 });
  return mergeStoredDockerMetrics(fallbackMetrics, docker);
}

export function mergeStoredDockerMetrics(
  current: HomepageMetrics,
  docker: unknown,
): HomepageMetrics {
  const candidate = { ...current, docker };
  if (!isHomepageMetrics(candidate)) return current;
  if (Date.parse(candidate.docker.updatedAt) < Date.parse(current.docker.updatedAt)) return current;
  if (Date.parse(candidate.docker.updatedAt) > Date.now() + 60_000) return current;
  return candidate;
}

export function assertDockerMetricsFresh(metrics: HomepageMetrics, now = Date.now()): void {
  if (now - Date.parse(metrics.docker.updatedAt) > MAX_DOCKER_AGE_MS) {
    throw new Error(`Docker metrics are stale: last successful collection ${metrics.docker.updatedAt}`);
  }
}

async function readStoredMetrics(env: Env): Promise<unknown> {
  const [cached, docker] = await Promise.all([
    env.HOMEPAGE_METRICS.get<unknown>(CACHE_KEY, { type: "json", cacheTtl: 300 }),
    env.HOMEPAGE_METRICS.get<unknown>(DOCKER_CACHE_KEY, { type: "json", cacheTtl: 300 }),
  ]);
  // The collector owns the Docker key. Cron only writes the original aggregate key.
  // Overlay on every read so a concurrent GitHub refresh cannot hide a Docker update.
  if (isHomepageMetrics(cached)) return mergeStoredDockerMetrics(cached, docker);
  return cached;
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
  const [githubResult] = await Promise.allSettled([fetchGitHubMetrics()]);
  const result = mergeHomepageMetrics(
    current,
    githubResult,
    { status: "rejected", reason: "Docker is collected by GitHub Actions" },
    new Date().toISOString(),
  );

  if (result.githubRefreshed || result.dockerRefreshed) {
    await env.HOMEPAGE_METRICS.put(CACHE_KEY, JSON.stringify(result.metrics));
  }

  console.log(JSON.stringify({
    event: "homepage_metrics_refresh",
    github: result.githubRefreshed ? "refreshed" : "retained",
    docker: "external_collector",
    dockerUpdatedAt: result.metrics.docker.updatedAt,
    githubError: githubResult.status === "rejected" ? String(githubResult.reason) : undefined,
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
    ctx.waitUntil(refreshHomepageMetrics(env).then((result) => {
      // Reject the scheduled invocation after preserving successful GitHub values.
      // Stale Docker data must be visible as a failure, not silently reported as success.
      assertDockerMetricsFresh(result.metrics);
    }));
  },
} satisfies ExportedHandler<Env>;
