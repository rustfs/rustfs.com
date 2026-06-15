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
    title: "Security & Compliance",
    href: docs_url("features/security"),
    description: "Identity, transport security, encryption, and audit controls.",
    items: ["IAM management", "mTLS", "Event audit"],
  },
  {
    title: "Availability & Scale",
    href: docs_url("features/distributed"),
    description: "Distributed topology, Erasure Coding, and pool orchestration.",
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
    href: "https://rustfs.dev/",
    description: "Production best practices, technical deep dives, and expert insights.",
  },
];

export const footerNavigation = [
  {
    title: "Product features",
    links: [
      { title: "S3 Compatible", href: docs_url("features/s3-compatibility") },
      { title: "Multiple Protocol Access", href: "/product/multiple-protocol-access" },
      { title: "Operational & Observability", href: "/product/operational-observability" },
      { title: "Security & Compliance", href: docs_url("features/security") },
      { title: "Availability & Scale", href: docs_url("features/distributed") },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "RustFS Download", href: "/download" },
      { title: "rc Download", href: "/download#rc" },
      { title: "Blog", href: "https://rustfs.dev/" },
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
