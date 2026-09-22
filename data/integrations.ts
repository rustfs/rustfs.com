export interface IntegrationProject {
  name: string;
  description: string;
  docsUrl: string;
  logo?: string;
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
      {
        name: "OpenObserve",
        description: "Store OpenObserve logs, metrics, and traces in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/openobserve",
        logo: "/images/integrations/openobserve-logo.png",
      },
      {
        name: "Harbor",
        description: "Store Harbor container registry images and charts in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/registry/harbor",
      },
      {
        name: "Loki",
        description: "Store Loki log data durably in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/loki",
      },
      {
        name: "Tempo",
        description: "Keep Tempo distributed traces in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/tempo",
      },
      {
        name: "Terraform",
        description: "Use S3-compatible object storage as the Terraform state backend.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/devops/terraform",
      },
      {
        name: "Elasticsearch",
        description: "Store Elasticsearch snapshots in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/devops/elasticsearch",
      },
      {
        name: "Jenkins",
        description: "Store Jenkins build artifacts in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/devops/jenkins",
      },
      {
        name: "Gitea",
        description: "Store Gitea LFS, packages, and attachments in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/devops/gitea",
      },
      {
        name: "OpenTelemetry",
        description: "Export RustFS telemetry with the OpenTelemetry (OTEL) standard.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/opentelemetry",
      },
      {
        name: "Thanos",
        description: "Keep Thanos metrics blocks in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/thanos",
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
      {
        name: "Trino",
        description: "Run distributed SQL queries over data lakes in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/trino",
      },
      {
        name: "Flink",
        description: "Back Flink checkpoints and state with S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/flink",
      },
      {
        name: "Spark",
        description: "Read and write lakehouse data from Spark jobs in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/spark",
      },
      {
        name: "ClickHouse",
        description: "Store ClickHouse disks and backups in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/clickhouse",
      },
      {
        name: "PyIceberg",
        description: "Work with Iceberg tables in S3-compatible object storage using PyIceberg.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/pyiceberg",
      },
      {
        name: "Doris",
        description: "Power Apache Doris analytics with S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/doris",
      },
      {
        name: "OpenDAL",
        description: "Connect applications to S3-compatible object storage through Apache OpenDAL.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/opendal",
      },
      {
        name: "MLflow",
        description: "Store MLflow artifacts and model registries in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/mlflow",
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    description: "Embedded and analytical databases that read and write data in object storage.",
    projects: [
      {
        name: "DuckDB",
        description: "Run fast in-process SQL analytics over data lakes stored in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/duckdb",
      },
      {
        name: "InfluxDB",
        description: "Store InfluxDB time-series data in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/influxdb",
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