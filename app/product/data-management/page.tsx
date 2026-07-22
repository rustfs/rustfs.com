import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
    title: "S3 compatibility",
    description:
      "Use the native S3 protocol to manage object storage data efficiently while keeping migration paths open from any S3-compatible system.",
    items: [
      {
        title: "Bucket and object management",
        description:
          "Manage bucket and object operations through a stable S3-compatible surface.",
      },
      {
        title: "Bucket quota control",
        description:
          "Keep capacity boundaries explicit for teams, tenants, and application workloads.",
      },
      {
        title: "Object Lock support",
        description:
          "Protect selected data from accidental or unauthorized mutation when retention policies require it.",
      },
    ],
  },
  {
    title: "Lifecycle management",
    description:
      "Use fine-grained lifecycle controls to reduce operational burden and lower enterprise storage cost.",
    items: [
      {
        title: "Automated lifecycle rules",
        description:
          "Optimize storage cost by moving, expiring, or retaining data according to workload policy.",
      },
      {
        title: "Versioning workflows",
        description:
          "Preserve object history when applications need rollback, recovery, or audit-friendly state changes.",
      },
      {
        title: "Cost efficiency",
        description:
          "Reduce total cost of ownership with precise data lifecycle decisions instead of coarse storage tiers.",
      },
    ],
  },
  {
    title: "Multipart upload",
    description:
      "Accelerate large-file transfer paths and keep network utilization high for data-heavy applications.",
    items: [
      {
        title: "Large file acceleration",
        description:
          "Improve write efficiency for large objects through multipart transfer behavior.",
      },
      {
        title: "Network utilization",
        description:
          "Maximize available bandwidth for long-running data ingest and migration workflows.",
      },
    ],
  },
  {
    title: "S3 Tables",
    description:
      "Coming soon: unify structured and unstructured data management with native Iceberg-ready table storage.",
    items: [
      {
        title: "Automated small file management",
        description:
          "Automate backend merges, snapshots, and maintenance to simplify operational overhead.",
      },
      {
        title: "Performance acceleration",
        description:
          "Use a dedicated metadata layer to lower query latency and accelerate analytics workloads.",
      },
      {
        title: "Native Iceberg support",
        description:
          "Connect seamlessly with leading big data and AI ecosystems through Apache Iceberg compatibility.",
      },
    ],
  },
];

export default function DataManagementPage() {
  return (
    <FeaturePage
      title="Data Management"
      description="Comprehensive lifecycle management covering buckets, objects, bucket quotas, Object Lock, versioning, multipart upload, and S3 Tables. RustFS keeps object data manageable while preserving S3-native migration paths."
      sections={sections}
      variant="data"
      links={[
        { label: "Plan data workflows", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
