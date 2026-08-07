export interface IntegrationProject {
  name: string;
  description: string;
  docsUrl: string;
}

export interface IntegrationCategory {
  id: string;
  label: string;
  description: string;
  projects: IntegrationProject[];
}

export const integrationCategories: IntegrationCategory[] = [
  {
    id: "ai",
    label: "AI",
    description: "Model training and MLOps stacks that rely on object storage datasets.",
    projects: [
      {
        name: "Milvus",
        description: "Build vector database workflows on S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/milvus",
      },
      {
        name: "Nawāt",
        description: "Manage AI fine-tuning storage with RustFS as the durable S3-compatible backend for Unsloth training workflows.",
        docsUrl: "/blog/nawat-ai-training-storage-with-rustfs",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    description: "CI/CD workflows, platform engineering, and release automation.",
    projects: [
      {
        name: "GitLab",
        description: "Use OIDC SSO and S3-compatible object storage for pipelines and artifacts.",
        docsUrl: "https://docs.gitlab.com/administration/object_storage/",
      },
    ],
  },
  {
    id: "backup-restore",
    label: "Backup & Restore",
    description: "Data protection workflows for snapshots, recovery, and retention.",
    projects: [
      {
        name: "Restic",
        description: "Store encrypted repository snapshots in S3-compatible backends.",
        docsUrl: "https://restic.readthedocs.io/en/stable/",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    description: "Identity, secrets, and runtime security controls around data access.",
    projects: [
      {
        name: "Keycloak",
        description: "Use OIDC single sign-on for secure and centralized access control.",
        docsUrl: "https://docs.rustfs.com/en/security-compliance/oidc/keycloak",
      },
      {
        name: "GitLab",
        description: "Configure GitLab as OIDC identity provider for enterprise login governance.",
        docsUrl: "https://docs.rustfs.com/en/security-compliance/oidc/keycloak",
      },
    ],
  },
  {
    id: "big-data",
    label: "Big Data",
    description: "Analytics and event processing engines with large-scale data movement.",
    projects: [
      {
        name: "Iceberg",
        description: "Use open table formats with RustFS as the reliable object storage layer.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/iceberg",
      },
    ],
  },
  {
    id: "reverse-proxy",
    label: "Reverse Proxy",
    description: "Ingress and traffic control layers in front of storage services.",
    projects: [
      {
        name: "Nginx",
        description: "Expose RustFS endpoints through a battle-tested reverse proxy layer.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/reverse-proxy",
      },
      {
        name: "Traefik",
        description: "Route RustFS traffic dynamically with cloud-native gateway policies.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/reverse-proxy",
      },
      {
        name: "Caddy",
        description: "Publish RustFS services quickly with modern proxy and TLS defaults.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/reverse-proxy",
      },
      {
        name: "HAProxy",
        description: "Balance S3 traffic across nodes for high availability and scale.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/reverse-proxy",
      },
    ],
  },
];