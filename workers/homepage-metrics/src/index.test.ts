import assert from "node:assert/strict";
import test from "node:test";
import type { HomepageMetrics } from "../../../lib/homepage-metrics.ts";
import { mergeHomepageMetrics } from "./index.ts";

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
