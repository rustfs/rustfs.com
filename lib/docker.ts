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
    try {
      const response = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
        },
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
      console.warn(`Failed to fetch Docker pulls from ${endpoint}:`, error);
    }
  }

  return 6371731
}
