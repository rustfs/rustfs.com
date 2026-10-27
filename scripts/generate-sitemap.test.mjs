import assert from "node:assert/strict";
import test from "node:test";

import { htmlHasNoindex } from "./generate-sitemap.js";

test("detects a robots noindex meta tag", () => {
  const html = '<html><head><meta name="robots" content="noindex, follow"/></head></html>';
  assert.equal(htmlHasNoindex(html), true);
});

test("ignores indexable pages and non-robots copy", () => {
  const html = '<html><head><meta name="robots" content="index, follow"/></head><body>noindex</body></html>';
  assert.equal(htmlHasNoindex(html), false);
});

test("detects googlebot noindex when the content attribute comes first", () => {
  const html = '<meta content="noindex, follow" name="googlebot" />';
  assert.equal(htmlHasNoindex(html), true);
});
