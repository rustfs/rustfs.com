export interface NavigationFeature {
  title: string;
  href: string;
  items?: {
    title: string;
    href: string;
  }[];
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  features?: NavigationFeature[];
}

export const productNavigation: NavigationItem[] = [
  {
    title: "Replication",
    href: "/product/replication",
    features: [
      { title: "Bucket Replication", href: "/product/replication#bucket-replication" },
      { title: "Site Replication", href: "/product/replication#site-replication" },
    ],
  },
  {
    title: "Multi-protocol access",
    href: "/product/multiple-protocol-access",
    features: [
      { title: "S3 API compatibility", href: "/product/multiple-protocol-access#s3-api-compatibility" },
      { title: "WebDAV", href: "/product/multiple-protocol-access#webdav" },
      { title: "Swift API", href: "/product/multiple-protocol-access#swift-api" },
      { title: "FTP/FTPS", href: "/product/multiple-protocol-access#ftp-ftps" },
      { title: "MCP", href: "/product/multiple-protocol-access#mcp" },
    ],
  },
  {
    title: "S3 Over RDMA",
    href: "/product/rdma",
    features: [
      { title: "S3 HTTPS and RDMA", href: "/product/rdma#s3-over-rdma" },
      { title: "Last-hop transports", href: "/product/rdma#last-hop-transports" },
      { title: "I/O flow", href: "/product/rdma#io-flow" },
      { title: "Laboratory results", href: "/product/rdma#laboratory-performance" },
    ],
  },
  {
    title: "Data Management",
    href: "/product/data-management",
    features: [
      { title: "On-demand migration", href: "/product/data-management#on-demand-migration" },
      { title: "S3", href: "/product/data-management#s3" },
      { title: "S3 Tables", href: "/product/data-management#s3-tables" },
    ],
  },
  {
    title: "High Availability & Scale",
    href: "/product/high-availability-scale",
    features: [
      { title: "Distributed deployment", href: "/product/high-availability-scale#distributed-deployment" },
      { title: "EC configuration", href: "/product/high-availability-scale#ec-configuration" },
      { title: "Elastic scaling", href: "/product/high-availability-scale#elastic-scaling" },
      { title: "Node healing", href: "/product/high-availability-scale#node-healing" },
    ],
  },
  {
    title: "Security & Compliance",
    href: "/product/security-compliance",
    features: [
      { title: "Identity and access management", href: "/product/security-compliance#identity-and-access-management" },
      { title: "Data encryption", href: "/product/security-compliance#data-encryption" },
      { title: "Security audit", href: "/product/security-compliance#security-audit" },
      { title: "Authentication", href: "/product/security-compliance#authentication" },
      { title: "mTLS", href: "/product/security-compliance#mtls" },
    ],
  },
  {
    title: "Operations & observability",
    href: "/product/operational-observability",
    features: [
      { title: "Multi-tenant management", href: "/product/operational-observability#multi-tenant-management" },
      { title: "Console operations", href: "/product/operational-observability#console-operations" },
      { title: "OTEL support", href: "/product/operational-observability#otel-support" },
      { title: "Cluster insights", href: "/product/operational-observability#cluster-insights" },
      { title: "RustFS client CLI (rc)", href: "/product/operational-observability#rustfs-client-cli" },
    ],
  },
];

export const resourceNavigation: NavigationItem[] = [
  {
    title: "EC Calculator",
    href: "/erasure-code-calculator",
    description: "Optimal EC configurations for durability and storage efficiency.",
  },
  {
    title: "Config Generator",
    href: "/rustfs-config-generator",
    description: "Generate a ready-to-use /etc/default/rustfs configuration file.",
  },
  {
    title: "Multi-tenant management",
    href: "/product/operational-observability#multi-tenant-management",
    description: "Operator-driven elastic scaling, MNMD provisioning, and tenant isolation.",
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
  {
    title: "Knowledge Center",
    href: "/knowledge-center",
    description: "Object storage and RustFS concepts explained from first principles.",
  },
];

export const footerNavigation = [
  {
    title: "Product",
    links: [
      { title: "Replication", href: "/product/replication" },
      { title: "S3-compatible", href: "/product/multiple-protocol-access#s3-api-compatibility" },
      { title: "S3 Tables", href: "/product/data-management#s3-tables" },
      { title: "On-demand migration", href: "/product/data-management#on-demand-migration" },
      { title: "Multi-protocol access", href: "/product/multiple-protocol-access" },
      { title: "S3 Over RDMA", href: "/product/rdma" },
      { title: "Data Management", href: "/product/data-management" },
      { title: "High Availability & Scale", href: "/product/high-availability-scale" },
      { title: "Operations & observability", href: "/product/operational-observability" },
      { title: "Multi-tenant management", href: "/product/operational-observability#multi-tenant-management" },
      { title: "Security & Compliance", href: "/product/security-compliance" },

    ],
  },
  {
    title: "Resources",
    links: [
      { title: "RustFS Download", href: "/download" },
      { title: "Download rc (CLI)", href: "/download/cli" },
      { title: "Blog", href: "/blog" },
      { title: "Knowledge Center", href: "/knowledge-center" },
      { title: "EC Calculator", href: "/erasure-code-calculator" },
      { title: "Config Generator", href: "/rustfs-config-generator" },
      { title: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Legal", href: "https://github.com/rustfs/rustfs/blob/main/LICENSE" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Cookie Policy", href: "/cookie-policy" },
      { title: "Contact", href: "/contact-us/" },
    ],
  },
];
