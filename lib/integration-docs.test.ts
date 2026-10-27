import assert from "node:assert/strict";
import test from "node:test";

import { integrationCategories } from "../data/integrations.ts";
import {
  INTEGRATION_DOC_SOURCE_LABEL,
  integrationDocSource,
  integrationLinkText,
} from "./integration-docs.ts";

test("classifies RustFS docs, site write-ups, and upstream manuals separately", () => {
  assert.equal(
    integrationDocSource("https://docs.rustfs.com/en/developer/integration/observability/loki"),
    "rustfs-guide",
  );
  assert.equal(integrationDocSource("/blog/gitlab-rustfs-integration"), "site-guide");
  assert.equal(integrationDocSource("https://docs.gitlab.com/administration/object_storage/"), "upstream-docs");
  assert.equal(INTEGRATION_DOC_SOURCE_LABEL["upstream-docs"], "Upstream docs");
});

test("builds task and tool anchor text", () => {
  assert.equal(
    integrationLinkText({
      name: "Loki",
      docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/loki",
      linkText: "Configure Grafana Loki with RustFS",
    }),
    "Configure Grafana Loki with RustFS",
  );
  assert.equal(
    integrationLinkText({
      name: "Restic",
      docsUrl: "https://docs.rustfs.com/en/developer/integration/backup/restic",
    }),
    "Configure Restic with RustFS",
  );
  assert.equal(
    integrationLinkText({
      name: "Example",
      docsUrl: "https://example.com/docs",
    }),
    "Read the Example docs",
  );
});

test("catalog anchors are specific and Loki names Grafana", () => {
  const projects = integrationCategories.flatMap((category) => category.projects);
  const loki = projects.find((project) => project.name === "Loki");
  assert.ok(loki);
  assert.equal(integrationLinkText(loki), "Configure Grafana Loki with RustFS");
  assert.equal(integrationDocSource(loki.docsUrl), "rustfs-guide");

  for (const project of projects) {
    const text = integrationLinkText(project);
    assert.notEqual(text.toLowerCase(), "read more");
    assert.match(text, new RegExp(project.name.split(" ")[0] ?? project.name, "i"));
  }
});
