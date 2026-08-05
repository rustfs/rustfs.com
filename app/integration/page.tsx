import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import { integrationCategories } from "@/data/integrations";
import IntegrationCatalog from "./integration-catalog";

export const metadata: Metadata = {
  title: "RustFS Integrations | AI, DevOps, Security, Big Data and Proxy Docs",
  description: "Explore verified RustFS integration guides across AI, DevOps, Backup, Security, Big Data, and Reverse Proxy workflows.",
  keywords: [
    "RustFS integrations",
    "RustFS AI integration",
    "RustFS GitLab integration",
    "RustFS reverse proxy",
    "RustFS Keycloak OIDC",
    "RustFS Iceberg integration",
    "RustFS Milvus integration",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.primaryDomain}/integration/`,
  },
  openGraph: {
    title: "RustFS Integrations",
    description: "Integration docs and compatibility references for RustFS ecosystem workflows.",
    url: `${SITE_CONFIG.primaryDomain}/integration/`,
    siteName: "RustFS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RustFS Integrations",
    description: "Browse RustFS integration docs by category with tab-based navigation.",
  },
};

export default function IntegrationPage() {
  return (
    <main className="relative flex-1">
      <section className="relative overflow-hidden border-y border-border py-16 text-foreground sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:34px_34px]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 bg-[#0062FF]/16 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-20 h-80 w-80 bg-[#0062FF]/12 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1 w-24 bg-brand" />
            <span>Integration cases</span>
          </div>

          <h1 className="max-w-5xl font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            RustFS ecosystem integrations.
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">
            Connect RustFS with DevOps pipelines, AI platforms, cloud-native systems, and analytics engines through
            standard S3-compatible workflows.
          </p>

          <IntegrationCatalog categories={integrationCategories} />

          <section className="mt-6 border border-border bg-card/70 p-4 sm:p-5" aria-label="Trademark notice">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Trademark notice</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              All third-party project names are referenced only to describe technical compatibility and integration scenarios.
              Third-party trademarks, names, and brands are the property of their respective owners. RustFS does not imply
              endorsement, partnership, or affiliation unless explicitly stated in separate written agreements.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}