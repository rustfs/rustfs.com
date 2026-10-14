import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "product/high-availability-scale/" },
  title: "RustFS High Availability & Scalability | Enterprise Distributed Storage",
  description:
    "Discover RustFS enterprise distributed architecture. Scale from petabytes to exabytes with distributed erasure coding, automated self-healing, and strong data durability.",
  keywords: [
    "RustFS",
    "distributed object storage",
    "high availability",
    "infinite scaling",
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
          "Guaranteeing continuous service and data availability.",
      },
    ],
  },
  {
    title: "EC configuration",
    items: [
      {
        title: "Distributed EC",
        description:
          "Maximizing RustFS cluster resilience and disaster recovery.",
        href: "/knowledge-center/erasure-coding-explained",
      },
      {
        title: "Optimized EC configurations",
        description:
          "Balancing storage efficiency and data reliability.",
      },
      {
        title: "EC Calculator",
        description:
          "Matching your workloads with best-practice configurations instantly.",
      },
    ],
  },
  {
    title: "Elastic scaling",
    items: [
      {
        title: "Horizontal and vertical scaling",
        description:
          "Enabling PB to EB-level data management.",
      },
      {
        title: "Automated data rebalancing",
        description:
          "Achieving uniform disk utilization.",
      },
      {
        title: "Zero-downtime expansion",
        description:
          "Minimizing the performance impact on active workloads.",
      },
    ],
  },
  {
    title: "Node healing",
    items: [
      {
        title: "Automated data self-healing",
        description:
          "Delivering enterprise-grade data reliability.",
      },
      {
        title: "Data integrity verification",
        description:
          "Helps maintain cluster data integrity.",
      },
      {
        title: "Real-time progress tracking",
        description:
          "Providing deep insights into cluster health.",
      },
    ],
  },
  {
    title: "Site Replication",
    items: [
      {
        title: "Multi-site replication",
        description:
          "Providing enhanced reliability and robust disaster recovery.",
      },
      {
        title: "Bidirectional synchronization",
        description:
          "Maintaining consistent data across distributed sites.",
      },
      {
        title: "Location-aware routing",
        description:
          "Enabling low-latency access and improved user experience.",
      },
    ],
  },
];

export default function HighAvailabilityScalePage() {
  return (
    <FeaturePage
      title="High Availability & Scale"
      description="Driven by enterprise-grade distributed architecture, distributed Erasure Coding (EC), and resilient fault tolerance, RustFS is built to scale out while preserving strong data durability and availability. RustFS supports reliable, efficient data management as enterprise clusters scale from petabytes to exabytes."
      sections={sections}
      variant="scale"
      highlightsTitle="Reliability & Efficiency"
      highlights={[
        {
          title: "Enterprise Solution",
          description: "Built for enterprise requirements around high availability and durability at massive scale.",
        },
        {
          title: "Cost efficiency",
          description: "Strong cost efficiency that reduces hardware spend and operator workload.",
        },
        {
          title: "High Flexibility",
          description: "Flexibly adapting to efficient data management across diverse business scenarios and any data scale.",
        },
      ]}
      links={[
        { label: "Download", href: "/download" },
        { label: "Plan scaling", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
