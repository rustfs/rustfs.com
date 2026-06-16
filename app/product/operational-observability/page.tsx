import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operational & Observability | RustFS",
  description: "RustFS operational control with cluster management, OpenTelemetry support, real-time insights, and the rc CLI.",
};

const sections: FeaturePageSection[] = [
  {
    title: "Enterprise insights",
    items: [
      {
        title: "Real-time insights",
        description: "Visibility into node health, disk status, capacity metrics, and object or bucket counts.",
      },
      {
        title: "Operational flexibility",
        description: "Effortless deployment across operating systems and installation methods including source, binary, Docker, and Kubernetes.",
      },
    ],
  },
  {
    title: "Console operations",
    items: [
      {
        title: "Data management",
        description: "Manage the full lifecycle of objects and buckets from the console.",
      },
      {
        title: "Security management",
        description: "Operate IAM, security audit, authentication, authorization, and data encryption from one place.",
      },
      {
        title: "Cluster management",
        description: "Expand, rebalance, and retire pools directly from the console.",
      },
    ],
  },
  {
    title: "OTEL support",
    items: [
      {
        title: "Full-stack observability",
        description: "Support logging, monitoring, and metrics across RustFS deployments.",
      },
      {
        title: "One-command stack",
        description: "Containerized deployment for Prometheus, Grafana, and Loki instances.",
      },
      {
        title: "Flexible configuration",
        description: "Control observability features through environment variables for deployment-specific needs.",
      },
    ],
  },
  {
    title: "Cluster insights",
    items: [
      {
        title: "Cluster status monitoring",
        description: "Monitor cluster nodes, disk state, and uptime at a glance.",
      },
      {
        title: "Capacity statistics",
        description: "Track total capacity and current usage in real time.",
      },
      {
        title: "Object counts",
        description: "See bucket and object counts directly in the operational view.",
      },
    ],
  },
  {
    title: "rc CLI support",
    items: [
      {
        title: "Broad command coverage",
        description: "Operate objects, buckets, clusters, and security workflows from the command line.",
      },
      {
        title: "Secure and convenient",
        description: "Support Linux, macOS, and Windows with binary and Docker installation options.",
      },
      {
        title: "Continuous iteration",
        description: "The command surface continues to expand to strengthen CLI-based instance management.",
      },
    ],
  },
];

export default function OperationalObservabilityPage() {
  return (
    <FeaturePage
      title="Operational & Observability"
      description="RustFS gives operators practical control over storage operations with console workflows, OpenTelemetry support, cluster insights, and rc CLI automation."
      sections={sections}
      links={[
        { label: "Review operations", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
