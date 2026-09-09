import { readFile } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";

const expected = JSON.parse(await readFile(process.argv[2], "utf8"));
// KV reads can remain cached for 300 seconds. Query parameters also avoid an old HTTP cache entry.
for (let attempt = 0; attempt < 14; attempt += 1) {
  try {
    const response = await fetch(`https://rustfs.com/api/homepage-metrics?verify=${Date.now()}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`Homepage metrics HTTP ${response.status}`);
    const metrics = await response.json();
    if (Number.isSafeInteger(metrics.docker?.pulls) && metrics.docker.pulls > 0 &&
        Date.parse(metrics.docker.updatedAt) >= Date.parse(expected.updatedAt)) {
      console.log(`Verified homepage Docker pulls: ${metrics.docker.pulls}, updated ${metrics.docker.updatedAt}`);
      process.exit(0);
    }
  } catch (error) {
    console.error(error.message);
  }
  if (attempt < 13) await setTimeout(30_000);
}
throw new Error("Homepage did not publish the freshly collected Docker metrics within the KV propagation window");
