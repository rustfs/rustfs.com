import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "product/security-compliance/" },
  title: "Security & Compliance | RustFS",
  description: "RustFS includes IAM, STS, SSE/KMS, OIDC, audit targets, and mTLS. Configure them before production. This page describes product controls, not SOC 2, ISO, or HIPAA certification.",
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
    description: "RustFS includes a built-in IAM system. Root credentials from the server environment bypass identity-policy checks, so production use means creating users, groups, and policies.",
    items: [
      {
        title: "Granular policy-based access control",
        description: "Model least-privilege permissions across users, groups, roles, buckets, and operational workflows.",
      },
      {
        title: "Dynamic STS temporary credentials",
        description: "Issue token-based temporary credentials to reduce long-term secret exposure and simplify controlled delegation.",
      },
    ],
  },
  {
    title: "Data encryption",
    description: "Protect object data at rest and keep key ownership aligned with enterprise security requirements.",
    items: [
      {
        title: "SSE-S3, SSE-KMS, and SSE-C",
        description: "Server-side encryption modes are available after you configure them. SSE-S3 uses the configured KMS to wrap per-object keys. It is not already enabled for production data.",
        href: "https://docs.rustfs.com/en/security-compliance/encryption",
      },
      {
        title: "KMS when you enable it",
        description: "SSE-KMS can use a local backend, Vault KV2, or Vault Transit. KMS is off until RUSTFS_KMS_ENABLE is set and the backend is configured.",
        href: "https://docs.rustfs.com/en/security-compliance/encryption",
      },
    ],
  },
  {
    title: "Security audit",
    description: "Audit records can support incident review after you enable a target. Audit delivery is disabled by default, and a target is not a compliance certification.",
    items: [
      {
        title: "Request-level audit records",
        description: "When an audit target is enabled, RustFS can send request activity to an external system for review. Delivery is off until you configure it.",
        href: "https://docs.rustfs.com/en/security-compliance/audit-logs",
      },
      {
        title: "Audit targets you enable",
        description: "Audit delivery is disabled by default. After you configure a target, supported families include webhook, Kafka, and Pulsar.",
        href: "https://docs.rustfs.com/en/security-compliance/audit-logs",
      },
    ],
  },
  {
    title: "Authentication",
    description: "Integrate RustFS into enterprise identity systems without turning login and operator access into custom glue code.",
    items: [
      {
        title: "OIDC for Console SSO",
        description: "Console single sign-on needs an OIDC provider, a confidential client, a callback URL, and claim-to-policy mapping. It is not active until that setup is done.",
        href: "https://docs.rustfs.com/en/security-compliance/oidc",
      },
      {
        title: "Provider setup required",
        description: "Follow the provider guide for your identity system. RustFS policies still authorize S3 and admin operations after the provider authenticates the user.",
      },
    ],
  },
  {
    title: "mTLS",
    description: "Protect service-to-service traffic with mutual identity verification and certificate automation.",
    items: [
      {
        title: "mTLS when enabled",
        description: "Mutual TLS is off until RUSTFS_SERVER_MTLS_ENABLE is set and client certificates are in place. On Kubernetes, the Helm chart can turn it on.",
        href: "https://docs.rustfs.com/en/installation/cloud-native/helm-chart/mtls",
      },
      {
        title: "cert-manager on Kubernetes",
        description: "The Helm chart can use cert-manager to issue and renew Ingress and mTLS certificates when you enable that configuration. Install cert-manager first.",
        href: "https://docs.rustfs.com/en/installation/cloud-native/helm-chart/cert-manager",
      },
    ],
  },
];

export default function SecurityCompliancePage() {
  return (
    <FeaturePage
      title="Security & Compliance"
      description="RustFS ships identity, encryption, audit, and transport controls. Built-in does not mean already configured for production. Change default credentials, define IAM policies, enable TLS, and turn on encryption or audit targets before you expose a cluster. The controls on this page are product features, not SOC 2, ISO, or HIPAA certifications."
      sections={sections}
      variant="security"
      highlightsTitle="Configure before production"
      highlights={[
        {
          title: "Least privilege",
          description: "IAM can model least privilege. Root credentials bypass identity policies until you create users and attach policies.",
        },
        {
          title: "Separate controls",
          description: "Access, encryption, audit delivery, and TLS are configured separately. Enabling one does not enable the others.",
        },
        {
          title: "Not a certification",
          description: "These controls can support a review. RustFS does not claim SOC 2, ISO, or HIPAA certification on this page.",
        },
      ]}
      links={[
        { label: "Download", href: "/download" },
        { label: "Security checklist", href: "https://docs.rustfs.com/en/installation/requirement/checklists/security-checklists", variant: "outline" },
      ]}
    />
  );
}
