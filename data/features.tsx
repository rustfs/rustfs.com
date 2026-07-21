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
    "status": "Available in beta",
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
    "status": "Active validation",
    "description": "Evaluate multi-node, multi-drive layouts while distributed mode is under active validation.",
    "icon": NetworkIcon,
    "featureDescription": "Deploy across multiple nodes and drives and validate failure behavior against your topology. Distributed mode is available for evaluation and remains under active beta validation.",
    "features": [
      "Multi-node, multi-drive topology",
      "Failure-domain evaluation",
      "Topology-specific scale testing"
    ],
  },
  {
    "title": "Dynamic Pool Orchestration",
    "plane": "Pool plane",
    "token": "rebalance()",
    "status": "Active validation",
    "description": "Evaluate expansion, rebalancing, and decommissioning workflows for your topology.",
    "icon": GitBranchIcon,
    "featureDescription": "Test pool expansion, data rebalancing, and decommissioning workflows against your hardware and operational requirements before production rollout.",
    "features": [
      "Pool-level expansion",
      "Automatic data rebalancing",
      "Decommissioning workflows under validation"
    ],
  },
  {
    "title": "Multi-Protocol Access",
    "plane": "Access plane",
    "token": "S3 + MCP",
    "status": "Mixed coverage",
    "description": "Start with broad S3 coverage and verify each additional protocol for your workflow.",
    "icon": WorkflowIcon,
    "featureDescription": "RustFS centers on broad S3 API coverage and is expanding Swift, WebDAV, FTP(s), and MCP access. Validate the exact protocol operations your application relies on.",
    "features": [
      "Published S3 compatibility overview",
      "Swift, WebDAV, and FTP(s) evaluation paths",
      "MCP automation in preview"
    ],
  },
  {
    "title": "Defense-in-Depth Security",
    "plane": "Trust plane",
    "token": "IAM/KMS",
    "status": "Mixed coverage",
    "description": "Evaluate IAM, transport security, encryption, and audit controls by feature status.",
    "icon": ShieldCheckIcon,
    "featureDescription": "Build a security review around IAM, OIDC, STS, mTLS, encryption, and audit controls. KMS remains under validation, and product controls are not a compliance certification.",
    "features": [
      "IAM, OIDC, and STS integration",
      "mTLS and encryption controls",
      "KMS integration under validation"
    ],
  },
  {
    "title": "Operational Control & Telemetry",
    "plane": "Ops plane",
    "token": "otel.trace",
    "status": "Available in beta",
    "description": "Track capacity, health, events, and OTEL signals from one control plane.",
    "icon": CloudCogIcon,
    "featureDescription": "Review OpenTelemetry integration, event notifications, capacity metrics, bucket and object visibility, and node health monitoring as one operator workflow.",
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
    "status": "Available in beta",
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
    "status": "Preview",
    "description": "Explore rc and MCP automation without making agent workflows the deployment baseline.",
    "icon": Code2Icon,
    "featureDescription": "Use the rc CLI for repeatable administration and explore MCP-based automation as an emerging workflow. Treat agent integrations as preview capabilities.",
    "features": [
      "Model Context Protocol support",
      "Powerful rc CLI automation",
      "Agent-friendly operational workflows"
    ],
  }
];

export default features;
