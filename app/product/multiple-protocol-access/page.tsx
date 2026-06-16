import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multiple Protocol Access | RustFS",
  description: "Native S3, Swift, FTP(s), WebDAV, and MCP access for RustFS object storage without gateways, proxies, or code changes.",
};

const sections: FeaturePageSection[] = [
  {
    title: "S3 API compatibility",
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
    items: [
      {
        title: "Native OS integration",
        description: "Operate remote object storage as local directories across Windows, macOS, and Linux without client lock-in.",
      },
      {
        title: "Instant setup",
        description: "Out-of-the-box convenience with no heavy third-party integrations or extra gateways.",
      },
      {
        title: "Secure file operations",
        description: "Full TLS/HTTPS protocol support for encrypted data transfer.",
      },
    ],
  },
  {
    title: "OpenStack Swift",
    items: [
      {
        title: "Existing Swift workflows",
        description: "Connect Swift-compatible applications and operational tooling to the same RustFS object storage layer.",
      },
      {
        title: "No translation gateway",
        description: "Avoid extra proxy layers while keeping one high-performance source of truth for object data.",
      },
      {
        title: "Enterprise ecosystem fit",
        description: "Support legacy enterprise and private-cloud workloads without forcing immediate application rewrites.",
      },
    ],
  },
  {
    title: "FTP(s)",
    items: [
      {
        title: "Legacy workload access",
        description: "Let existing FTP-aware systems exchange files with RustFS while storage remains object-native.",
      },
      {
        title: "Secure transfer path",
        description: "Use FTP(s) for encrypted transfer flows where teams still depend on file-oriented integration.",
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
  },
];

export default function MultipleProtocolAccessPage() {
  return (
    <FeaturePage
      title="Multiple Protocol Access"
      description="Native multi-protocol accessibility delivery. By speaking S3, Swift, FTP(s), WebDAV, and MCP out of the box, RustFS integrates naturally into existing environments with no gateways, no legacy proxies, and no code modifications."
      sections={sections}
      links={[
        { label: "Plan protocol access", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
