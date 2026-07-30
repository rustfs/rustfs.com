/**
 * Get Docker Hub pull count for rustfs/rustfs repository
 * This function is called at build time on the server side
 * @returns Promise<number> Docker pull count or fallback value
 */
export async function getDockerPulls(): Promise<number> {
  const endpoints = [
    'https://hub.docker.com/v2/namespaces/rustfs/repositories/rustfs',
    'https://hub.docker.com/v2/repositories/rustfs/rustfs/',
  ];

  for (const endpoint of endpoints) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

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
        if (typeof json.pull_count === 'number') {
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

  return 6371731;
}
