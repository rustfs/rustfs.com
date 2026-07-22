"use client";

import { DataFlowLine } from "@/components/business/data-flow-motion";
import { cn } from "@/lib/utils";
import AppleIcon from "@/public/svgs/brands/apple.svg";
import DockerIcon from "@/public/svgs/brands/docker.svg";
import KubernetesIcon from "@/public/svgs/brands/kubernetes.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import GrafanaLogo from "@/public/svgs/softwares/grafana.svg";
import KafkaLogo from "@/public/svgs/softwares/kafka.svg";
import PrometheusLogo from "@/public/svgs/softwares/prometheus.svg";
import {
  ActivityIcon,
  BlocksIcon,
  BoxIcon,
  CheckIcon,
  CircleGaugeIcon,
  DatabaseIcon,
  FileKeyIcon,
  FileTextIcon,
  FingerprintIcon,
  FolderKeyIcon,
  KeyRoundIcon,
  LockKeyholeIcon,
  RadioTowerIcon,
  RefreshCwIcon,
  ScrollTextIcon,
  ServerIcon,
  ShieldCheckIcon,
  SquareTerminalIcon,
  TablePropertiesIcon,
  UserRoundCheckIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

type ProductIllustrationVariant = "data" | "scale" | "ops" | "security";

interface ProductSectionIllustrationProps {
  variant: ProductIllustrationVariant;
  sectionIndex: number;
}

function IllustrationFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      data-product-illustration={label}
      className="relative h-full min-h-80 overflow-hidden border border-border bg-card p-5 sm:p-7"
    >
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative flex h-full min-h-64 flex-col">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <div className="flex flex-1 items-center justify-center py-5">{children}</div>
      </div>
    </div>
  );
}

