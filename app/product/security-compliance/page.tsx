import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Security & Compliance | RustFS",
  description: "RustFS provides enterprise-grade authentication, authorization, log auditing, event handling, SSE/KMS encryption, OIDC SSO, and mTLS security controls.",
  keywords: [
    "RustFS",
    "security compliance",
    "IAM",
    "STS",
    "SSE",
    "KMS",
    "OIDC",
    "mTLS",
    "audit logging",
    "Kafka",
    "Pulsar",
  ],
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
        title: "Zero-trust by default",
        description: "Enforce the principle of least privilege across the entire storage environment.",
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
    title: "Authentication",
    description: "Integrate RustFS into enterprise identity systems without turning login and operator access into custom glue code.",
    items: [
      {
        title: "Unified OIDC-driven SSO",
        description: "Integrate seamlessly with enterprise identity providers to enable frictionless single sign-on.",
      },
      {
        title: "Visual console integration",
        description: "Simplify OIDC infrastructure setup and reduce operational complexity.",
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
    title: "mTLS",
    description: "Protect service-to-service traffic with mutual identity verification and certificate automation.",
    items: [
      {
        title: "Zero-trust mTLS",
        description: "Enforce mutual TLS verification to achieve bi-directional identity authentication across communications.",
      },
      {
        title: "Automated certificate management",
        description: "Support cert-manager natively to automate certificate issuance and rotation.",
      },
    ],
  },
  {
    title: "Security audit",
    description: "Turn storage activity into reviewable operational evidence for incident response and compliance processes.",
    items: [
      {
        title: "Administrative action visibility",
        description: "Spot destructive actions and security-sensitive control-plane changes quickly.",
      },
      {
        title: "Log streaming destination",
        description: "Forward audit trails to Kafka and Pulsar for deeper security analytics.",
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
      description="RustFS provides a defense-in-depth security foundation for enterprise object storage: policy-based access control, temporary credentials, server-side encryption, KMS integration, OIDC authentication, mTLS, and auditable operations."
      sections={sections}
      variant="security"
      links={[
        { label: "Review security model", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
