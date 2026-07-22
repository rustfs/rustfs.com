import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RustFS High Availability & Scalability | Enterprise Distributed Storage",
  description:
    "Discover RustFS enterprise distributed architecture. Experience limitless scaling from PB to EB levels with distributed EC, automated self-healing, and absolute data reliability.",
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
          "Satisfying high-availability requirements for massive data.",
      },
      {
        title: "Flexible multi-node and multi-disk topologies",
        description:
          "Fulfilling customized enterprise storage policies.",
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
    title: "Infinite scaling",
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
          "Securing consistency of cluster data.",
      },
      {
        title: "Real-time progress tracking",
        description:
          "Providing deep insights into cluster health.",
      },
    ],
  },
];

export default function HighAvailabilityScalePage() {
  return (
    <FeaturePage
      title="High Availability & Scale"
      description="Driven by enterprise-grade distributed architecture, distributed Erasure Coding (EC), and resilient fault tolerance, RustFS achieves a perfect win-win between limitless scaling and absolute data consistency. RustFS safeguards reliable, high-efficiency data management for enterprise storage scaling from PB to EB levels, and even more."
      sections={sections}
      variant="scale"
      highlightsTitle="Reliability & Efficiency"
      highlights={[
        {
          title: "Enterprise Solution",
          description: "Satisfying enterprise demands for both high availability and rigorous reliability in mass storage.",
        },
        {
          title: "Cost saving",
          description: "Exceptional cost-efficiency, driving down both hardware storage costs and operational workload for enterprises.",
        },
        {
          title: "High Flexibility",
          description: "Flexibly adapting to efficient data management across diverse business scenarios and any data scale.",
        },
      ]}
      links={[
        { label: "Open EC calculator", href: "/erasure-code-calculator" },
        { label: "Plan scaling", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
