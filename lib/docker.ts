/**
 * Get Docker Hub pull count for rustfs/rustfs repository
 * This function is called at build time on the server side
 * @returns Promise<number> Docker pull count or fallback value
 */
import homepageMetrics from "@/public/homepage-metrics.json";

const DOCKER_PULLS_FALLBACK = homepageMetrics.docker.pulls;

export async function getDockerPulls(): Promise<number> {
  const injectedPullsValue = process.env.HOMEPAGE_DOCKER_PULLS;
  if (injectedPullsValue !== undefined) {
    const injectedPulls = Number(injectedPullsValue);
    if (Number.isInteger(injectedPulls) && injectedPulls > 0) {
      return injectedPulls;
    }

    throw new Error('Invalid injected Docker Hub homepage metrics');
  }

  return DOCKER_PULLS_FALLBACK;
}
