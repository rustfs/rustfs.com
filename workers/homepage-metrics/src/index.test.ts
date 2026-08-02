import assert from "node:assert/strict";
import test from "node:test";
import type { HomepageMetrics } from "../../../lib/homepage-metrics.ts";
import { loadOrRefreshHomepageMetrics, mergeHomepageMetrics } from "./index.ts";

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
