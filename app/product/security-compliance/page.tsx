import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Controls & Review Surface | RustFS",
  description: "Review RustFS identity, temporary credentials, encryption, OIDC, mTLS, and audit controls by current feature status. KMS remains under validation.",
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
    status: "Available in beta",
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
        title: "Least-privilege review",
        description: "Map policy and credential boundaries to the principle of least privilege for the intended environment.",
      },
    ],
  },
  {
    title: "Data encryption",
    status: "Mixed coverage",
    description: "Protect object data at rest and keep key ownership aligned with enterprise security requirements.",
    items: [
      {
        title: "Server-side encryption modes",
        description: "Verify SSE-S3, SSE-KMS, and SSE-C behavior individually for workload-specific protection; KMS remains under validation.",
      },
      {
        title: "KMS integration under validation",
        description: "Evaluate key lifecycle, access control, and auditability requirements while KMS support remains under active validation.",
      },
      {
        title: "Encryption-by-design operations",
        description: "Keep encryption decisions close to storage policy so secure defaults can be applied consistently.",
      },
      {
        title: "Reviewable key boundaries",
        description: "Model separation between storage operators, application teams, and key owners during the security review.",
      },
    ],
  },
  {
    title: "Authentication",
    status: "Verify integration",
    description: "Integrate RustFS into enterprise identity systems without turning login and operator access into custom glue code.",
    items: [
      {
        title: "Unified OIDC-driven SSO",
        description: "Evaluate OIDC integration with the identity provider and session policies used by your organization.",
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
    status: "Verify integration",
    description: "Protect service-to-service traffic with mutual identity verification and certificate automation.",
    items: [
      {
        title: "Mutual TLS review",
        description: "Validate mutual TLS verification and service identity across the communications paths you plan to operate.",
      },
      {
        title: "Certificate lifecycle",
        description: "Verify certificate issuance and rotation with the tooling used in your deployment, including cert-manager where applicable.",
      },
    ],
  },
  {
    title: "Security audit",
    status: "Available in beta",
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
        title: "Security evidence workflows",
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
      title="Security Controls"
      description="Review policy-based access, temporary credentials, server-side encryption, OIDC, mTLS, and audit workflows as separate controls. RustFS product features support a security program; they do not constitute a compliance certification."
      sections={sections}
      variant="security"
      links={[
        { label: "Read security docs", href: "/docs" },
        { label: "Review security model", href: "/contact-us", variant: "outline" },
      ]}
    />
  );
}
