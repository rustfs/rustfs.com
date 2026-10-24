import {
  BinaryIcon,
  CloudCogIcon,
  Code2Icon,
  DatabaseZapIcon,
  GitBranchIcon,
  NetworkIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";

const features = [
  {
    "title": "Advanced Erasure Coding",
    "plane": "Data plane",
    "token": "RS(EC)",
    "description": "Flexible Reed-Solomon EC profiles balance durability and storage efficiency.",
    "icon": DatabaseZapIcon,
    "featureDescription": "Flexible Reed-Solomon erasure-coding profiles balance storage efficiency, storage overhead, and durability for each workload.",
  },
  {
    "title": "Distributed Deployment",
    "plane": "Cluster plane",
    "token": "MNMD",
    "description": "Run across nodes and drives with high availability and predictable scale.",
    "icon": NetworkIcon,
    "featureDescription": "Deploy across multiple nodes and drives. RustFS distributes data and traffic intelligently across the cluster to deliver high availability, automatic failover, and predictable performance scaling.",
  },
  {
    "title": "Dynamic Pool Orchestration",
    "plane": "Pool plane",
    "token": "rebalance()",
    "description": "Expand, rebalance, and retire pools within erasure-coding quorum.",
    "icon": GitBranchIcon,
    "featureDescription": "Pool expansion, rebalancing, and decommissioning follow the cluster lifecycle runbook. Adding a pool requires a restart, and existing objects stay in place until rebalance. Availability during a rolling restart depends on remaining quorum.",
  },
  {
    "title": "Multi-protocol access",
    "plane": "Access plane",
    "token": "S3",
    "description": "S3 is the primary API. Swift, FTP/FTPS, WebDAV, and MCP need documented setup.",
    "icon": WorkflowIcon,
    "featureDescription": "Applications use the S3 API on the main listener. Swift, FTP/FTPS, and WebDAV are additional access paths with their own build or enablement steps. MCP is a separate server you configure against the S3 endpoint.",
  },
  {
    "title": "Defense-in-Depth Security",
    "plane": "Trust plane",
    "token": "IAM/KMS",
    "description": "Layer IAM, OIDC, STS, mTLS, KMS encryption, and audit controls.",
    "icon": ShieldCheckIcon,
    "featureDescription": "IAM, OIDC, STS, mTLS, SSE, and audit logging are product controls you configure. They are not SOC 2, ISO, or HIPAA certifications, and they are not a finished production posture until you turn them on.",
  },
  {
    "title": "Operational Control & Telemetry",
    "plane": "Ops plane",
    "token": "otel.trace",
    "description": "Track capacity, health, events, and OTEL signals from one control plane.",
    "icon": CloudCogIcon,
    "featureDescription": "Streamline operations with native OpenTelemetry integration, instant event notifications, capacity metrics, bucket and object visibility, and node health monitoring.",
  },
  {
    "title": "Cloud-native deployment",
    "plane": "Runtime plane",
    "token": "helm install",
    "description": "Use Helm Charts and a Kubernetes Operator for automated lifecycle control.",
    "icon": BinaryIcon,
    "featureDescription": "Provision, scale, and heal RustFS clusters through official Helm Charts, Kubernetes operator workflows, and cloud-native orchestration primitives.",
  },
  {
    "title": "AI & Agent-Native Infrastructure",
    "plane": "Agent plane",
    "token": "rc + MCP",
    "description": "Let agents and CI/CD pipelines query and orchestrate storage resources.",
    "icon": Code2Icon,
    "featureDescription": "RustFS is built for agentic workflows with MCP support and a powerful rc CLI so LLMs, automated agents, and CI/CD pipelines can query and orchestrate storage resources.",
  }
];

export default features;
