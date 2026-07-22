import { docs_url } from "@/lib/utils";

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  items?: string[];
}

export const productNavigation: NavigationItem[] = [
  {
    title: "Multiple Protocol Access",
    href: "/product/multiple-protocol-access",
    description: "Native S3, WebDAV, Swift, FTP(s), and MCP access.",
    items: ["S3", "WebDAV", "Swift", "FTP(s)", "MCP"],
  },
  {
    title: "Data Management",
    href: "/product/data-management",
    description: "Buckets, lifecycle, Object Lock, versioning, multipart upload, and S3 Tables.",
    items: ["Lifecycle", "Versioning", "S3 Tables"],
  },
  {
    title: "High Availability & Scale",
    href: "/product/high-availability-scale",
    description: "Distributed topology, Erasure Coding, pool orchestration, and self-healing.",
    items: ["EC", "Rebalance", "Healing"],
  },
  {
    title: "Security & Compliance",
    href: "/product/security-compliance",
    description: "Identity, OIDC, mTLS, encryption, KMS, audit, and event handling.",
    items: ["IAM", "OIDC", "mTLS", "SSE/KMS"],
  },
  {
    title: "Operational & Observability",
    href: "/product/operational-observability",
    description: "Cluster management, OTEL signals, and rc operations.",
    items: ["Cluster management", "OTEL", "rc"],
  },
];

export const resourceNavigation: NavigationItem[] = [
  {
    title: "EC Calculator",
    href: "/erasure-code-calculator",
    description: "Optimal EC configurations for durability and storage efficiency.",
  },
  {
    title: "Documentation",
    href: "/docs",
    description: "Deploy, configure, and manage RustFS from quickstarts to API references.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Production best practices, technical deep dives, and expert insights.",
  },
];

export const footerNavigation = [
  {
    title: "Product features",
    links: [
      { title: "S3 Compatible", href: docs_url("developer/sdk") },
      { title: "Multiple Protocol Access", href: "/product/multiple-protocol-access" },
      { title: "Data Management", href: "/product/data-management" },
      { title: "High Availability & Scale", href: "/product/high-availability-scale" },
      { title: "Operational & Observability", href: "/product/operational-observability" },
      { title: "Security & Compliance", href: "/product/security-compliance" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "RustFS Download", href: "/download" },
      { title: "rc Download", href: "/download/cli" },
      { title: "Blog", href: "/blog" },
      { title: "EC Calculator", href: "/erasure-code-calculator" },
      { title: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Legal", href: "https://github.com/rustfs/rustfs/blob/main/LICENSE" },
      { title: "Contact us", href: "/contact-us" },
    ],
  },
];
