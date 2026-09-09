import assert from "node:assert/strict";
import test from "node:test";
import { fetchDockerMetrics, retryDelay } from "./fetch-docker-metrics.mjs";

test("honors Retry-After before accepting fresh Docker data", async () => {
  const waits = [];
  let calls = 0;
  const result = await fetchDockerMetrics({
    fetchImpl: async () => ++calls === 1
      ? new Response("limited", { status: 429, headers: { "Retry-After": "17" } })
      : Response.json({ pull_count: 10041572 }),
    wait: async (delay) => waits.push(delay),
    now: () => Date.parse("2026-09-09T09:00:00Z"),
  });
  assert.deepEqual(waits, [17000]);
  assert.deepEqual(result, { pulls: 10041572, updatedAt: "2026-09-09T09:00:00.000Z" });
});

test("backs off and fails when Docker stays limited", async () => {
  const waits = [];
  await assert.rejects(fetchDockerMetrics({
    fetchImpl: async () => new Response(null, { status: 429 }),
    wait: async (delay) => waits.push(delay),
  }), /HTTP 429/);
  assert.deepEqual(waits, [2000, 4000, 8000]);
});

test("does not retry before a long Retry-After, or retry permanent HTTP errors", async () => {
  for (const [status, retryAfter] of [[429, "600"], [403, "1"]]) {
    let calls = 0;
    await assert.rejects(fetchDockerMetrics({
      fetchImpl: async () => { calls++; return new Response(null, { status, headers: { "Retry-After": retryAfter } }); },
      wait: async () => assert.fail("Must not retry"),
    }), new RegExp(`HTTP ${status}`));
    assert.equal(calls, 1);
  }
});

test("rejects malformed counts instead of publishing false data", async () => {
  for (const count of [0, -1, "100", null, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    await assert.rejects(fetchDockerMetrics({ fetchImpl: async () => Response.json({ pull_count: count }) }), /invalid pull_count/);
  }
});

test("understands HTTP dates and falls back to exponential backoff", () => {
  const now = Date.parse("2026-09-09T09:00:00Z");
  assert.equal(retryDelay("Wed, 09 Sep 2026 09:00:30 GMT", 1, now), 30000);
  assert.equal(retryDelay("invalid", 3, now), 8000);
});
