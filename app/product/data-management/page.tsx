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
        description: "Lower storage costs and reduce day-to-day operational load.",
      },
      {
        title: "Multipart Upload",
        description: "Speed up large-object transfers and make better use of available bandwidth.",
      },
    ],
  },
  {
    id: "s3-tables",
    title: "S3 Tables",
    items: [
      {
        title: "Automated Small File Management",
        description: "Automating backend merges and snapshots to simplify and reduce operational costs.",
      },
      {
        title: "Performance Acceleration",
        description: "Optimizing the dedicated metadata layer to drastically lower query latency and accelerate data analytics.",
      },
      {
        title: "Native Iceberg Support",
        description: "Seamlessly connecting with leading big data and AI ecosystems.",
      },
    ],
  },
];

export default function DataManagementPage() {
  return (
    <FeaturePage
      title="Data Management"
      description="Comprehensive lifecycle management covering bucket quotas, Object Lock, and versioning. Native S3 compatibility helps you migrate data from other S3-compatible systems to RustFS."
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
          description: "Powered by S3 Tables to unify structured and unstructured data management.",
        },
        {
          title: "Cost efficiency",
          description: "Fine-grained lifecycle policies to reduce enterprise storage costs.",
        },
      ]}
      links={[
        { label: "Plan data workflows", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
