import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";

const title = "Replication | RustFS";
const description =
  "Align S3-compatible object data across sites and copy selected buckets with sync or async replication. Choose RPO with bucket rules, or keep multi-site deployments in sync—plan DNS, traffic routing, and app failover separately.";

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
    "RPO",
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
      "Directional bucket replication copies objects from a versioned source bucket to one or more versioned targets. Filter by prefix or tags, pick sync or async for your RPO, and keep selective datasets aligned without linking every site.",
    items: [
      {
        title: "Sync and async modes",
        description:
          "Sync waits for the remote write before the source call returns. Async returns after local success and replicates in the background. Choose the mode that matches the RPO you can accept.",
        href: "https://docs.rustfs.com/en/administration/data/bucket/replication",
      },
      {
        title: "Flexible rules",
        description:
          "Limit bucket replication with prefix and tag filters so only matching objects leave the source. Objects that match no enabled rule stay local.",
        href: "https://docs.rustfs.com/en/administration/data/bucket/replication",
      },
      {
        title: "Multi-target",
        description:
          "One source bucket can configure multiple remote sites or S3-compatible targets. Use separate rules when you need different filters or sync modes per destination.",
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
        description:
          "Set up and manage site replication from the Web Console or the rc CLI. Keep administration credentials on a secured host.",
        href: "/download/cli",
      },
      {
        title: "Status monitoring",
        description:
          "Inspect site replication status for operational insight across buckets, IAM resources, and related metrics. Confirm the objects and identities you expect on every site.",
        href: "https://docs.rustfs.com/en/operations/high-availability/site-replication",
      },
    ],
  },
];

export default function ReplicationPage() {
  return (
    <FeaturePage
      title="Replication"
      description={description}
      sections={sections}
      variant="replication"
      highlightsTitle="Why replication"
      highlights={[
        {
          title: "Cross-site data durability foundation",
          description:
            "Keep S3-compatible object data aligned across independent RustFS sites as a foundation for multi-site durability—not a full DR cutover by itself.",
        },
        {
          title: "Selective bucket copies with RPO choice",
          description:
            "Replicate whole buckets or filtered prefixes and tags. Use sync or async bucket replication to match the RPO your workload needs.",
        },
        {
          title: "Operate with Console, CLI, and status insight",
          description:
            "Configure replication in the Web Console or with rc, then monitor status so operators can see how site and bucket replication are progressing.",
        },
      ]}
      links={[
        { label: "Talk to us", href: "/contact-us/" },
        { label: "Download", href: "/download", variant: "outline" },
      ]}
    />
  );
}
