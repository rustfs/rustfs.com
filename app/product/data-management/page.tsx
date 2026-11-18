import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "product/data-management/" },
  title: "Data Management & S3 Tables | RustFS High-Performance Storage",
  description:
    "Manage buckets, lifecycle rules, and S3 Tables on RustFS. On-demand migration pulls missing objects from an external source when they are read or backfilled. S3 API compatibility covers common object-storage workflows. See the S3 protocol docs before depending on advanced S3 behavior.",
  keywords: [
    "RustFS",
    "data management",
    "object storage",
    "S3 compatibility",
    "on-demand migration",
    "S3 Tables",
    "Apache Iceberg",
    "bucket quota",
    "multipart upload",
    "lakehouse storage",
  ],
};

const sections: FeaturePageSection[] = [
  {
    id: "on-demand-migration",
    title: "On-demand migration",
    items: [
      {
        title: "Multi-provider support",
        description:
          "Connect a source on AWS S3, Cloudflare R2, MinIO, Google Cloud Storage, Azure Blob Storage, or another S3-compatible system.",
      },
      {
        title: "Prefix-based selection",
        description:
          "Set a prefix so only matching objects are migrated. With no prefix, the configured source namespace is included.",
      },
      {
        title: "Parallel migration",
        description: "Multiple buckets can be migrated at the same time, which speeds up the transfer.",
      },
    ],
    footnote:
      "Amazon S3 is a trademark of Amazon.com, Inc. or its affiliates. Cloudflare and R2 are trademarks of Cloudflare, Inc. Google Cloud Storage is a trademark of Google LLC. Azure is a trademark of Microsoft Corporation. MinIO is a registered trademark of MinIO, Inc. RustFS is not affiliated with, endorsed by, or sponsored by those companies.",
  },
  {
    title: "S3",
    items: [
      {
        title: "Bucket & Object",
        description: "Stable, efficient bucket and object management.",
      },
      {
        title: "Lifecycle Management",
        description: "Lower storage costs and reduce operational overhead.",
      },
      {
        title: "Multipart Upload",
        description: "Speed up large-object transfers and raise network utilization.",
      },
    ],
  },
  {
    id: "s3-tables",
    title: "S3 Tables",
    items: [
      {
        title: "Automated Small File Management",
        description: "Automatic backend merges and snapshots that simplify operations and reduce cost.",
      },
      {
        title: "Performance Acceleration",
        description: "A dedicated metadata layer lowers query latency and speeds up analytics.",
      },
      {
        title: "Native Iceberg Support",
        description: "Native connections to leading big data and AI ecosystems.",
      },
    ],
  },
];

export default function DataManagementPage() {
  return (
    <FeaturePage
      title="Data Management"
      description="Lifecycle management for bucket quotas, Object Lock, and versioning. Native S3 compatibility helps you migrate from any S3-compatible system to RustFS. On-demand migration pulls missing objects from an external source when they are read or backfilled."
      sections={sections}
      variant="data"
      highlightsTitle="Resilience & Durability"
      highlights={[
        {
          title: "S3 compatibility",
          description: "Native S3 protocol support for efficient object management.",
        },
        {
          title: "Unified management",
          description: "S3 Tables keep structured and unstructured data in one object store.",
        },
        {
          title: "Cost efficiency",
          description: "Fine-grained lifecycle policies reduce enterprise storage costs.",
        },
      ]}
      links={[
        { label: "Plan data workflows", href: "/contact-us/" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
