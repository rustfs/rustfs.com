import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Native Multi-Protocol Access | S3, Swift, WebDAV, FTP(s) & MCP | RustFS",
  description: "Start with broad test-backed S3 coverage, then verify Swift, WebDAV, FTP(s), and MCP behavior for each application workflow.",
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
    status: "Available in beta",
    description: "The primary object-storage API surface, designed for efficient management and existing S3-compatible ecosystems.",
    items: [
      {
        title: "Test-backed S3 API coverage",
        description: "Review the published coverage notes, then exercise the operations your application depends on.",
      },
      {
        title: "Client-first evaluation",
        description: "Exercise existing SDKs and tools against the operations your application actually uses.",
      },
      {
        title: "MinIO migration path",
        description: "Validate familiar clients and the documented binary or container migration path in a non-production environment first.",
      },
      {
        title: "Native virtual host mode",
        description: "Evaluate virtual-host bucket addressing, domain isolation, and absolute URL behavior for your clients.",
      },
    ],
  },
  {
    title: "WebDAV",
    status: "Verify per workflow",
    description: "File-oriented access for teams that need operating-system-native workflows without leaving object storage behind.",
    items: [
      {
        title: "Native OS integration",
        description: "Evaluate remote object storage as mounted directories across Windows, macOS, and Linux clients.",
      },
      {
        title: "Direct client path",
        description: "Evaluate operating-system clients without introducing a separate data copy.",
      },
      {
        title: "Secure file operations",
        description: "Validate TLS/HTTPS transport and client behavior for the intended file workflow.",
      },
    ],
  },
  {
    title: "Swift API",
    status: "Partial coverage",
    description: "Bring private-cloud and OpenStack-compatible workloads onto the same storage foundation.",
    items: [
      {
        title: "OpenStack native support",
        description: "Evaluate the available Swift surface with the OpenStack clients and operations you require.",
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
    status: "Verify per workflow",
    description: "A secure bridge for file-transfer workloads that cannot be rewritten immediately.",
    items: [
      {
        title: "Legacy modernization",
        description: "Evaluate traditional applications and automated batch workflows against the same storage foundation.",
      },
      {
        title: "Hardened enterprise security",
        description: "Validate FTPS over TLS and credential handling for encrypted transfer in transit.",
      },
      {
        title: "Unified storage backend",
        description: "Keep S3, WebDAV, Swift, FTP(s), and MCP clients pointed at one consistent storage foundation.",
      },
    ],
  },
  {
    title: "MCP",
    status: "Preview",
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
      description="S3 is the primary, test-backed object API. Swift, WebDAV, FTP(s), and MCP extend the access surface, but each protocol and client workflow should be validated before adoption."
      sections={sections}
      variant="protocol"
      links={[
        { label: "Verify S3 coverage", href: "https://docs.rustfs.com/features/s3-compatibility/" },
        { label: "Plan protocol access", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
