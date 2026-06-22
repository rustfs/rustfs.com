import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RustFS Cluster Operations & OTEL Observability | Enterprise Management",
  description: "Simplify RustFS management with an intuitive console, rich rc CLI, and full-stack OTEL observability. Deploy Prometheus, Grafana, and Loki for real-time cluster insights.",
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
    title: "Enterprise insights",
    description: "Operate RustFS with real-time signals and a unified administration surface.",
    items: [
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
    description: "Route logs, metrics, and monitoring signals through OpenTelemetry-compatible operations workflows.",
    items: [
      {
        title: "Full-stack observability",
        description: "Integrate unified logs, monitoring, and metrics under OpenTelemetry.",
      },
      {
        title: "One-click containerized deployment",
        description: "Spin up Prometheus, Grafana, and Loki instances quickly for operational review.",
      },
      {
        title: "Flexible configuration",
        description: "Control observability features through environment variables for deployment-specific needs.",
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
      variant="ops"
      links={[
        { label: "Review operations", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
