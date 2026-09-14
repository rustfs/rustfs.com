const FETCH_TIMEOUT_MS = 10_000;
const FETCH_ATTEMPTS = 3;

export const DOCKER_COMPOSE_PATH = "/docker-compose.yml";
export const DOCKER_COMPOSE_UPSTREAM =
  "https://raw.githubusercontent.com/rustfs/rustfs/main/docker-compose.yml";

const RESPONSE_HEADERS = {
  "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
  "Content-Disposition": 'inline; filename="docker-compose.yml"',
  "Content-Type": "text/yaml; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

export interface SiteEnv {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

type FetchImpl = (
  input: string,
  init?: RequestInit,
) => Promise<Response>;

async function fetchUpstream(
  method: "GET" | "HEAD",
  fetchImpl: FetchImpl,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetchImpl(DOCKER_COMPOSE_UPSTREAM, {
        method,
        headers: {
          Accept: "text/yaml, text/plain;q=0.9, */*;q=0.8",
          "User-Agent": "rustfs.com-docker-compose-proxy",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (response.ok) {
        return response;
      }

      await response.body?.cancel();
      lastError = new Error(`Upstream returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Upstream request failed");
}

export async function proxyDockerCompose(
  request: Request,
  fetchImpl: FetchImpl = (input, init) => globalThis.fetch(input, init),
): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed\n", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  try {
    const upstream = await fetchUpstream(request.method, fetchImpl);
    const headers = new Headers(RESPONSE_HEADERS);
    const etag = upstream.headers.get("ETag");
    const lastModified = upstream.headers.get("Last-Modified");

    if (etag) {
      headers.set("ETag", etag);
    }
    if (lastModified) {
      headers.set("Last-Modified", lastModified);
    }

    if (request.method === "HEAD") {
      await upstream.body?.cancel();
      return new Response(null, { status: 200, headers });
    }

    return new Response(upstream.body, { status: 200, headers });
  } catch (error) {
    console.error(JSON.stringify({
      event: "docker_compose_proxy_failed",
      error: error instanceof Error ? error.message : String(error),
    }));

    return new Response("Failed to fetch docker-compose.yml\n", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

const worker = {
  async fetch(request: Request, env: SiteEnv): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === DOCKER_COMPOSE_PATH) {
      return proxyDockerCompose(request);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
