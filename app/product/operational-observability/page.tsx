import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RustFS Operations, rc CLI & OpenTelemetry",
  description: "Evaluate RustFS console, rc CLI, OpenTelemetry, and cluster insight surfaces for repeatable operator workflows.",
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
    status: "Verify signals",
    description: "Operate RustFS with real-time signals and a unified administration surface.",
    items: [
      {
        title: "Real-time insights",
        description: "Visibility into node health, disk status, capacity metrics, and object or bucket counts.",
      },
      {
        title: "Operational flexibility",
        description: "Choose source, binary, Docker, or Kubernetes installation paths based on the environment being evaluated.",
      },
      {
        title: "Simplified administration",
        description: "Review the console and CLI operations needed for bucket, cluster, and IAM runbooks.",
      },
    ],
  },
  {
    title: "Console operations",
    status: "Mixed coverage",
    items: [
      {
        title: "Data management",
        description: "Evaluate the available object and bucket operations from the console.",
      },
      {
        title: "Security management",
        description: "Review the IAM, audit, authentication, authorization, and encryption controls exposed in the current console.",
      },
      {
        title: "Cluster management",
        description: "Validate available pool expansion, rebalancing, and retirement workflows before relying on them operationally.",
      },
    ],
  },
  {
    title: "OTEL support",
    status: "Available in beta",
    description: "Route logs, metrics, and monitoring signals through OpenTelemetry-compatible operations workflows.",
    items: [
      {
        title: "OpenTelemetry signal routing",
        description: "Integrate unified logs, monitoring, and metrics under OpenTelemetry.",
      },
      {
        title: "Containerized observability stack",
        description: "Use Prometheus, Grafana, and Loki containers for an initial operational review.",
      },
      {
        title: "Flexible configuration",
        description: "Control observability features through environment variables for deployment-specific needs.",
      },
    ],
  },
  {
    title: "Cluster insights",
    status: "Available in beta",
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
    status: "Available in beta",
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
      description="Evaluate the console, OpenTelemetry signals, cluster insights, and rc CLI as one operator journey: observe, diagnose, act, and record a repeatable runbook."
      sections={sections}
      variant="ops"
      links={[
        { label: "Read operations docs", href: "/docs" },
        { label: "Review operations", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
