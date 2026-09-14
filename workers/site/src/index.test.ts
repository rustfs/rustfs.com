import assert from "node:assert/strict";
import test from "node:test";
import worker, {
  DOCKER_COMPOSE_UPSTREAM,
  proxyDockerCompose,
  type SiteEnv,
} from "./index.ts";

const composeBody = "services:\n  rustfs:\n    image: rustfs/rustfs:latest\n";

function assetsEnv(handler: (request: Request) => Promise<Response> | Response): SiteEnv {
  return {
    ASSETS: {
      fetch: async (request) => handler(request),
    },
  };
}

test("proxies GET docker-compose.yml from rustfs/rustfs and keeps the filename", async () => {
  const response = await proxyDockerCompose(
    new Request("https://rustfs.com/docker-compose.yml"),
    async (input, init) => {
      assert.equal(input, DOCKER_COMPOSE_UPSTREAM);
      assert.equal(init?.method, "GET");
      assert.equal(
        (init?.headers as Record<string, string>)["User-Agent"],
        "rustfs.com-docker-compose-proxy",
      );
      return new Response(composeBody, {
        status: 200,
        headers: { ETag: '"abc"', "Content-Type": "text/plain" },
      });
    },
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), composeBody);
  assert.equal(response.headers.get("Content-Type"), "text/yaml; charset=utf-8");
  assert.equal(
    response.headers.get("Content-Disposition"),
    'inline; filename="docker-compose.yml"',
  );
  assert.equal(response.headers.get("ETag"), '"abc"');
});

test("supports HEAD for curl -I without a body", async () => {
  const response = await proxyDockerCompose(
    new Request("https://rustfs.com/docker-compose.yml", { method: "HEAD" }),
    async (_input, init) => {
      assert.equal(init?.method, "HEAD");
      return new Response(composeBody, { status: 200 });
    },
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "");
  assert.equal(
    response.headers.get("Content-Disposition"),
    'inline; filename="docker-compose.yml"',
  );
});

test("rejects non-GET methods", async () => {
  const response = await proxyDockerCompose(
    new Request("https://rustfs.com/docker-compose.yml", { method: "POST" }),
    async () => {
      throw new Error("must not fetch upstream");
    },
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET, HEAD");
});

test("returns 502 when upstream is unavailable", async () => {
  const response = await proxyDockerCompose(
    new Request("https://rustfs.com/docker-compose.yml"),
    async () => new Response("missing", { status: 404 }),
  );

  assert.equal(response.status, 502);
  assert.match(await response.text(), /Failed to fetch docker-compose.yml/);
});

test("does not forward visitor cookies to GitHub", async () => {
  const response = await proxyDockerCompose(
    new Request("https://rustfs.com/docker-compose.yml", {
      headers: { Cookie: "session=secret" },
    }),
    async (_input, init) => {
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("Cookie"), null);
      return new Response(composeBody, { status: 200 });
    },
  );

  assert.equal(response.status, 200);
});

test("routes only /docker-compose.yml through the proxy", async () => {
  const originalFetch = globalThis.fetch;
  let proxied = false;
  globalThis.fetch = (async () => {
    proxied = true;
    return new Response(composeBody, { status: 200 });
  }) as typeof fetch;

  try {
    const env = assetsEnv(async (request) => new Response(`asset:${new URL(request.url).pathname}`));
    const compose = await worker.fetch(new Request("https://rustfs.com/docker-compose.yml"), env);
    const other = await worker.fetch(new Request("https://rustfs.com/install_rustfs.sh"), env);

    assert.equal(proxied, true);
    assert.equal(await compose.text(), composeBody);
    assert.equal(await other.text(), "asset:/install_rustfs.sh");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
