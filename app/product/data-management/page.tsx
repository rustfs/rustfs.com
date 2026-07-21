import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Management & S3 Tables Preview | RustFS",
  description:
    "Evaluate RustFS bucket, object, quota, Object Lock, multipart, and lifecycle surfaces, with S3 Tables clearly identified as a preview direction.",
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
    status: "Available in beta",
    description:
      "Use the primary S3 API surface for object workflows and verify required operations against the published compatibility overview.",
    items: [
      {
        title: "Bucket and object management",
        description:
          "Evaluate bucket and object operations through the current S3-compatible beta surface.",
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
    status: "Under validation",
    description:
      "Evaluate lifecycle rules and versioning behavior for the retention and cost controls your workload requires.",
    items: [
      {
        title: "Automated lifecycle rules",
        description:
          "Validate moving, expiring, and retaining data against the lifecycle behavior required by your policy.",
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
    status: "Available in beta",
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
    status: "Preview",
    description:
      "Preview direction: explore how S3 Tables and Iceberg-oriented workflows may extend the object storage surface.",
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
          "Explore planned interoperability with Apache Iceberg-oriented data workflows.",
      },
    ],
  },
];

export default function DataManagementPage() {
  return (
    <FeaturePage
      title="Data Management"
      description="Evaluate bucket, object, quota, Object Lock, versioning, and multipart workflows on the current S3 surface. Lifecycle remains under validation, while S3 Tables is presented as a preview rather than a shipped baseline."
      sections={sections}
      variant="data"
      links={[
        { label: "Verify S3 coverage", href: "https://docs.rustfs.com/features/s3-compatibility/" },
        { label: "Plan data workflows", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
