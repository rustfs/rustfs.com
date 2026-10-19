import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "product/multiple-protocol-access/" },
  title: "Multi-protocol access | S3, Swift, WebDAV, FTP/FTPS & MCP | RustFS",
  description: "Connect RustFS natively to workloads over S3, Swift, FTP/FTPS, WebDAV, and MCP. No application rewrites, no legacy protocol proxies—just multi-protocol access on one object store.",
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
    "data silos",
    "legacy modernization",
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
        description: "S3 implementation in Rust for object operations, bucket policies, versioning, and lifecycle management.",
      },
      {
        title: "S3 support out of the box",
        description: "Works with S3-compatible infrastructure and application ecosystems.",
      },
      {
        title: "MinIO alternative",
        description: "No config overhauls, no API rewrites, and no application code changes.",
        href: "/blog/binary-replacement-a-simple-way-to-migrate-from-minio-to-rustfs/",
      },
      {
        title: "Native virtual host mode",
        description: "Bucket addressing, domain-level isolation, and virtual-hosted-style URL compatibility.",
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
        title: "Quick setup",
        description: "Works out of the box, with no extra configuration or heavy third-party integrations.",
      },
      {
        title: "Secure file operations",
        description: "TLS/HTTPS support for encrypted data in transit.",
      },
    ],
  },
  {
    title: "Swift API",
    description: "Bring private-cloud and OpenStack-compatible workloads onto the same storage foundation.",
    items: [
      {
        title: "OpenStack native support",
        description: "Runs in OpenStack environments that already speak Swift.",
      },
      {
        title: "Dual-protocol coexistence",
        description: "Let S3 and Swift clients access the same data.",
      },
    ],
  },
  {
    title: "FTP/FTPS",
    description: "A secure bridge for file-transfer workloads that cannot be rewritten immediately.",
    items: [
      {
        title: "Legacy modernization",
        description: "Connect traditional applications and automated batch workflows to object storage.",
      },
      {
        title: "Hardened enterprise security",
        description: "Support FTPS over TLS so data is encrypted in transit.",
      },
    ],
  },
  {
    title: "MCP",
    description: "RustFS is designed for agent-native infrastructure. MCP support lets LLM agents and automated workflows query, manage, and orchestrate storage resources through a controlled interface.",
    items: [
      {
        title: "Agent-native access",
        description: "Let AI agents call RustFS through controlled storage operations.",
      },
      {
        title: "Customized toolset",
        description: "Customize and extend your own toolset under a clear open-source license.",
      },
    ],
  },
];

export default function MultipleProtocolAccessPage() {
  return (
    <FeaturePage
      title="Multi-protocol access"
      description="Native multi-protocol access. By speaking S3, Swift, FTP/FTPS, WebDAV, and MCP out of the box, RustFS fits existing environments. No gateways, no legacy protocol proxies, and no application code changes. Connect AI pipelines, big data frameworks, and legacy workloads to one object store."
      sections={sections}
      variant="protocol"
      highlightsTitle="Flexibility & Simplicity"
      highlights={[
        {
          title: "Native support",
          description: "Works out of the box so you can start storage services without a protocol gateway.",
        },
        {
          title: "Built for any workload",
          description: "Fits cloud-native services and legacy applications on the same object store.",
        },
        {
          title: "Seamless integration",
          description: "S3, Swift, FTP/FTPS, WebDAV, and MCP against one data set.",
        },
      ]}
      links={[
        { label: "Download", href: "/download" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
