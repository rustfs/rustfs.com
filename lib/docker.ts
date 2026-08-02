/**
 * Get Docker Hub pull count for rustfs/rustfs repository
 * This function is called at build time on the server side
 * @returns Promise<number> Docker pull count or fallback value
 */
const DOCKER_FETCH_TIMEOUT_MS = 10_000;
const DOCKER_PULLS_FALLBACK = 7_166_727;

export async function getDockerPulls(): Promise<number> {
  const injectedPullsValue = process.env.HOMEPAGE_DOCKER_PULLS;
  if (injectedPullsValue !== undefined) {
    const injectedPulls = Number(injectedPullsValue);
    if (Number.isInteger(injectedPulls) && injectedPulls > 0) {
      return injectedPulls;
    }

    throw new Error('Invalid injected Docker Hub homepage metrics');
  }

  const endpoints = [
    'https://hub.docker.com/v2/repositories/rustfs/rustfs/',
    'https://hub.docker.com/v2/namespaces/rustfs/repositories/rustfs',
  ];

  for (const endpoint of endpoints) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DOCKER_FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
        },
        signal: controller.signal,
        // Cache for 1 hour
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const json = await response.json() as { pull_count?: number };
        if (typeof json.pull_count === 'number' && Number.isFinite(json.pull_count)) {
          return json.pull_count;
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`Timed out fetching Docker pulls from ${endpoint}`);
      } else {
        console.warn(`Failed to fetch Docker pulls from ${endpoint}:`, error);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return DOCKER_PULLS_FALLBACK;
}
