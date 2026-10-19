import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "product/operational-observability/" },
  title: "RustFS Cluster Operations & OTEL Observability | Enterprise Management",
  description: "Simplify RustFS management with a web console, the rc CLI, and OpenTelemetry. Deploy Prometheus, Grafana, and Loki with a streamlined setup for real-time cluster insights.",
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
    id: "multi-tenant-management",
    title: "Multi-tenant management",
    description: (
      <>
        <Link
          href="https://docs.rustfs.com/en/installation/cloud-native/operator"
          target="_blank"
          rel="noreferrer"
          className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
        >
          RustFS Operator
        </Link>{" "}
        automates multi-tenant storage operations, from elastic capacity scaling to instant MNMD cluster provisioning with strict resource isolation.
      </>
    ),
    items: [
      {
        title: "Elastic storage auto-scaling",
        description: "Scale RustFS capacity and disk pools on demand without downtime, using Operator orchestration.",
      },
      {
        title: "MNMD cluster provisioning",
        description: "Provision multi-node, multi-disk RustFS clusters with simultaneous multi-writer access for high-concurrency workloads.",
      },
      {
        title: "Tenant-aware resource isolation",
        description: "Enforce capacity quotas, IOPS limits, and isolated credentials across storage pools.",
      },
    ],
  },
  {
    title: "Console operations",
    items: [
      {
        title: "Intuitive data management",
        description: "Run full lifecycle operations for buckets and objects from the console.",
      },
      {
        title: "Granular security administration",
        description: "Manage IAM, audit logging, and data encryption.",
      },
      {
        title: "Centralized cluster orchestration",
        description: "Expand, rebalance, and decommission pools from one place.",
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
        title: "Streamlined container deployment",
        description: "Spin up Prometheus, Grafana, and Loki for metrics and logs.",
      },
      {
        title: "Flexible environment configuration",
        description: "Configure feature toggles for enterprise requirements.",
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
        description: "Install quickly via binaries or Docker on Linux, macOS, and Windows.",
      },
      {
        title: "Continuous iteration",
        description: "The CLI continues to expand and covers more instance-management tasks.",
      },
    ],
  },
];

export default function OperationalObservabilityPage() {
  return (
    <FeaturePage
      title="Operations & observability"
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
          description: "Deployment across operating systems and installation methods, including source, binary, Docker, and Kubernetes.",
        },
        {
          title: "Simplified administration",
          description: "Comprehensive console and CLI controls for full-lifecycle bucket management and granular IAM security.",
        },
      ]}
      links={[
        { label: "Download", href: "/download" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
