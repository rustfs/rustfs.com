import { BoxesIcon, DatabaseIcon, NetworkIcon } from "lucide-react";
import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import { integrationCategories } from "@/data/integrations";
import IntegrationCatalog from "./integration-catalog";

export const metadata: Metadata = {
  title: "RustFS Integration Directory | AI, DevOps, Security, Big Data, Reverse Proxy",
  description: "Explore RustFS integration documentation by category, including AI, DevOps, Backup, Security, Big Data, and Reverse Proxy workflows.",
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
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "RustFS Integration Directory",
    description: "Category-based integration documentation for RustFS-compatible workflows.",
    url: `${SITE_CONFIG.primaryDomain}/integration/`,
    siteName: "RustFS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RustFS Integration Directory",
    description: "Browse integration documentation by category with hash-shareable tabs.",
  },
};

const integrationSignals = [
  { label: "Protocol", value: "S3 API" },
  { label: "Categories", value: String(integrationCategories.length) },
  {
    label: "Guides",
    value: String(integrationCategories.reduce((total, category) => total + category.projects.length, 0)),
  },
];

export default function IntegrationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RustFS Integration Directory",
    description: "Category-based integration documentation for RustFS-compatible workflows.",
    url: `${SITE_CONFIG.primaryDomain}/integration/`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: integrationCategories.flatMap((category, categoryIndex) =>
        category.projects.map((project, projectIndex) => ({
          "@type": "ListItem",
          position: categoryIndex * 100 + projectIndex + 1,
          name: `${category.label}: ${project.name}`,
          url: project.docsUrl,
        })),
      ),
    },
  };

  return (
    <main className="relative z-10 flex-1 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Integration ecosystem
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-6xl">
              Connect RustFS to the tools you already run.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              Build on one S3-compatible storage foundation across AI, DevOps, backup, security, analytics, and cloud-native infrastructure.
            </p>

            <dl className="mt-9 grid grid-cols-3 border-y border-border">
              {integrationSignals.map((signal, index) => (
                <div
                  key={signal.label}
                  className={`py-4 ${index > 0 ? "border-l border-border pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}
                >
                  <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {signal.label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-foreground sm:text-base">{signal.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden border border-border bg-card p-5 sm:p-7" aria-hidden="true">
            <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative flex h-full min-h-[24rem] flex-col justify-between border border-border bg-background/90 p-5">
              <div className="flex items-center justify-between font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>Ecosystem map</span>
                <span className="flex items-center gap-2 text-brand"><span className="size-1.5 bg-brand" /> compatible</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
                <div className="grid gap-2">
                  {["AI / ML", "DevOps", "Backup"].map((label) => (
                    <span key={label} className="border border-border bg-card px-3 py-3 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col items-center">
                  <span className="h-px w-5 bg-border sm:w-8" />
                  <div className="grid size-20 shrink-0 place-items-center border border-brand bg-brand/10 text-brand sm:size-24">
                    <DatabaseIcon className="size-5" />
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">RustFS</span>
                  </div>
                  <span className="h-px w-5 bg-border sm:w-8" />
                </div>

                <div className="grid gap-2">
                  {["Security", "Big data", "Proxy"].map((label) => (
                    <span key={label} className="border border-border bg-card px-3 py-3 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-border font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <span className="flex items-center justify-center gap-2 bg-card px-2 py-3"><NetworkIcon className="size-3 text-brand" /> connect</span>
                <span className="flex items-center justify-center gap-2 bg-card px-2 py-3"><DatabaseIcon className="size-3 text-brand" /> store</span>
                <span className="flex items-center justify-center gap-2 bg-card px-2 py-3"><BoxesIcon className="size-3 text-brand" /> scale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 lg:mb-12">
            <div className="mb-7 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 shrink-0 bg-brand" aria-hidden="true" />
              <span className="shrink-0">Integration directory</span>
              <span className="h-px min-w-8 flex-1 bg-border" aria-hidden="true" />
            </div>
            <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-foreground md:text-5xl">
              Find your integration path.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Browse implementation guides by workload. Each path opens the most relevant RustFS or upstream documentation.
            </p>
          </div>

          <IntegrationCatalog categories={integrationCategories} />

          <section className="mt-4 grid border border-border bg-card lg:grid-cols-[0.7fr_1.3fr]" aria-label="Trademark notice">
            <div className="border-b border-border p-5 lg:border-r lg:border-b-0 sm:p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">Compatibility first</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-foreground">
                One S3-compatible layer for the infrastructure around your data.
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Trademark notice</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Third-party project names describe technical compatibility only. Their trademarks, names, brands, and external documentation remain the property and responsibility of their respective owners. No endorsement, partnership, or affiliation is implied unless separately stated in writing.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
