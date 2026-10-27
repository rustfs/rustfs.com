import assert from "node:assert/strict";
import test from "node:test";

import { BLOG_INDEX_H1, BLOG_INDEX_OVERVIEW, getTagListing, toTagSlug } from "./blog-tags.ts";

test("editorial tag pages use a heading and overview distinct from the blog index", () => {
  for (const label of ["AI", "Release", "Security", "Integration"]) {
    const listing = getTagListing(label, 2);
    assert.equal(listing.indexable, true);
    assert.notEqual(listing.h1, BLOG_INDEX_H1);
    assert.notEqual(listing.overview, BLOG_INDEX_OVERVIEW);
  }

  assert.equal(getTagListing("AI", 2).h1, "AI storage notes");
  assert.equal(getTagListing("Release", 4).h1, "RustFS release notes");
});

test("leaves thin tags and the RustFS catch-all unindexed", () => {
  assert.equal(getTagListing("Cloud Native", 1).indexable, false);
  assert.equal(getTagListing("Linux", 1).indexable, false);
  assert.equal(getTagListing("RustFS", 10).indexable, false);
  assert.equal(getTagListing("General Usage", 2).indexable, true);
  assert.notEqual(getTagListing("Linux", 1).h1, BLOG_INDEX_H1);
});

test("slugs tag labels the same way as the tag routes", () => {
  assert.equal(toTagSlug("Cloud Native"), "cloud-native");
  assert.equal(toTagSlug("Best Practices"), "best-practices");
  assert.equal(toTagSlug("AI"), "ai");
});
