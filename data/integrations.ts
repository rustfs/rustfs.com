export interface IntegrationProject {
  name: string;
  description: string;
  docsUrl: string;
  logo?: string;
  // Official project homepage. When present, the logo links here, as required
  // by the Apache Software Foundation, Linux Foundation/CNCF, and HashiCorp
  // trademark policies for referential logo use.
  projectUrl?: string;
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
        logo: "/images/integrations/milvus-logo.svg",
        projectUrl: "https://milvus.io",
      },
      {
        name: "Nawāt",
        description: "Manage AI fine-tuning storage with RustFS as the durable S3-compatible backend for Unsloth training workflows.",
        docsUrl: "/blog/nawat-ai-training-storage-with-rustfs",
      },
      {
        name: "Ray",
        description: "Read and write Ray datasets and checkpoints in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/ai/ray",
        logo: "/images/integrations/ray-logo.svg",
        projectUrl: "https://www.ray.io",
      },
      {
        name: "vLLM",
        description: "Load and serve vLLM model weights from S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/ai/vllm",
        logo: "/images/integrations/vllm-logo.png",
        projectUrl: "https://vllm.dev",
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
        projectUrl: "https://openobserve.ai",
      },
      {
        name: "Harbor",
        description: "Store Harbor container registry images and charts in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/registry/harbor",
        logo: "/images/integrations/harbor-logo.svg",
        projectUrl: "https://goharbor.io",
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
        logo: "/images/integrations/terraform-logo.svg",
        projectUrl: "https://www.terraform.io",
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
        logo: "/images/integrations/jenkins-logo.svg",
        projectUrl: "https://www.jenkins.io",
      },
      {
        name: "Gitea",
        description: "Store Gitea LFS, packages, and attachments in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/devops/gitea",
        logo: "/images/integrations/gitea-logo.svg",
        projectUrl: "https://about.gitea.com",
      },
      {
        name: "OpenTelemetry",
        description: "Export RustFS telemetry with the OpenTelemetry (OTEL) standard.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/opentelemetry",
        logo: "/images/integrations/opentelemetry-logo.svg",
        projectUrl: "https://opentelemetry.io",
      },
      {
        name: "Thanos",
        description: "Keep Thanos metrics blocks in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/thanos",
        logo: "/images/integrations/thanos-logo.svg",
        projectUrl: "https://thanos.io",
      },
      {
        name: "Fluentd",
        description: "Ship and archive Fluentd logs in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/fluentd",
        logo: "/images/integrations/fluentd-logo.svg",
        projectUrl: "https://www.fluentd.org",
      },
      {
        name: "GreptimeDB",
        description: "Store GreptimeDB time-series data in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/greptimedb",
        logo: "/images/integrations/greptimedb-logo.png",
        projectUrl: "https://greptime.com",
      },
      {
        name: "rclone",
        description: "Sync and manage files in S3-compatible object storage with rclone.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/others/rclone",
        logo: "/images/integrations/rclone-logo.svg",
        projectUrl: "https://rclone.org",
      },
      {
        name: "tusd",
        description: "Store resumable tus uploads in S3-compatible object storage with tusd.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/others/tusd",
        logo: "/images/integrations/tusd-logo.svg",
        projectUrl: "https://tus.io",
      },
      {
        name: "VictoriaMetrics",
        description: "Back up and restore VictoriaMetrics metrics in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/observability/victoriametrics",
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
        logo: "/images/integrations/restic-logo.png",
        projectUrl: "https://restic.net",
      },
      {
        name: "Velero",
        description: "Back up and restore Kubernetes clusters with Velero backups in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/backup/velero",
        logo: "/images/integrations/velero-logo.svg",
        projectUrl: "https://velero.io",
      },
      {
        name: "Kopia",
        description: "Store deduplicated, encrypted backup snapshots in S3-compatible backends.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/backup/kopia",
        logo: "/images/integrations/kopia-logo.svg",
        projectUrl: "https://kopia.io",
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
        logo: "/images/integrations/keycloak-logo.svg",
        projectUrl: "https://www.keycloak.org",
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
        name: "Apache Iceberg™",
        description: "Use Apache Iceberg™ open table formats with RustFS as the reliable object storage layer.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/iceberg",
        logo: "/images/integrations/iceberg-logo.svg",
        projectUrl: "https://iceberg.apache.org",
      },
      {
        name: "Trino",
        description: "Run distributed SQL queries over data lakes in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/trino",
      },
      {
        name: "Apache Flink®",
        description: "Back Apache Flink® checkpoints and state with S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/flink",
        logo: "/images/integrations/flink-logo.svg",
        projectUrl: "https://flink.apache.org",
      },
      {
        name: "Apache Spark™",
        description: "Read and write lakehouse data from Apache Spark™ jobs in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/spark",
        logo: "/images/integrations/spark-logo.png",
        projectUrl: "https://spark.apache.org",
      },
      {
        name: "ClickHouse",
        description: "Store ClickHouse disks and backups in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/clickhouse",
      },
      {
        name: "PyIceberg",
        description: "Work with Apache Iceberg™ tables in S3-compatible object storage using PyIceberg.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/pyiceberg",
      },
      {
        name: "Apache Doris®",
        description: "Power Apache Doris® analytics with S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/doris",
        logo: "/images/integrations/doris-logo.svg",
        projectUrl: "https://doris.apache.org",
      },
      {
        name: "Apache OpenDAL™",
        description: "Connect applications to S3-compatible object storage through Apache OpenDAL™.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/opendal",
        logo: "/images/integrations/opendal-logo.svg",
        projectUrl: "https://opendal.apache.org",
      },
      {
        name: "MLflow",
        description: "Store MLflow artifacts and model registries in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/mlflow",
        logo: "/images/integrations/mlflow-logo.svg",
        projectUrl: "https://mlflow.org",
      },
      {
        name: "Apache Zeppelin™",
        description: "Explore data lakes from Apache Zeppelin™ notebooks backed by S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/zeppelin",
        logo: "/images/integrations/zeppelin-logo.svg",
        projectUrl: "https://zeppelin.apache.org",
      },
      {
        name: "Apache Hudi™",
        description: "Build incremental data lakes with Apache Hudi™ tables in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/hudi",
        logo: "/images/integrations/hudi-logo.png",
        projectUrl: "https://hudi.apache.org",
      },
      {
        name: "lakeFS",
        description: "Manage data lake branches and versions with lakeFS on S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/lakefs",
        logo: "/images/integrations/lakefs-logo.png",
        projectUrl: "https://lakefs.io",
      },
      {
        name: "Apache Airflow®",
        description: "Store Apache Airflow® task logs and artifacts in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/airflow",
        logo: "/images/integrations/airflow-logo.svg",
        projectUrl: "https://airflow.apache.org",
      },
      {
        name: "Apache Kafka®",
        description: "Land Apache Kafka® topic data durably in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/kafka",
        logo: "/images/integrations/kafka-logo.svg",
        projectUrl: "https://kafka.apache.org",
      },
      {
        name: "Delta Lake",
        description: "Use Delta Lake table format with RustFS as the reliable object storage layer.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/delta-lake",
        logo: "/images/integrations/delta-logo.svg",
        projectUrl: "https://delta.io",
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
      {
        name: "Vitess",
        description: "Store Vitess backups and exports in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/big-data/vitess",
        logo: "/images/integrations/vitess-logo.svg",
        projectUrl: "https://vitess.io",
      },
    ],
  },
  {
    id: "cloud-native",
    label: "Cloud Native",
    description: "Kubernetes-native components for GitOps delivery, metrics, and cluster operations.",
    projects: [
      {
        name: "Cortex",
        description: "Keep Cortex metrics chunks in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/cloud-native/cortex",
        logo: "/images/integrations/cortex-logo.svg",
        projectUrl: "https://cortexmetrics.io",
      },
      {
        name: "Flux",
        description: "Use S3-compatible object storage as a Flux source for Kubernetes GitOps artifacts.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/cloud-native/flux",
        logo: "/images/integrations/flux-logo.svg",
        projectUrl: "https://fluxcd.io",
      },
      {
        name: "JuiceFS",
        description: "Build JuiceFS shared file systems on S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/others/juicefs",
        logo: "/images/integrations/juicefs-logo.svg",
        projectUrl: "https://juicefs.com",
      },
      {
        name: "Nextcloud",
        description: "Store Nextcloud files in S3-compatible object storage.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/others/nextcloud",
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
        logo: "/images/integrations/traefik-logo.svg",
        projectUrl: "https://traefik.io",
      },
      {
        name: "Caddy",
        description: "Publish RustFS services quickly with modern proxy and TLS defaults.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/reverse-proxy",
        logo: "/images/integrations/caddy-logo.svg",
        projectUrl: "https://caddyserver.com",
      },
      {
        name: "HAProxy",
        description: "Balance S3 traffic across nodes for high availability and scale.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/reverse-proxy",
        logo: "/images/integrations/haproxy-logo.svg",
        projectUrl: "https://www.haproxy.com",
      },
      {
        name: "Envoy",
        description: "Expose RustFS endpoints through the Envoy edge and service proxy.",
        docsUrl: "https://docs.rustfs.com/en/developer/integration/reverse-proxy/envoy",
        logo: "/images/integrations/envoy-logo.svg",
        projectUrl: "https://www.envoyproxy.io",
      },
    ],
  },
];