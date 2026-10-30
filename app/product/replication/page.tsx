import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import Link from "next/link";

import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";

const title = "S3 Bucket & Site Replication | RustFS";
const description =
  "Replicate S3 object data across RustFS sites or selected buckets. Plan recovery with versioned copies, prefix and tag filters, and multi-target rules.";
const heroDescription =
  "Build remote copies of S3-compatible object data to support disaster recovery and business continuity. Link independent RustFS sites or replicate selected bucket data. Plan DNS, traffic routing, and application failover separately.";

export const metadata: Metadata = {
  alternates: { canonical: "product/replication/" },
  title,
  description,
  keywords: [
    "RustFS",
    "replication",
    "site replication",
    "bucket replication",
    "multi-site object storage",
    "S3-compatible",
    "disaster recovery",
    "business continuity",
    "async replication",
    "sync replication",
    "rc",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "RustFS",
    locale: "en_US",
    url: "/product/replication/",
    images: [
      {
        url: `${SITE_CONFIG.primaryDomain}${SITE_CONFIG.ogImagePath}`,
        width: 1200,
        height: 630,
        alt: "RustFS — High-Performance S3 Object Storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rustfs",
    creator: "@rustfs",
    title,
    description,
  },
};

const sections: FeaturePageSection[] = [
  {
    id: "bucket-replication",
    title: "Bucket Replication",
    description:
      "Directional bucket replication copies objects from a versioned source bucket to one or more versioned targets. Filter by prefix or tags and use separate rules to keep selected datasets aligned without linking every site.",
    items: [
      {
        title: "Sync and async modes",
        description:
          "Synchronous mode waits for a replication attempt before returning; asynchronous mode transfers objects in the background. Monitor replication status and failures: source write success alone does not guarantee a completed remote copy.",
        href: "https://docs.rustfs.com/en/administration/data/bucket/replication",
      },
      {
        title: "Flexible rules",
        description:
          "Limit replication with prefix and tag filters. Objects that match no enabled rule stay local. Existing-object replication and delete propagation are configured separately; verify backfill completion before relying on a destination for recovery.",
        href: "https://docs.rustfs.com/en/administration/data/bucket/replication",
      },
      {
        title: "Multi-target",
        description:
          "Configure multiple destinations with separate filters and replication modes. S3-compatible targets require enabled versioning, suitable permissions, and compatible replication operations. Validate each destination before production use.",
        href: "https://docs.rustfs.com/en/administration/data/bucket/replication",
      },
    ],
  },
  {
    id: "site-replication",
    title: "Site Replication",
    description:
      "Site replication links independent RustFS deployments so buckets, object versions, delete markers, and supported IAM data stay aligned across sites. It is broader than a single bucket rule and remains asynchronous.",
    items: [
      {
        title: "Bidirectional sync between sites",
        description:
          "Participating sites exchange replicated state so applications can write at more than one location while object versions and supported identity data stay aligned.",
        href: "https://docs.rustfs.com/en/operations/high-availability/site-replication",
      },
      {
        title: "Multi-site configuration",
        description:
          "Configure multiple remote sites in one site-replication relationship. Each site needs a stable S3 API endpoint, reachability, and bucket versioning.",
        href: "https://docs.rustfs.com/en/operations/high-availability/site-replication",
      },
      {
        title: "Convenient ops",
        description: (
          <>
            Set up and manage site replication from the Web Console or the{" "}
            <Link
              href="/download/cli"
              className="font-medium text-foreground underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              rc CLI
            </Link>
            . Keep administration credentials on a secured host.
          </>
        ),
      },
    ],
  },
];

export default function ReplicationPage() {
  return (
    <FeaturePage
      title="Object Storage Replication"
      description={heroDescription}
      sections={sections}
      variant="replication"
      highlightsTitle="Why replication"
      highlights={[
        {
          title: "Reduce single-site failure exposure",
          description:
            "Maintain another copy of object data in an independent location, reducing reliance on a single site when infrastructure or a location becomes unavailable.",
        },
        {
          title: "Prepare for recovery and business continuity",
          description:
            "Build a secondary dataset for recovery workflows. Validate replication completeness and rehearse application and traffic cutover against your recovery objectives.",
        },
        {
          title: "Protect the datasets that matter",
          description:
            "Replicate selected prefixes and object tags to prioritize critical data and control cross-site transfer and storage costs.",
        },
      ]}
      links={[
        { label: "Talk to us", href: "/contact-us/" },
        { label: "Download", href: "/download", variant: "outline" },
      ]}
    />
  );
}
