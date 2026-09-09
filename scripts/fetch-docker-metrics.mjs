import { writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const ENDPOINT = "https://hub.docker.com/v2/namespaces/rustfs/repositories/rustfs";
const ATTEMPTS = 4;
const MAX_RETRY_DELAY_MS = 120_000;

export function retryDelay(retryAfter, attempt, now = Date.now()) {
  if (retryAfter !== null) {
    const seconds = Number(retryAfter);
    const delay = retryAfter.trim() !== "" && Number.isFinite(seconds)
      ? seconds * 1000
      : Date.parse(retryAfter) - now;
    if (Number.isFinite(delay) && delay >= 0) return delay;
  }
  return 2000 * 2 ** (attempt - 1);
}

export async function fetchDockerMetrics({ fetchImpl = fetch, wait = sleep, now = Date.now } = {}) {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    let response;
    try {
      response = await fetchImpl(ENDPOINT, {
        headers: { Accept: "application/json", "User-Agent": "RustFS-Homepage-Metrics" },
        signal: AbortSignal.timeout(15_000),
      });
    } catch (error) {
      if (attempt === ATTEMPTS) throw error;
      await wait(retryDelay(null, attempt, now()));
      continue;
    }

    if (response.ok) {
      const repository = await response.json();
      if (!Number.isSafeInteger(repository?.pull_count) || repository.pull_count <= 0) {
        throw new Error("Docker Hub returned an invalid pull_count; stored data was not changed");
      }
      return { pulls: repository.pull_count, updatedAt: new Date(now()).toISOString() };
    }

    const delay = retryDelay(response.headers.get("Retry-After"), attempt, now());
    await response.body?.cancel();
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === ATTEMPTS || delay > MAX_RETRY_DELAY_MS) {
      throw new Error(`Docker Hub HTTP ${response.status}; stored data was not changed`);
    }
    console.error(`Docker Hub HTTP ${response.status}; retrying after ${delay} ms`);
    await wait(delay);
  }
  throw new Error("Docker Hub collection failed");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const metrics = await fetchDockerMetrics();
  if (!process.argv[2]) throw new Error("Usage: node scripts/fetch-docker-metrics.mjs OUTPUT_JSON");
  await writeFile(process.argv[2], JSON.stringify(metrics) + "\n");
  console.log(`Collected ${metrics.pulls} Docker pulls at ${metrics.updatedAt}`);
}
