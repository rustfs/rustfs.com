import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RustFS Cluster Operations & OTEL Observability | Enterprise Management",
  description: "Simplify RustFS management with an intuitive console, rich rc CLI, and full-stack OTEL observability. Deploy Prometheus, Grafana, and Loki with one click for real-time cluster insights.",
  keywords: [
    "RustFS",
    "cluster observability",
    "OpenTelemetry",
    "Prometheus",
    "Grafana",
    "Loki",
    "rc CLI",
    "storage console",
    "IAM security",
    "real-time cluster monitoring",
  ],
};

const sections: FeaturePageSection[] = [
  {
    title: "Console operations",
    items: [
      {
        title: "Intuitive data management",
        description: "Streamlining full lifecycle operations for buckets and objects.",
      },
      {
        title: "Granular security administration",
        description: "Reinforcing IAM, audit logging, and data encryption.",
      },
      {
        title: "Centralized cluster orchestration",
        description: "Simplifying pool expansion, rebalancing, and decommissioning.",
      },
    ],
  },
  {
    title: "OTEL support",
    description: "Route logs, metrics, and monitoring signals through OpenTelemetry-compatible operations workflows.",
    items: [
      {
        title: "Full-stack observability",
        description: "Integrate unified logs, monitoring, and metrics under OpenTelemetry.",
      },
      {
        title: "One-click containerized deployment",
        description: "Spinning up Prometheus, Grafana, and Loki instances instantly.",
      },
      {
        title: "Flexible environment configuration",
        description: "Tailoring feature toggles to customized enterprise needs.",
      },
    ],
  },
  {
    title: "Cluster insights",
    description: "Keep node health, disk state, capacity, buckets, and object counts visible to operators.",
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
        title: "Live object count display",
        description: "See bucket and object counts directly in the operational view.",
      },
    ],
  },
  {
    title: "RustFS client CLI",
    description: "Use rc for repeatable storage administration from local terminals, automation, and operational runbooks.",
    items: [
      {
        title: "Rich command ecosystem",
        description: "Cover object, bucket, cluster, and security operations from the command line.",
      },
      {
        title: "Multi-platform deployment",
        description: "Securing frictionless setup via binaries or Docker across Linux, macOS, and Windows.",
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
      variant="ops"
      highlightsTitle="Enterprise insights"
      highlights={[
        {
          title: "Real-time insights",
          description: "Visibility into node health, disk status, capacity metrics, and object or bucket counts.",
        },
        {
          title: "Operational flexibility",
          description: "Effortless deployment across operating systems and installation methods including source, binary, Docker, and Kubernetes.",
        },
        {
          title: "Simplified administration",
          description: "Comprehensive console and CLI controls for full-lifecycle bucket management and granular IAM security.",
        },
      ]}
      links={[
        { label: "Review operations", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
