import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import worker, {
  DOCKER_COMPOSE_UPSTREAM,
  PERMANENT_REDIRECTS,
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

test("permanently redirects locale, duplicate contact, and legacy replication URLs", async () => {
  const env = assetsEnv(() => {
    throw new Error("redirects must not fall through to assets");
  });
  const cases = [
    ["https://rustfs.com/en", "https://rustfs.com/"],
    ["https://rustfs.com/en/", "https://rustfs.com/"],
    ["https://rustfs.com/zh", "https://rustfs.com.cn/"],
    ["https://rustfs.com/zh/", "https://rustfs.com.cn/"],
    ["https://rustfs.com/contact", "https://rustfs.com/contact-us/"],
    ["https://rustfs.com/contact/", "https://rustfs.com/contact-us/"],
    ["https://www.rustfs.com/contact/", "https://www.rustfs.com/contact-us/"],
    ["https://rustfs.com/product/site-replication", "https://rustfs.com/product/replication/"],
    ["https://rustfs.com/product/site-replication/", "https://rustfs.com/product/replication/"],
    ["https://www.rustfs.com/product/site-replication/", "https://www.rustfs.com/product/replication/"],
  ] as const;

  for (const [requestUrl, location] of cases) {
    const response = await worker.fetch(new Request(requestUrl), env);
    assert.equal(response.status, 301, requestUrl);
    assert.equal(response.headers.get("Location"), location, requestUrl);
  }
});

test("keeps worker redirects aligned with public/_redirects", () => {
  const redirectsPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../public/_redirects",
  );
  const rules = new Map<string, { target: string; status: string }>();

  for (const line of fs.readFileSync(redirectsPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const [source, target, status] = trimmed.split(/\s+/);
    if (source && target && status && source in PERMANENT_REDIRECTS) {
      rules.set(source, { target, status });
    }
  }

  for (const [source, target] of Object.entries(PERMANENT_REDIRECTS)) {
    const rule = rules.get(source);
    assert.ok(rule, `missing _redirects rule for ${source}`);
    assert.equal(rule.target, target);
    assert.equal(rule.status, "301");
  }
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