function Tile({
  icon: Icon,
  label,
  detail,
  accent = false,
  className,
}: {
  icon: LucideIcon;
  label: string;
  detail?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-border bg-background/95 p-3",
        accent && "border-brand/60 bg-brand/5",
        className
      )}
    >
      <Icon className={cn("size-4 text-muted-foreground", accent && "text-brand")} />
      <p className="mt-3 text-xs font-semibold text-foreground">{label}</p>
      {detail ? (
        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
          {detail}
        </p>
      ) : null}
    </div>
  );
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, delay: delay * 0.08, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function S3ManagementVisual() {
  return (
    <IllustrationFrame label="Object lifecycle">
      <div className="grid w-full max-w-lg grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.2fr)] items-center gap-3">
        <div className="grid gap-2">
          <Tile icon={BoxIcon} label="Multipart object" detail="uploading" />
          <Tile icon={FileTextIcon} label="Object metadata" detail="versioned" />
        </div>
        <DataFlowLine direction="horizontal" className="w-8 sm:w-12" />
        <div className="border border-brand/60 bg-brand/5 p-4">
          <div className="flex items-center gap-3">
            <DatabaseIcon className="size-5 text-brand" />
            <div>
              <p className="text-sm font-semibold text-foreground">S3 bucket</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">policy active</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Hot", "Warm", "Archive"].map((tier, index) => (
              <Reveal key={tier} delay={index * 0.12}>
                <div className="border border-border bg-background px-2 py-3 text-center">
                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {tier}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function S3TablesVisual() {
  return (
    <IllustrationFrame label="S3 Tables">
      <div className="w-full max-w-lg">
        <div className="grid grid-cols-4 gap-2">
          {["01", "02", "03", "04"].map((file, index) => (
            <Reveal key={file} delay={index * 0.08}>
              <div className="border border-border bg-background p-3 text-center">
                <FileTextIcon className="mx-auto size-4 text-muted-foreground" />
                <span className="mt-2 block font-mono text-[8px] text-muted-foreground">PARQUET {file}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <DataFlowLine direction="vertical" className="mx-auto h-7" />
        <div className="border border-brand/60 bg-brand/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TablePropertiesIcon className="size-5 text-brand" />
              <p className="text-sm font-semibold text-foreground">Managed table</p>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-brand">Iceberg</span>
          </div>
          <div className="mt-4 space-y-2">
            {[78, 58, 88].map((width) => (
              <span
                key={width}
                className="block h-1.5 bg-brand/35"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function DistributedVisual() {
  return (
    <IllustrationFrame label="Distributed cluster">
      <div className="relative w-full max-w-md p-3">
        <div className="absolute left-1/2 top-1/2 h-px w-2/3 -translate-x-1/2 bg-border" />
        <div className="absolute left-1/2 top-1/2 h-2/3 w-px -translate-y-1/2 bg-border" />
        <div className="relative grid grid-cols-2 gap-8">
          {["Node A", "Node B", "Node C", "Node D"].map((node, index) => (
            <Reveal key={node} delay={index * 0.1}>
              <Tile
                icon={ServerIcon}
                label={node}
                detail={index === 3 ? "recovering" : "available"}
                accent={index === 3}
              />
            </Reveal>
          ))}
        </div>
        <motion.span
          className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 bg-brand shadow-[0_0_18px_var(--color-brand)]"
          animate={{ opacity: [0.45, 1, 0.45], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </IllustrationFrame>
  );
}

function ErasureCodingVisual() {
  const blocks = [
    { label: "D1", accent: false },
    { label: "D2", accent: false },
    { label: "D3", accent: false },
    { label: "P1", accent: true },
    { label: "P2", accent: true },
  ];

  return (
    <IllustrationFrame label="Erasure set">
      <div className="w-full max-w-lg">
        <div className="mx-auto flex max-w-xs items-center justify-center gap-3 border border-border bg-background p-4">
          <BlocksIcon className="size-5 text-brand" />
          <span className="text-sm font-semibold text-foreground">Object data</span>
        </div>
        <DataFlowLine direction="vertical" className="mx-auto h-8" />
        <div className="grid grid-cols-5 gap-2">
          {blocks.map((block, index) => (
            <Reveal key={block.label} delay={index * 0.1}>
              <div
                className={cn(
                  "flex aspect-square items-center justify-center border border-border bg-background font-mono text-xs font-semibold text-muted-foreground",
                  block.accent && "border-brand/60 bg-brand/5 text-brand"
                )}
              >
                {block.label}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>data shards</span>
          <span>parity</span>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function ScalingVisual() {
  const groups = [2, 4, 6];

  return (
    <IllustrationFrame label="Online expansion">
      <div className="grid w-full max-w-lg grid-cols-3 items-end gap-3">
        {groups.map((count, groupIndex) => (
          <Reveal key={count} delay={groupIndex * 0.16}>
            <div className={cn("border border-border bg-background p-3", groupIndex === 2 && "border-brand/60 bg-brand/5")}>
              <div className="grid grid-cols-2 gap-1.5">
                {Array.from({ length: count }).map((_, index) => (
                  <span
                    key={index}
                    className={cn("h-5 border border-border bg-card", groupIndex === 2 && "border-brand/30")}
                  />
                ))}
              </div>
              <span className="mt-3 block font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                {groupIndex === 0 ? "PB" : groupIndex === 1 ? "PB+" : "EB ready"}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </IllustrationFrame>
  );
}

function HealingVisual() {
  return (
    <IllustrationFrame label="Self-healing">
      <div className="w-full max-w-lg">
        <div className="grid grid-cols-4 gap-2">
          {["A", "B", "C", "D"].map((block, index) => (
            <div
              key={block}
              className={cn(
                "relative flex aspect-square items-center justify-center overflow-hidden border border-border bg-background font-mono text-xs text-muted-foreground",
                index === 2 && "border-brand/60 text-brand"
              )}
            >
              {block}
              {index === 2 ? (
                <motion.span
                  className="absolute inset-x-0 h-px bg-brand shadow-[0_0_10px_var(--color-brand)]"
                  animate={{ top: ["15%", "85%", "15%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border border-brand/60 bg-brand/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <RefreshCwIcon className="size-4 text-brand" />
            </motion.span>
            <span className="text-xs font-semibold text-foreground">Reconstructing shard C</span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-brand">verified</span>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function ConsoleVisual() {
  return (
    <IllustrationFrame label="RustFS Console">
      <div className="grid w-full max-w-lg grid-cols-[4.5rem_1fr] border border-border bg-background">
        <div className="border-r border-border p-3">
          <DatabaseIcon className="size-5 text-brand" />
          <div className="mt-5 space-y-2">
            {[22, 32, 26, 36].map((width) => (
              <span key={width} className="block h-1 bg-muted-foreground/25" style={{ width }} />
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Nodes", "12"],
              ["Capacity", "84%"],
              ["Objects", "1.5M"],
            ].map(([label, value], index) => (
              <Reveal key={label} delay={index * 0.1}>
                <div className="border border-border bg-card p-2.5">
                  <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
                  <strong className="mt-2 block text-sm text-foreground">{value}</strong>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-3 border border-border bg-card p-3">
            <div className="flex items-center justify-between text-[9px] text-muted-foreground">
              <span>Cluster capacity</span>
              <span>healthy</span>
            </div>
            <div className="mt-3 h-2 bg-background">
              <span
                className="block h-full bg-brand"
                style={{ width: "84%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function OtelVisual() {
  return (
    <IllustrationFrame label="OpenTelemetry pipeline">
      <div className="grid w-full max-w-lg grid-cols-[minmax(0,0.7fr)_auto_minmax(0,1.3fr)] items-center gap-3">
        <div className="grid gap-2">
          <div className="flex items-center gap-3 border border-border bg-background p-3">
            <DockerIcon className="size-5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Docker</span>
          </div>
          <div className="flex items-center gap-3 border border-border bg-background p-3">
            <KubernetesIcon className="size-5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Kubernetes</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <DataFlowLine direction="horizontal" className="w-8 sm:w-10" />
          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">OTel</span>
        </div>
        <div className="grid gap-2">
          <Reveal>
            <div className="flex h-11 items-center border border-border bg-background px-3">
              <PrometheusLogo className="h-6 w-28 max-w-full text-foreground" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex h-11 items-center border border-border bg-background px-3">
              <GrafanaLogo className="h-6 w-24 max-w-full text-foreground" />
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex h-11 items-center gap-3 border border-border bg-background px-3">
              <ScrollTextIcon className="size-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground">Loki</span>
            </div>
          </Reveal>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function InsightsVisual() {
  return (
    <IllustrationFrame label="Live cluster insights">
      <div className="grid w-full max-w-lg grid-cols-[1fr_0.9fr] gap-3">
        <div className="border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">Node health</span>
            <ActivityIcon className="size-4 text-brand" />
          </div>
          <div className="mt-5 grid grid-cols-8 gap-1">
            {Array.from({ length: 32 }).map((_, index) => (
              <span
                key={index}
                className="aspect-square bg-brand/55"
                style={{ opacity: index % 7 === 0 ? 0.45 : 1 }}
              />
            ))}
          </div>
          <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">30 days available</p>
        </div>
        <div className="grid gap-3">
          <Tile icon={CircleGaugeIcon} label="84% used" detail="capacity" accent />
          <Tile icon={BoxIcon} label="1.5M objects" detail="live count" />
        </div>
      </div>
    </IllustrationFrame>
  );
}

function CliVisual() {
  return (
    <IllustrationFrame label="rc client">
      <div className="w-full max-w-lg">
        <div className="border border-border bg-[#050505] p-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span className="text-brand">$</span>
            <span>rc admin info production</span>
            <motion.span
              className="h-3 w-px bg-brand"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["nodes 12", "drives 96", "status online"].map((item, index) => (
              <Reveal key={item} delay={0.3 + index * 0.1}>
                <span className="block border border-border px-2 py-2 font-mono text-[8px] text-muted-foreground">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[
            { label: "Linux", Icon: SquareTerminalIcon },
            { label: "macOS", Icon: AppleIcon },
            { label: "Windows", Icon: WindowsIcon },
            { label: "Docker", Icon: DockerIcon },
          ].map(({ label, Icon }) => (
            <div key={label} className="border border-border bg-background p-2 text-center">
              <Icon className="mx-auto size-4 text-muted-foreground" />
              <span className="mt-2 block font-mono text-[7px] uppercase tracking-[0.1em] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </IllustrationFrame>
  );
}

function IamVisual() {
  return (
    <IllustrationFrame label="Policy decision">
      <div className="grid w-full max-w-lg grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="grid gap-2">
          <Tile icon={UsersIcon} label="Users & groups" />
          <Tile icon={FingerprintIcon} label="Temporary identity" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <DataFlowLine direction="horizontal" className="w-8" />
          <span className="flex size-10 items-center justify-center border border-brand/60 bg-brand/5">
            <ShieldCheckIcon className="size-4 text-brand" />
          </span>
          <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-brand">allow</span>
        </div>
        <Tile icon={FolderKeyIcon} label="Scoped resources" detail="least privilege" accent />
      </div>
    </IllustrationFrame>
  );
}

function EncryptionVisual() {
  return (
    <IllustrationFrame label="Server-side encryption">
      <div className="grid w-full max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Tile icon={FileTextIcon} label="Plain object" detail="upload" />
        <div className="flex flex-col items-center gap-2">
          <DataFlowLine direction="horizontal" className="w-8" />
          <motion.span
            className="flex size-12 items-center justify-center border border-brand/60 bg-brand/5"
            animate={{ boxShadow: ["0 0 0px transparent", "0 0 18px var(--color-brand)", "0 0 0px transparent"] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <LockKeyholeIcon className="size-5 text-brand" />
          </motion.span>
          <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-brand">KMS key</span>
        </div>
        <div className="border border-brand/60 bg-brand/5 p-4">
          <FileKeyIcon className="size-5 text-brand" />
          <p className="mt-3 text-xs font-semibold text-foreground">Encrypted object</p>
          <div className="mt-3 grid grid-cols-4 gap-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((block) => (
              <motion.span
                key={block}
                className="h-3 bg-brand/25"
                animate={{ opacity: [0.3, 0.85, 0.3] }}
                transition={{ delay: block * 0.08, duration: 1.8, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function AuditVisual() {
  return (
    <IllustrationFrame label="Audit stream">
      <div className="grid w-full max-w-lg grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="grid gap-2">
          {[
            ["PUT", "bucket-a/report"],
            ["DENY", "policy/update"],
            ["GET", "archive/object"],
          ].map(([verb, path], index) => (
            <Reveal key={path} delay={index * 0.08}>
              <div className="border border-border bg-background p-2.5 font-mono text-[8px] text-muted-foreground">
                <span className="mr-2 text-brand">{verb}</span>{path}
              </div>
            </Reveal>
          ))}
        </div>
        <DataFlowLine direction="horizontal" className="w-8 sm:w-10" />
        <div className="grid gap-2">
          <div className="flex h-12 items-center border border-border bg-background px-3">
            <KafkaLogo className="h-8 w-28 max-w-full text-foreground" />
          </div>
          <div className="flex h-12 items-center gap-3 border border-border bg-background px-3">
            <RadioTowerIcon className="size-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Pulsar</span>
          </div>
        </div>
      </div>
    </IllustrationFrame>
  );
}

function AuthenticationVisual() {
  return (
    <IllustrationFrame label="OIDC sign-in">
      <div className="grid w-full max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Tile icon={UserRoundCheckIcon} label="Identity provider" detail="SSO session" />
        <div className="flex flex-col items-center gap-2">
          <DataFlowLine direction="horizontal" className="w-8" />
          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">OIDC</span>
        </div>
        <div className="grid gap-2">
          <Tile icon={CircleGaugeIcon} label="Console" accent />
          <Tile icon={SquareTerminalIcon} label="rc CLI" />
        </div>
      </div>
    </IllustrationFrame>
  );
}

function MtlsVisual() {
  return (
    <IllustrationFrame label="Mutual TLS">
      <div className="w-full max-w-lg">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Tile icon={ServerIcon} label="RustFS node A" detail="certificate valid" accent />
          <div className="flex flex-col items-center gap-3">
            <DataFlowLine direction="horizontal" className="w-10" />
            <div className="flex size-10 items-center justify-center border border-brand/60 bg-brand/5">
              <KeyRoundIcon className="size-4 text-brand" />
            </div>
            <DataFlowLine direction="horizontal" reverse className="w-10" />
          </div>
          <Tile icon={ServerIcon} label="RustFS node B" detail="certificate valid" accent />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-brand">
          <CheckIcon className="size-4" />
          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em]">mutual identity verified</span>
        </div>
      </div>
    </IllustrationFrame>
  );
}

const illustrations: Record<ProductIllustrationVariant, ((props: { sectionIndex: number }) => ReactNode)> = {
  data: ({ sectionIndex }) => (sectionIndex === 0 ? <S3ManagementVisual /> : <S3TablesVisual />),
  scale: ({ sectionIndex }) => {
    const visuals = [<DistributedVisual key="distributed" />, <ErasureCodingVisual key="ec" />, <ScalingVisual key="scaling" />, <HealingVisual key="healing" />];
    return visuals[sectionIndex] ?? visuals[0];
  },
  ops: ({ sectionIndex }) => {
    const visuals = [<ConsoleVisual key="console" />, <OtelVisual key="otel" />, <InsightsVisual key="insights" />, <CliVisual key="cli" />];
    return visuals[sectionIndex] ?? visuals[0];
  },
  security: ({ sectionIndex }) => {
    const visuals = [<IamVisual key="iam" />, <EncryptionVisual key="encryption" />, <AuditVisual key="audit" />, <AuthenticationVisual key="authentication" />, <MtlsVisual key="mtls" />];
    return visuals[sectionIndex] ?? visuals[0];
  },
};

export default function ProductSectionIllustration({ variant, sectionIndex }: ProductSectionIllustrationProps) {
  return <MotionConfig reducedMotion="user">{illustrations[variant]({ sectionIndex })}</MotionConfig>;
}
