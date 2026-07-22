import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Native Multi-Protocol Access | S3, Swift, WebDAV, FTP(s) & MCP | RustFS",
  description: "Connect RustFS natively to any workload via S3, Swift, FTP(s), WebDAV, and MCP. Zero code modifications, no legacy proxies, and multi-protocol data coexistence.",
  keywords: [
    "RustFS",
    "multi-protocol access",
    "S3 API",
    "OpenStack Swift",
    "WebDAV",
    "FTP",
    "FTPS",
    "Model Context Protocol",
    "MCP AI",
    "MinIO",
  ],
};

const sections: FeaturePageSection[] = [
  {
    title: "S3 API compatibility",
    description: "The primary object-storage API surface, designed for efficient management and existing S3-compatible ecosystems.",
    items: [
      {
        title: "Comprehensive S3 API capabilities",
        description: "Pure Rust-powered S3 implementation across object operations, bucket policies, versioning, and lifecycle management.",
      },
      {
        title: "Out-of-the-box S3 support",
        description: "Seamless integration across S3-compliant infrastructure and application ecosystems.",
      },
      {
        title: "Drop-in MinIO replacement",
        description: "Avoid config overhauls, API rewrites, and migration friction when moving from MinIO.",
      },
      {
        title: "Native virtual host mode",
        description: "Enterprise-grade bucket addressing, domain-level isolation, and absolute URL compatibility.",
      },
    ],
  },
  {
    title: "WebDAV",
    description: "File-oriented access for teams that need operating-system-native workflows without leaving object storage behind.",
    items: [
      {
        title: "Native OS integration",
        description: "Operate remote object storage as local directories across Windows, macOS, and Linux without client lock-in.",
      },
      {
        title: "Instant frictionless setup",
        description: "Out-of-the-box convenience requiring no extra configuration or heavy third-party integrations.",
      },
      {
        title: "Secure file operations",
        description: "Full TLS/HTTPS protocol support for encrypted data transfer.",
      },
    ],
  },
  {
    title: "Swift API",
    description: "Bring private-cloud and OpenStack-compatible workloads onto the same storage foundation.",
    items: [
      {
        title: "OpenStack native support",
        description: "Frictionless RustFS integration into the OpenStack ecosystem.",
      },
      {
        title: "Dual-protocol coexistence",
        description: "Break down data silos and accelerate data mobility across S3 and Swift clients.",
      },
      {
        title: "Enterprise ecosystem fit",
        description: "Support legacy enterprise and private-cloud workloads without forcing immediate application rewrites.",
      },
    ],
  },
  {
    title: "FTP(s)",
    description: "A secure bridge for file-transfer workloads that cannot be rewritten immediately.",
    items: [
      {
        title: "Legacy modernization",
        description: "Connect traditional applications and automated batch workflows to modern object storage instantly.",
      },
      {
        title: "Hardened enterprise security",
        description: "Support FTPS over TLS to guarantee encrypted data transfer in transit.",
      },
      {
        title: "Unified storage backend",
        description: "Keep S3, WebDAV, Swift, FTP(s), and MCP clients pointed at one consistent storage foundation.",
      },
    ],
  },
  {
    title: "MCP",
    description: "RustFS is designed for agent-native infrastructure. MCP support lets LLM agents and automated workflows query, manage, and orchestrate storage resources through a controlled interface.",
    items: [
      {
        title: "Agent-native access",
        description: "Empower AI agents to call and interact with RustFS workflows through controlled storage operations.",
      },
      {
        title: "Customized toolset",
        description: "Customize and extend your own agent toolset while keeping storage access explicit and governed.",
      },
    ],
  },
];

export default function MultipleProtocolAccessPage() {
  return (
    <FeaturePage
      title="Multiple Protocol Access"
      description="Native multi-protocol accessibility delivery. By speaking S3, Swift, FTP(s), WebDAV, and MCP out of the box, RustFS integrates naturally into existing environments with no gateways, no legacy proxies, and no code modifications."
      sections={sections}
      variant="protocol"
      links={[
        { label: "Plan protocol access", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
