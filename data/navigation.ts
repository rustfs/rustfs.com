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
    description: "Primary S3 access with WebDAV, Swift, FTP(s), and MCP evaluation paths.",
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
    title: "Security Controls",
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
    title: "S3 Compatibility Overview",
    href: "https://docs.rustfs.com/features/s3-compatibility/",
    description: "Published S3 coverage notes and the current verification scope.",
  },
  {
    title: "Release Status",
    href: "https://github.com/rustfs/rustfs#feature--status",
    description: "Current beta maturity and feature availability from the source repository.",
  },
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
    description: "Engineering updates, operator guidance, and project perspectives.",
  },
];

export const footerNavigation = [
  {
    title: "Product features",
    links: [
      { title: "S3 Compatible", href: docs_url("features/s3-compatibility") },
      { title: "Multiple Protocol Access", href: "/product/multiple-protocol-access" },
      { title: "Data Management", href: "/product/data-management" },
      { title: "High Availability & Scale", href: "/product/high-availability-scale" },
      { title: "Operational & Observability", href: "/product/operational-observability" },
      { title: "Security Controls", href: "/product/security-compliance" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "RustFS Download", href: "/download" },
      { title: "rc Download", href: "/download#rc" },
      { title: "Blog", href: "/blog" },
      { title: "EC Calculator", href: "/erasure-code-calculator" },
      { title: "Documentation", href: "/docs" },
      { title: "S3 Compatibility Overview", href: "https://docs.rustfs.com/features/s3-compatibility/" },
      { title: "Release Status", href: "https://github.com/rustfs/rustfs#feature--status" },
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
