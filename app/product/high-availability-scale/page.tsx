import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Availability & Scale Evaluation | RustFS",
  description:
    "Evaluate RustFS erasure coding, failure domains, healing, and distributed deployment while multi-node mode remains under active beta validation.",
  keywords: [
    "RustFS",
    "distributed object storage",
    "high availability",
    "storage expansion",
    "erasure coding",
    "self-healing",
    "S3-compatible",
    "enterprise storage solution",
    "data reliability",
  ],
};

const sections: FeaturePageSection[] = [
  {
    title: "Distributed deployment validation",
    status: "Under validation",
    description:
      "Model multi-node and multi-drive layouts against your failure domains while distributed mode remains under active validation.",
    items: [
      {
        title: "Decentralized architecture",
        description:
          "Evaluate a peer-to-peer design without a distinct metadata-server tier.",
      },
      {
        title: "Flexible multi-node topology",
        description:
          "Use multi-node and multi-disk layouts to match enterprise storage policies.",
      },
      {
        title: "Node and disk fault tolerance",
        description:
          "Exercise disk and node failure behavior against the topology you intend to operate.",
      },
    ],
  },
  {
    title: "EC configuration",
    status: "Available in beta",
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
          "Use planning estimates as a starting point, then validate them against the intended failure domain.",
      },
    ],
  },
  {
    title: "Expansion and rebalancing",
    status: "Under validation",
    description:
      "Plan horizontal and vertical growth, then validate rebalancing and operational impact in a representative environment.",
    items: [
      {
        title: "Horizontal and vertical scaling",
        description:
          "Expand capacity and deployment shape as data volume grows.",
      },
      {
        title: "Automated data rebalancing",
        description:
          "Measure rebalancing behavior and cluster-wide disk utilization in a representative environment.",
      },
      {
        title: "Controlled expansion",
        description:
          "Measure workload impact and recovery behavior during online expansion.",
      },
    ],
  },
  {
    title: "Node healing",
    status: "Under validation",
    description:
      "Automated recovery and integrity verification keep cluster state visible and reliable.",
    items: [
      {
        title: "Automated data self-healing",
        description:
          "Evaluate automatic recovery behavior against the reliability target for your topology.",
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
      description="Use erasure coding and the topology calculator to model resilience and efficiency. Treat distributed deployment, healing, and pool lifecycle as validation work before a production rollout."
      sections={sections}
      variant="scale"
      links={[
        { label: "Open EC calculator", href: "/erasure-code-calculator" },
        { label: "Plan scaling", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
