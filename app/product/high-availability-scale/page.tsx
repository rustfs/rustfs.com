import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RustFS High Availability & Scalability | Enterprise Distributed Storage",
  description:
    "Discover RustFS enterprise distributed architecture. Experience scaling from PB to EB levels with distributed EC, automated self-healing, and data reliability.",
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
    description:
      "Enterprise-grade distributed architecture for massive data availability and customized storage policies.",
    items: [
      {
        title: "Enterprise-grade architecture",
        description:
          "Satisfy high-availability requirements for massive data through distributed system design.",
      },
      {
        title: "Flexible multi-node topology",
        description:
          "Use multi-node and multi-disk layouts to match enterprise storage policies.",
      },
      {
        title: "Node and disk fault tolerance",
        description:
          "Keep service and data available when disks or nodes fail.",
      },
    ],
  },
  {
    title: "EC configuration",
    description:
      "Distributed Erasure Coding balances resilience, disaster recovery, storage efficiency, and reliability.",
    items: [
      {
        title: "Distributed EC",
        description:
          "Maximize cluster resilience and disaster recovery with distributed Erasure Coding.",
      },
      {
        title: "Optimized EC configurations",
        description:
          "Balance storage efficiency and data reliability for each workload.",
      },
      {
        title: "EC Calculator",
        description:
          "Match workloads with best-practice configurations before production rollout.",
      },
    ],
  },
  {
    title: "Infinite scaling",
    description:
      "Scale horizontally and vertically from PB to EB-level data management while preserving operational continuity.",
    items: [
      {
        title: "Horizontal and vertical scaling",
        description:
          "Expand capacity and deployment shape as data volume grows.",
      },
      {
        title: "Automated data rebalancing",
        description:
          "Improve cluster-wide disk utilization as pools expand.",
      },
      {
        title: "Zero-downtime expansion",
        description:
          "Minimize impact on active workloads during online expansion.",
      },
    ],
  },
  {
    title: "Node healing",
    description:
      "Automated recovery and integrity verification keep cluster state visible and reliable.",
    items: [
      {
        title: "Automated data self-healing",
        description:
          "Recover data automatically to maintain enterprise-grade reliability.",
      },
      {
        title: "Data integrity verification",
        description:
          "Secure cluster consistency through verification workflows.",
      },
      {
        title: "Real-time progress tracking",
        description:
          "Provide operational visibility into cluster health and healing progress.",
      },
    ],
  },
];

export default function HighAvailabilityScalePage() {
  return (
    <FeaturePage
      title="High Availability & Scale"
      description="RustFS combines enterprise distributed architecture, distributed Erasure Coding, resilient node and disk fault tolerance, and automated healing to support reliable PB to EB-scale storage."
      sections={sections}
      variant="scale"
      links={[
        { label: "Open EC calculator", href: "/erasure-code-calculator" },
        { label: "Plan scaling", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
