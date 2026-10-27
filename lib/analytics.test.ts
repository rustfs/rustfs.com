import assert from "node:assert/strict";
import test from "node:test";

import { ANALYTICS_EVENTS, isDemoHref, trackAnalyticsEvent } from "./analytics.ts";

test("demo, download, and contact events stay distinct", () => {
  const names = Object.values(ANALYTICS_EVENTS);
  assert.equal(new Set(names).size, names.length);
  assert.deepEqual(names, [
    "demo_cta_click",
    "live_demo_open",
    "download_click",
    "contact_form_submit_success",
  ]);
});

test("treats the public demo page as the demo CTA destination", () => {
  assert.equal(isDemoHref("/demo"), true);
  assert.equal(isDemoHref("/demo/"), true);
  assert.equal(isDemoHref("/contact-us"), false);
  assert.equal(isDemoHref("/contact-us/"), false);
  assert.equal(isDemoHref("https://play.rustfs.com"), false);
});

test("does not throw when gtag is unavailable", () => {
  assert.doesNotThrow(() => {
    trackAnalyticsEvent(ANALYTICS_EVENTS.contactFormSubmitSuccess, { form_id: "contact" });
  });
});
