import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Compliance | RustFS",
  description: "RustFS security controls for IAM, STS temporary credentials, server-side encryption, KMS integration, authentication, and audit workflows.",
};

const sections: FeaturePageSection[] = [
  {
    title: "Identity and access management",
    description: "Define clear access boundaries for users, services, applications, and automated agents without relying on long-lived shared credentials.",
    items: [
      {
        title: "Granular policy-based access control",
        description: "Model least-privilege permissions across users, groups, roles, buckets, and operational workflows.",
      },
      {
        title: "Dynamic STS temporary credentials",
        description: "Issue token-based temporary credentials to reduce long-term secret exposure and simplify controlled delegation.",
      },
      {
        title: "Role-oriented administration",
        description: "Separate storage operations, security administration, and application access into explicit permission surfaces.",
      },
      {
        title: "Agent-ready access patterns",
        description: "Keep automation and MCP-driven workflows scoped to the minimum permissions needed for each task.",
      },
    ],
  },
  {
    title: "Data encryption",
    description: "Protect object data at rest and keep key ownership aligned with enterprise security requirements.",
    items: [
      {
        title: "Comprehensive SSE support",
        description: "Use server-side encryption modes including SSE-S3, SSE-KMS, and SSE-C for workload-specific protection.",
      },
      {
        title: "Seamless KMS integration",
        description: "Centralize key lifecycle, access control, and auditability through enterprise-grade key management systems.",
      },
      {
        title: "Encryption-by-design operations",
        description: "Keep encryption decisions close to storage policy so secure defaults can be applied consistently.",
      },
      {
        title: "Compliance-ready key boundaries",
        description: "Support deployments that need explicit separation between storage operators, application teams, and key owners.",
      },
    ],
  },
  {
    title: "Authentication and transport security",
    description: "Harden every access path from application clients to administrative operations.",
    items: [
      {
        title: "Enterprise authentication flows",
        description: "Integrate identity-driven authentication patterns for operators, applications, and temporary access sessions.",
      },
      {
        title: "Secure client connections",
        description: "Use encrypted transport paths for S3-compatible clients, administrative tooling, and service-to-service traffic.",
      },
      {
        title: "Credential exposure reduction",
        description: "Prefer scoped sessions, controlled rotation, and temporary credentials over broad permanent secrets.",
      },
      {
        title: "Consistent access surface",
        description: "Apply the same security model across S3, WebDAV, Swift, FTP(s), MCP, console, and rc operations.",
      },
    ],
  },
  {
    title: "Security audit",
    description: "Turn storage activity into reviewable operational evidence for incident response and compliance processes.",
    items: [
      {
        title: "Administrative action visibility",
        description: "Track security-sensitive control-plane activity such as access changes, key usage paths, and configuration updates.",
      },
      {
        title: "Object access traceability",
        description: "Preserve useful context around data access so teams can investigate unusual behavior without losing storage-level detail.",
      },
      {
        title: "Compliance evidence workflows",
        description: "Help operators answer who accessed what, when, and through which controlled interface.",
      },
      {
        title: "Operational review loop",
        description: "Feed audit signals into monitoring, alerting, and incident response workflows alongside RustFS telemetry.",
      },
    ],
  },
];

export default function SecurityCompliancePage() {
  return (
    <FeaturePage
      title="Security & Compliance"
      description="RustFS provides a defense-in-depth security foundation for enterprise object storage: policy-based access control, temporary credentials, server-side encryption, KMS integration, authentication, transport security, and auditable operations."
      sections={sections}
      links={[
        { label: "Review security model", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
