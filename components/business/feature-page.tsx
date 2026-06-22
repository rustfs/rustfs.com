import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ActivityIcon,
  ArrowRightIcon,
  CheckIcon,
  DatabaseIcon,
  LockKeyholeIcon,
  NetworkIcon,
  ServerIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export interface FeaturePageSection {
  title: string;
  description?: string;
  items?: {
    title: string;
    description: string;
  }[];
}

export interface FeaturePageLink {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

export type FeaturePageVariant = "protocol" | "data" | "scale" | "ops" | "security";

interface FeaturePageProps {
  title: string;
  description: string;
  sections: FeaturePageSection[];
  links?: FeaturePageLink[];
  variant?: FeaturePageVariant;
}

const variantMeta: Record<
  FeaturePageVariant,
  {
    label: string;
    code: string;
    Icon: LucideIcon;
  }
> = {
  protocol: {
    label: "Integration surface",
    code: "S3.MCP",
    Icon: NetworkIcon,
  },
  data: {
    label: "Data surface",
    code: "S3.TABLE",
    Icon: DatabaseIcon,
  },
  scale: {
    label: "Scale surface",
    code: "EC.POOL",
    Icon: ServerIcon,
  },
  ops: {
    label: "Ops surface",
    code: "OTEL.RC",
    Icon: ActivityIcon,
  },
  security: {
    label: "Trust surface",
    code: "IAM.KMS",
    Icon: ShieldCheckIcon,
  },
};

function slugCode(value: string) {
  const stopWords = new Set(["and", "or", "the", "for", "to", "of", "with", "&"]);
  const words = value
    .split(/\s+/)
    .filter((word) => !stopWords.has(word.toLowerCase()))
    .map((word) => word.replace(/[^a-z0-9]/gi, "").toUpperCase())
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map((word) => (word.length > 4 ? word.slice(0, 4) : word))
    .join(".");
}

function flattenItems(sections: FeaturePageSection[]) {
  return sections.flatMap((section) =>
    (section.items ?? []).map((item) => ({
      ...item,
      group: section.title,
    }))
  );
}

function SectionKicker({
  index,
  label,
}: {
  index: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]">
      <span className="bg-brand px-4 py-3 text-sm tracking-[0.14em] text-brand-foreground">
        {String(index).padStart(2, "0")}
      </span>
      <span className="text-brand">&gt;</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function FeatureLine({
  item,
  index,
  compact = false,
}: {
  item: { title: string; description: string; group?: string };
  index: number;
  compact?: boolean;
}) {
  return (
    <article className="grid gap-4 border-t border-border/60 px-1 py-5 first:border-t-0 sm:grid-cols-[2.5rem_1fr] sm:items-start">
      <span className="mt-1 font-mono text-xs font-semibold text-brand">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        {item.group && (
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {slugCode(item.group)}
          </p>
        )}
        <h3 className="text-base font-semibold leading-6 text-foreground">{item.title}</h3>
        {!compact && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
        )}
      </div>
    </article>
  );
}

function MiniChip({ children }: { children: ReactNode }) {
  return (
    <span className="border border-border bg-background/70 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

function ProductLinks({ links }: { links?: FeaturePageLink[] }) {
  const productLinks = links ?? [
    { label: "Talk to us", href: "/contact-us" },
    { label: "Read docs", href: "/docs", variant: "outline" as const },
  ];

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {productLinks.map((link, index) => (
        <Button
          key={link.href}
          asChild
          variant={link.variant ?? (index === 0 ? "default" : "outline")}
          size="lg"
          className="h-12 min-w-40 px-5 text-sm font-semibold"
        >
          <Link href={link.href}>
            {link.label}
            <ArrowRightIcon data-icon="inline-end" className="size-4" />
          </Link>
        </Button>
      ))}
    </div>
  );
}

function ProtocolVisual({ sections }: { sections: FeaturePageSection[] }) {
  const labels = ["S3", "Swift", "WebDAV", "FTP(s)", "MCP"];

  return (
    <div className="motion-reveal relative overflow-hidden border border-border bg-card/55" data-motion-delay="1">
      <div className="grid grid-cols-[1fr_auto] border-b border-border">
        <span className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Native access plane
        </span>
        <code className="border-l border-border px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          Gateway free
        </code>
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-5">
        {labels.map((label, index) => (
          <div key={label} className="relative flex flex-col justify-between gap-10 bg-card/95 p-5">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              0{index + 1}
            </span>
            <div>
              <p className="text-2xl font-semibold text-foreground">{label}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {sections[index]?.title ?? "Protocol"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-3">
        {["No proxy", "No rewrite", "One source"].map((item) => (
          <div key={item} className="bg-background/80 px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function DataVisual() {
  return (
    <div className="motion-reveal border border-border bg-card/55" data-motion-delay="1">
      <div className="grid grid-cols-[1fr_auto] border-b border-border">
        <span className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Lifecycle rail
        </span>
        <code className="border-l border-border px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          S3.Table
        </code>
      </div>
      <div className="grid gap-px bg-border lg:grid-cols-[1fr_1.1fr]">
        <div className="bg-card/95 p-6">
          <div className="space-y-4">
            {["Bucket and object", "Lifecycle rules", "Multipart upload"].map((item, index) => (
              <div key={item} className="grid grid-cols-[3rem_1fr] items-center border border-border bg-background/60">
                <span className="border-r border-border px-4 py-5 font-mono text-xs text-brand">
                  0{index + 1}
                </span>
                <span className="px-4 py-5 text-sm font-semibold text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden bg-brand p-6 text-brand-foreground">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(135deg,transparent_0_20px,rgba(255,255,255,0.35)_20px_21px,transparent_21px_40px)]"
          />
          <div className="relative flex flex-col justify-between gap-12">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] opacity-80">
                Coming soon
              </p>
              <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-tight">
                S3 Tables for unified lakehouse data.
              </h2>
            </div>
            <div className="grid gap-px bg-white/25 sm:grid-cols-3">
              {["Snapshots", "Metadata", "Iceberg"].map((item) => (
                <span key={item} className="bg-brand/70 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScaleVisual() {
  return (
    <div className="motion-reveal border border-border bg-card/55" data-motion-delay="1">
      <div className="grid grid-cols-[1fr_auto] border-b border-border">
        <span className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Topology planner
        </span>
        <code className="border-l border-border px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          EC
        </code>
      </div>
      <div className="relative overflow-hidden p-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-55 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:36px_36px]"
        />
        <div className="relative grid h-full gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {["Node", "Pool", "Region"].map((item, index) => (
              <div key={item} className="border border-border bg-card/95 p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  0{index + 1}
                </p>
                <p className="mt-10 text-xl font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-4">
            {["Disk fault", "Node fault", "Rebalance", "Self-heal"].map((item) => (
              <span key={item} className="bg-background/90 px-4 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OpsVisual() {
  return (
    <div className="motion-reveal border border-border bg-card/55" data-motion-delay="1">
      <div className="grid grid-cols-[1fr_auto] border-b border-border">
        <span className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Signal flow
        </span>
        <code className="border-l border-border px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          OTEL
        </code>
      </div>
      <div className="divide-y divide-border">
        {[
          ["Console", "Pool expansion, rebalancing, object lifecycle"],
          ["OpenTelemetry", "Logs, metrics, monitoring, traces"],
          ["rc CLI", "Objects, buckets, clusters, security workflows"],
        ].map(([label, detail], index) => (
          <div key={label} className="grid gap-4 px-5 py-6 sm:grid-cols-[4rem_1fr] sm:items-center">
            <span className="font-mono text-xs font-semibold text-brand">0{index + 1}</span>
            <div>
              <p className="text-lg font-semibold text-foreground">{label}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-3">
        {["Prometheus", "Grafana", "Loki"].map((item) => (
          <span key={item} className="bg-background/80 px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="motion-reveal border border-border bg-card/55" data-motion-delay="1">
      <div className="grid grid-cols-[1fr_auto] border-b border-border">
        <span className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Zero-trust stack
        </span>
        <code className="border-l border-border px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          Audit
        </code>
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {[
          ["IAM", "Least privilege"],
          ["STS", "Temporary access"],
          ["SSE/KMS", "Key boundaries"],
          ["OIDC", "Enterprise SSO"],
          ["mTLS", "Mutual identity"],
          ["Kafka/Pulsar", "Audit streams"],
        ].map(([label, value]) => (
          <div key={label} className="bg-card px-5 py-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              {label}
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroVisual({
  variant,
  sections,
}: {
  variant: FeaturePageVariant;
  sections: FeaturePageSection[];
}) {
  if (variant === "data") {
    return <DataVisual />;
  }

  if (variant === "scale") {
    return <ScaleVisual />;
  }

  if (variant === "ops") {
    return <OpsVisual />;
  }

  if (variant === "security") {
    return <SecurityVisual />;
  }

  return <ProtocolVisual sections={sections} />;
}

function ProtocolBody({ sections }: { sections: FeaturePageSection[] }) {
  const [primarySection, ...restSections] = sections;

  return (
    <div className="grid gap-8">
      {primarySection && (
        <section className="grid overflow-hidden border border-border bg-border lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-card/55 p-6 sm:p-8">
            <MiniChip>Gateway-free access</MiniChip>
            <h2 className="mt-7 max-w-xl text-3xl font-semibold tracking-tight text-foreground">
              One storage foundation, many native clients.
            </h2>
            {primarySection.description && (
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                {primarySection.description}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {sections.map((section) => (
                <MiniChip key={section.title}>{section.title}</MiniChip>
              ))}
            </div>
          </div>
          <div className="bg-background p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {primarySection.items?.map((item, index) => (
                <article key={item.title} className={cn("border border-border bg-card/55 p-5", index === 0 && "sm:col-span-2")}>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                    0{index + 1}
                  </p>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {restSections.map((section, index) => (
          <section key={section.title} className="border-t border-border pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                  {slugCode(section.title)}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
              </div>
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                P0{index + 2}
              </span>
            </div>
            {section.description && (
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {section.description}
              </p>
            )}
            <div className="mt-5 divide-y divide-border/70 border-y border-border/70">
              {section.items?.map((item, itemIndex) => (
                <FeatureLine key={item.title} item={item} index={itemIndex} compact={itemIndex > 0} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function DataBody({ sections }: { sections: FeaturePageSection[] }) {
  const items = flattenItems(sections);
  const tableSection = sections.find((section) => section.title.toLowerCase().includes("tables"));
  const routineSections = sections.filter((section) => section !== tableSection);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <section className="border border-border bg-card/50">
        <div className="px-6 py-6 sm:px-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Object lifecycle
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
            Manage buckets, objects, lifecycle, and uploads from one S3 surface.
          </h2>
        </div>
        <div className="grid border-t border-border md:grid-cols-2">
          {items.slice(0, 6).map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "border-b border-border px-6 py-5 md:px-8",
                index % 2 === 0 && "md:border-r"
              )}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-base font-semibold leading-6 text-foreground">{item.title}</h3>
              {index < 4 && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="grid content-start gap-5">
        {tableSection && (
          <article className="relative overflow-hidden border border-brand/50 bg-card/55 p-6">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand" />
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(135deg,transparent_0_20px,var(--brand)_20px_21px,transparent_21px_40px)]"
            />
            <div className="relative">
              <MiniChip>Coming soon</MiniChip>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">{tableSection.title}</h3>
              {tableSection.description && (
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{tableSection.description}</p>
              )}
              <div className="mt-7 flex flex-wrap gap-2">
                {tableSection.items?.slice(0, 3).map((item) => (
                  <MiniChip key={item.title}>{item.title}</MiniChip>
                ))}
              </div>
            </div>
          </article>
        )}

        {routineSections.map((section) => (
          <article key={section.title} className="border-l border-border pl-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              {slugCode(section.title)}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{section.title}</h3>
            {section.description && (
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {section.description}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {section.items?.slice(0, 3).map((item) => (
                <MiniChip key={item.title}>
                  {item.title}
                </MiniChip>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ScaleBody({ sections }: { sections: FeaturePageSection[] }) {
  const items = flattenItems(sections);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <aside className="overflow-hidden border border-border bg-card/50">
        <div className="relative border-b border-border p-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
          />
          <div className="relative flex h-full items-end gap-3">
            {[
              ["SNSD", "1"],
              ["SNMD", "4"],
              ["MNMD", "16"],
            ].map(([label, value]) => (
              <div key={label} className="flex-1 border border-border bg-background/80 p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">{label}</p>
                <p className="mt-8 text-3xl font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            EC calculator
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-foreground">
            Choose parity after you know the failure domain.
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Match disk count, node count, and recovery target before production expansion.
          </p>
        </div>
        <Link
          href="/erasure-code-calculator"
          className="group flex items-center justify-between border-t border-border px-6 py-5 text-sm font-semibold text-brand sm:px-8"
        >
          Open calculator
          <ArrowRightIcon className="motion-arrow size-4" />
        </Link>
      </aside>
      <section className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <article key={section.title} className="border-t border-border pt-5">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                0{index + 1} / {slugCode(section.title)}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{section.title}</h3>
              {section.description && (
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.description}</p>
              )}
            </article>
          ))}
        </div>
        <div className="border-y border-border px-1">
          {items.slice(0, 6).map((item, index) => (
            <FeatureLine key={item.title} item={item} index={index} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

function OpsBody({ sections }: { sections: FeaturePageSection[] }) {
  const consoleSection = sections[1] ?? sections[0];
  const signalSections = sections.filter((section) => section !== consoleSection);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <section className="border border-border bg-card/50">
        <div className="px-6 py-6 sm:px-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Console operations
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
            One control plane for data, security, and pool operations.
          </h2>
        </div>
        <div className="grid border-t border-border sm:grid-cols-3">
          {consoleSection.items?.map((item) => (
            <article key={item.title} className="border-b border-border p-5 sm:border-r sm:last:border-r-0">
              <CheckIcon className="size-4 text-brand" />
              <h3 className="mt-8 text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="grid gap-6">
        {signalSections.map((section, index) => (
          <article key={section.title} className="border-t border-border pt-5">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                0{index + 1}
              </p>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {slugCode(section.title)}
              </p>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{section.title}</h3>
            <div className="mt-5 grid gap-3">
              {section.items?.slice(0, 3).map((item) => (
                <div key={item.title} className="grid grid-cols-[1rem_1fr] gap-3 text-sm leading-6 text-muted-foreground">
                  <span className="mt-2 size-1.5 bg-brand" />
                  <p>
                    <span className="font-semibold text-foreground">{item.title}</span> - {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function SecurityBody({ sections }: { sections: FeaturePageSection[] }) {
  const items = flattenItems(sections);
  const primarySections = sections.slice(0, 3);
  const restSections = sections.slice(3);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <section className="relative overflow-hidden border border-border bg-card/50 p-6 sm:p-8">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand" />
        <div className="flex items-center justify-between gap-4">
          <MiniChip>Secure by default</MiniChip>
          <LockKeyholeIcon className="size-5 text-brand" />
        </div>
        <h2 className="mt-7 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
            Layered controls from identity to evidence.
        </h2>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
          {primarySections.map((section) => (
            <article key={section.title} className="bg-background/80 p-5">
              <div className="flex items-center gap-3">
                <CheckIcon className="size-4 shrink-0 text-brand" />
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                  {slugCode(section.title)}
                </p>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{section.title}</h3>
              {section.description && (
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.description}</p>
              )}
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {restSections.map((section) => (
            <MiniChip key={section.title}>{section.title}</MiniChip>
          ))}
        </div>
      </section>
      <section className="border-y border-border py-2">
        <div className="px-1 py-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Control checklist
          </p>
        </div>
        <div>
          {items.slice(0, 7).map((item, index) => (
            <FeatureLine key={`${item.group}-${item.title}`} item={item} index={index} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

function VariantBody({
  variant,
  sections,
}: {
  variant: FeaturePageVariant;
  sections: FeaturePageSection[];
}) {
  if (variant === "data") {
    return <DataBody sections={sections} />;
  }

  if (variant === "scale") {
    return <ScaleBody sections={sections} />;
  }

  if (variant === "ops") {
    return <OpsBody sections={sections} />;
  }

  if (variant === "security") {
    return <SecurityBody sections={sections} />;
  }

  return <ProtocolBody sections={sections} />;
}

function ProductionReview({ variant }: { variant: FeaturePageVariant }) {
  const Icon = variantMeta[variant].Icon;

  return (
    <div className="mt-16 border border-border bg-card/55">
      <Link href="/contact-us" className="group relative grid gap-6 overflow-hidden p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand" />
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-15 [background-image:repeating-linear-gradient(135deg,transparent_0_20px,var(--brand)_20px_21px,transparent_21px_40px)]"
        />
        <div>
          <p className="inline-flex border border-border bg-background/70 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            Production review
          </p>
          <h2 className="mt-5 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Need help mapping this surface?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Share your topology, identity model, and operations constraints before production rollout.
          </p>
        </div>
        <span className="motion-icon-tile relative flex size-12 items-center justify-center border border-border bg-background/70 text-brand">
          <Icon className="size-5" />
          <span className="sr-only">Contact RustFS</span>
        </span>
      </Link>
    </div>
  );
}

export default function FeaturePage({
  title,
  description,
  sections,
  links,
  variant = "protocol",
}: FeaturePageProps) {
  const meta = variantMeta[variant];
  const Icon = meta.Icon;

  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="relative h-px bg-border">
          <span className="absolute left-0 top-0 h-0.5 w-28 -translate-y-px bg-brand" />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionKicker index={1} label={meta.label} />
            <div className="mt-8 inline-flex items-center gap-3 border border-border bg-card/80 px-4 py-3">
              <Icon className="size-4 text-brand" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {meta.code}
              </span>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-4xl font-extrabold leading-none text-foreground sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              {description}
            </p>
            <ProductLinks links={links} />
          </div>

          <HeroVisual variant={variant} sections={sections} />
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <VariantBody variant={variant} sections={sections} />
          <ProductionReview variant={variant} />
        </div>
      </section>
    </main>
  );
}
