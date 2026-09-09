import assert from "node:assert/strict";
import test from "node:test";
import type { HomepageMetrics } from "../../../lib/homepage-metrics.ts";
import worker, { assertDockerMetricsFresh, DOCKER_CACHE_KEY, loadOrRefreshHomepageMetrics, mergeHomepageMetrics, mergeStoredDockerMetrics, refreshHomepageMetrics } from "./index.ts";

const current: HomepageMetrics = {
  schemaVersion: 1,
  github: {
    stars: 100,
    forks: 20,
    commits: 300,
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  docker: {
    pulls: 400,
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
};

const refreshedAt = "2026-08-02T09:00:00.000Z";

test("refreshes sources independently", () => {
  const result = mergeHomepageMetrics(
    current,
    { status: "fulfilled", value: { stars: 110, forks: 22, commits: 330 } },
    { status: "rejected", reason: new Error("unavailable") },
    refreshedAt,
  );

  assert.deepEqual(result.metrics.github, {
    stars: 110,
    forks: 22,
    commits: 330,
    updatedAt: refreshedAt,
  });
  assert.deepEqual(result.metrics.docker, current.docker);
  assert.equal(result.githubRefreshed, true);
  assert.equal(result.dockerRefreshed, false);
});

test("retains the last successful values when all upstreams fail", () => {
  const result = mergeHomepageMetrics(
    current,
    { status: "rejected", reason: new Error("unavailable") },
    { status: "rejected", reason: new Error("unavailable") },
    refreshedAt,
  );

  assert.deepEqual(result.metrics, current);
  assert.equal(result.githubRefreshed, false);
  assert.equal(result.dockerRefreshed, false);
});

test("updates Docker without overwriting failed GitHub values", () => {
  const result = mergeHomepageMetrics(
    current,
    { status: "rejected", reason: new Error("unavailable") },
    { status: "fulfilled", value: { pulls: 440 } },
    refreshedAt,
  );

  assert.deepEqual(result.metrics.github, current.github);
  assert.deepEqual(result.metrics.docker, {
    pulls: 440,
    updatedAt: refreshedAt,
  });
  assert.equal(result.githubRefreshed, false);
  assert.equal(result.dockerRefreshed, true);
});

test("returns valid cached metrics without refreshing", async () => {
  let refreshCalls = 0;
  const result = await loadOrRefreshHomepageMetrics(
    async () => current,
    async () => {
      refreshCalls += 1;
      return {
        metrics: { ...current, schemaVersion: 1 },
        githubRefreshed: true,
        dockerRefreshed: true,
      };
    },
  );

  assert.deepEqual(result, current);
  assert.equal(refreshCalls, 0);
});

test("refreshes metrics when the cache is empty", async () => {
  let refreshCalls = 0;
  const refreshed = {
    ...current,
    github: { ...current.github, stars: 120, updatedAt: refreshedAt },
  } satisfies HomepageMetrics;
  const result = await loadOrRefreshHomepageMetrics(
    async () => null,
    async () => {
      refreshCalls += 1;
      return {
        metrics: refreshed,
        githubRefreshed: true,
        dockerRefreshed: false,
      };
    },
  );

  assert.deepEqual(result, refreshed);
  assert.equal(refreshCalls, 1);
});

test("overlays independently collected Docker data without changing its collection time", () => {
  const docker = { pulls: 10041572, updatedAt: refreshedAt };
  const result = mergeStoredDockerMetrics(current, docker);
  assert.deepEqual(result.github, current.github);
  assert.deepEqual(result.docker, docker);
  for (const invalid of [null, { pulls: 0, updatedAt: refreshedAt }, { pulls: 500, updatedAt: "invalid" },
    { pulls: 500, updatedAt: "2026-07-01T00:00:00Z" }, { pulls: 500, updatedAt: "2099-01-01T00:00:00Z" }]) {
    assert.deepEqual(mergeStoredDockerMetrics(current, invalid), current);
  }
});

test("reports data older than 24 hours as a failure", () => {
  const collected = Date.parse(current.docker.updatedAt);
  assert.doesNotThrow(() => assertDockerMetricsFresh(current, collected + 24 * 3600_000));
  assert.throws(() => assertDockerMetricsFresh(current, collected + 24 * 3600_000 + 1), /stale/);
});

test("GitHub refresh never fetches Docker or writes its independently owned key", async (t) => {
  const docker = { pulls: 10041572, updatedAt: new Date().toISOString() };
  const writes: string[] = [];
  const env = {
    HOMEPAGE_METRICS: {
      get: async (key: string) => key === DOCKER_CACHE_KEY ? docker : current,
      put: async (key: string) => { writes.push(key); },
    },
  } as Env;
  t.mock.method(globalThis, "fetch", async (url: string) => {
    assert.ok(url.startsWith("https://api.github.com/"));
    return url.includes("/commits?")
      ? new Response("[]", { headers: { Link: '<https://api.github.com/repos/rustfs/rustfs/commits?per_page=1&page=6563>; rel="last"' } })
      : Response.json({ stargazers_count: 31863, forks_count: 1427 });
  });
  const result = await refreshHomepageMetrics(env);
  assert.deepEqual(result.metrics.docker, docker);
  assert.equal(result.metrics.github.stars, 31863);
  assert.deepEqual(writes, ["homepage-metrics:v1"]);
});

test("HTTP responses overlay the Docker key even while the aggregate has an old snapshot", async () => {
  const docker = { pulls: 10041572, updatedAt: new Date().toISOString() };
  const env = {
    HOMEPAGE_METRICS: { get: async (key: string) => key === DOCKER_CACHE_KEY ? docker : current },
  } as Env;
  const response = await worker.fetch(new Request("https://rustfs.com/api/homepage-metrics"), env);
  const metrics = await response.json() as HomepageMetrics;
  assert.deepEqual(metrics.docker, docker);
  assert.deepEqual(metrics.github, current.github);
});
