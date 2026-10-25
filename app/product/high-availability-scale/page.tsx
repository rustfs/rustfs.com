import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "product/high-availability-scale/" },
  title: "RustFS High Availability & Scalability | Enterprise Distributed Storage",
  description:
    "Scale from petabytes to exabytes with distributed erasure coding, automated self-healing, and strong data durability.",
  keywords: [
    "RustFS",
    "distributed object storage",
    "high availability",
    "elastic scaling",
    "erasure coding",
    "self-healing",
    "S3-compatible",
    "enterprise storage solution",
    "data reliability",
  ],
};

const sections: FeaturePageSection[] = [
  {
    title: "Distributed deployment",
    items: [
      {
        title: "Enterprise-grade distributed architecture",
        description:
          "Meets high-availability requirements for large-scale datasets.",
      },
      {
        title: "Flexible multi-node and multi-disk topologies",
        description:
          "Supports customized enterprise storage policies.",
      },
      {
        title: "Resilient node- and disk-level fault tolerance",
        description:
          "Keeps service and data available through node and disk faults.",
      },
    ],
  },
  {
    title: "EC configuration",
    items: [
      {
        title: "Distributed EC",
        description:
          "Improves cluster resilience and disaster recovery.",
        href: "/knowledge-center/erasure-coding-explained",
      },
      {
        title: "Optimized EC configurations",
        description:
          "Balances storage efficiency and data reliability.",
      },
      {
        title: "EC Calculator",
        description:
          "Matches workloads to best-practice configurations.",
      },
    ],
  },
  {
    title: "Elastic scaling",
    items: [
      {
        title: "Horizontal and vertical scaling",
        description:
          "Supports data management from petabytes to exabytes.",
      },
      {
        title: "Automated data rebalancing",
        description:
          "Keeps disk utilization even across the cluster.",
      },
      {
        title: "Zero-downtime expansion",
        description:
          "Limits the performance impact on active workloads.",
      },
    ],
  },
  {
    title: "Node healing",
    items: [
      {
        title: "Automated data self-healing",
        description:
          "Restores data after drive or node loss.",
      },
      {
        title: "Data integrity verification",
        description:
          "Helps maintain cluster data integrity.",
      },
      {
        title: "Real-time progress tracking",
        description:
          "Shows healing progress and cluster health.",
      },
    ],
  },
  {
    title: "Site Replication",
    items: [
      {
        title: "Multi-site replication",
        description:
          "Adds reliability and disaster recovery across sites.",
      },
      {
        title: "Bidirectional synchronization",
        description:
          "Keeps data consistent across distributed sites.",
      },
      {
        title: "Location-aware routing",
        description:
          "Routes requests for lower access latency.",
      },
    ],
  },
];

export default function HighAvailabilityScalePage() {
  return (
    <FeaturePage
      title="High Availability & Scale"
      description="Enterprise distributed architecture, erasure coding, and fault tolerance let you scale out while preserving strong data durability. RustFS supports reliable object storage from petabytes to exabytes."
      sections={sections}
      variant="scale"
      highlightsTitle="Reliability & Efficiency"
      highlights={[
        {
          title: "Enterprise Solution",
          description: "Built for enterprise requirements for high availability and reliability at large scale.",
        },
        {
          title: "Cost efficiency",
          description: "Strong cost efficiency, with lower storage cost and less operational work.",
        },
        {
          title: "High Flexibility",
          description: "Adapts object management to different workloads and data scales.",
        },
      ]}
      links={[
        { label: "Download", href: "/download" },
        { label: "Plan scaling", href: "/contact-us/", variant: "outline" },
      ]}
    />
  );
}
