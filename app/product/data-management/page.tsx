import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "product/data-management/" },
  title: "Data Management & S3 Tables | RustFS High-Performance Storage",
  description:
    "Optimize data management with RustFS. Benefit from full S3 compatibility, automated lifecycle management, and native Iceberg support powered by S3 Tables to lower TCO and accelerate AI and big data workloads.",
  keywords: [
    "RustFS",
    "data management",
    "object storage",
    "S3 compatibility",
    "S3 Tables",
    "Apache Iceberg",
    "MinIO",
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
];

export default function DataManagementPage() {
  return (
    <FeaturePage
      title="Data Management"
      description="Lifecycle management for bucket quotas, Object Lock, and versioning. Native S3 compatibility helps you migrate from any S3-compatible system to RustFS."
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
