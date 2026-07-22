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
    ],
  },
  {
    title: "Security audit",
    description: "Turn storage activity into reviewable operational evidence for incident response and compliance processes.",
    items: [
      {
        title: "Deep operational insights",
        description: "Spotting destructive actions instantly to safeguard critical data assets.",
      },
      {
        title: "Log streaming destination",
        description: "Forward audit trails to Kafka and Pulsar for deeper security analytics.",
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
];

export default function SecurityCompliancePage() {
  return (
    <FeaturePage
      title="Enterprise Security & Compliance"
      description="Comprehensive enterprise-grade security and compliance framework, natively encompassing authentication, authorization, log auditing, and event handling to satisfy rigorous corporate compliance mandates right out of the box."
      sections={sections}
      variant="security"
      highlightsTitle="Secure by Default"
      highlights={[
        {
          title: "Zero-Trust",
          description: "Enforcing the principle of least privilege across the entire enterprise.",
        },
        {
          title: "Defense in depth",
          description: "Implementing multi-layered protections to guarantee end-to-end security across the entire data pipeline.",
        },
        {
          title: "Out-of-the-Box",
          description: "Enabling robust protection instantly without requiring extra or complex configurations.",
        },
      ]}
      links={[
        { label: "Review security model", href: "/contact-us" },
        { label: "Read docs", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
