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
    "featureDescription": "Leverage cutting-edge Reed-Solomon algorithms to maximize storage efficiency while tuning hardware overhead and data durability for each workload.",
    "features": [
      "Flexible data and parity layouts",
      "High durability without wasteful replicas",
      "Workload-specific efficiency tuning"
    ],
  },
  {
    "title": "Distributed Deployment",
    "plane": "Cluster plane",
    "token": "MNMD",
    "description": "Run across nodes and drives with high availability and predictable scale.",
    "icon": NetworkIcon,
    "featureDescription": "Deploy across multiple nodes and drives. RustFS distributes data and traffic intelligently across the cluster to deliver high availability, automatic failover, and predictable performance scaling.",
    "features": [
      "Multi-node, multi-drive topology",
      "Automatic failover behavior",
      "Horizontal performance scaling"
    ],
  },
  {
    "title": "Dynamic Pool Orchestration",
    "plane": "Pool plane",
    "token": "rebalance()",
    "description": "Expand, rebalance, and retire pools without planned downtime.",
    "icon": GitBranchIcon,
    "featureDescription": "Take control of the full cluster lifecycle with pool expansion, automatic data rebalancing, and safe decommissioning for aging hardware without planned downtime.",
    "features": [
      "Pool-level expansion",
      "Automatic data rebalancing",
      "Zero-downtime decommissioning"
    ],
  },
  {
    "title": "Multi-Protocol Access",
    "plane": "Access plane",
    "token": "S3 + MCP",
    "description": "Expose the same storage through S3, Swift, FTP(s), WebDAV, and MCP.",
    "icon": WorkflowIcon,
    "featureDescription": "Break down data silos by letting applications use Amazon S3, OpenStack Swift, FTP(s), WebDAV, and MCP to read, write, and manage the same storage without protocol translation bottlenecks.",
    "features": [
      "Native S3 compatibility",
      "WebDAV, Swift, and FTP(s) access",
      "MCP-ready automation paths"
    ],
  },
  {
    "title": "Defense-in-Depth Security",
    "plane": "Trust plane",
    "token": "IAM/KMS",
    "description": "Layer IAM, OIDC, STS, mTLS, KMS encryption, and audit controls.",
    "icon": ShieldCheckIcon,
    "featureDescription": "Secure data infrastructure at every layer with IAM, OIDC, STS, mTLS, KMS-driven encryption, and audit controls designed for strict compliance environments.",
    "features": [
      "IAM, OIDC, and STS integration",
      "mTLS and KMS-driven encryption",
      "Security audit coverage"
    ],
  },
  {
    "title": "Operational Control & Telemetry",
    "plane": "Ops plane",
    "token": "otel.trace",
    "description": "Track capacity, health, events, and OTEL signals from one control plane.",
    "icon": CloudCogIcon,
    "featureDescription": "Streamline operations with native OpenTelemetry integration, instant event notifications, capacity metrics, bucket and object visibility, and node health monitoring.",
    "features": [
      "OpenTelemetry support",
      "Event notifications",
      "Node and capacity visibility"
    ],
  },
  {
    "title": "Cloud Native Deployment",
    "plane": "Runtime plane",
    "token": "helm install",
    "description": "Use Helm Charts and a Kubernetes Operator for automated lifecycle control.",
    "icon": BinaryIcon,
    "featureDescription": "Provision, scale, and heal RustFS clusters through official Helm Charts, Kubernetes operator workflows, and cloud-native orchestration primitives.",
    "features": [
      "Official Helm Charts",
      "Kubernetes Operator support",
      "Automated provisioning and scaling"
    ],
  },
  {
    "title": "AI & Agent-Native Infrastructure",
    "plane": "Agent plane",
    "token": "rc + MCP",
    "description": "Let agents and CI/CD pipelines query and orchestrate storage resources.",
    "icon": Code2Icon,
    "featureDescription": "RustFS is built for agentic workflows with MCP support and a powerful rc CLI so LLMs, automated agents, and CI/CD pipelines can query and orchestrate storage resources.",
    "features": [
      "Model Context Protocol support",
      "Powerful rc CLI automation",
      "Agent-friendly operational workflows"
    ],
  }
];

export default features;
