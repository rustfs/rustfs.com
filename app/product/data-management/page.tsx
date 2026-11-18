import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";
import Link from "next/link";

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
  {
    id: "on-demand-migration",
    title: "On-demand migration",
    description: (
      <>
        RustFS pulls objects from a configured external source only when they are read or backfilled, and stores them locally. New PUT and DELETE operations in RustFS are not synchronized to the source, and later source changes do not update local copies. Steps are in the{" "}
        <Link
          href="https://docs.rustfs.com/en/administration/data/bucket/on-demand-migration"
          className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
          target="_blank"
          rel="noreferrer"
        >
          on-demand migration guide
        </Link>
        .
      </>
    ),
    image: {
      src: "/images/product/on-demand-migration-console.png",
      alt: "Sample RustFS Console view of On-demand migration. Configuration shows a Cloudflare R2 source with a placeholder endpoint. Runtime status and the completed background backfill show the counts from that documented run.",
      width: 1920,
      height: 1113,
      label: "Sample Console view",
      caption:
        "Sample data. The endpoint is a placeholder, and the counters are one documented run, not a capacity claim.",
    },
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
        title: "Progress tracking",
        description:
          "Watch migration progress in the Console while it runs. Live counters show migrated data, migrated objects, and in-flight pulls. A backfill shows how many objects were listed, pulled, skipped, and failed. It does not show a completion percentage while the source scan is still running.",
      },
    ],
    footnote:
      "Amazon S3 is a trademark of Amazon.com, Inc. or its affiliates. Cloudflare and R2 are trademarks of Cloudflare, Inc. Google Cloud Storage is a trademark of Google LLC. Azure is a trademark of Microsoft Corporation. MinIO is a registered trademark of MinIO, Inc. RustFS is not affiliated with, endorsed by, or sponsored by those companies.",
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
