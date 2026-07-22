import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AppleIcon from "@/public/svgs/brands/apple.svg";
import WindowsIcon from "@/public/svgs/brands/windows.svg";
import { DataFlowLine, DataFlowPulse } from "./data-flow-motion";
import ProductSectionIllustration from "./product-section-illustration";
import {
  ActivityIcon,
  ArrowRightIcon,
  BotIcon,
  BracesIcon,
  CheckIcon,
  CloudCogIcon,
  CloudIcon,
  DatabaseIcon,
  FolderIcon,
  LockIcon,
  MonitorCogIcon,
  NetworkIcon,
  ServerCogIcon,
  ServerIcon,
  ShieldCheckIcon,
  SquareTerminalIcon,
  TimerResetIcon,
  WorkflowIcon,
  WrenchIcon,
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
  highlightsTitle?: string;
  highlights?: {
    title: string;
    description: string;
  }[];
}

const variantMeta: Record<
  FeaturePageVariant,
  {
    Icon: LucideIcon;
  }
> = {
  protocol: {
    Icon: NetworkIcon,
  },
  data: {
    Icon: DatabaseIcon,
  },
  scale: {
    Icon: ServerIcon,
  },
  ops: {
    Icon: ActivityIcon,
  },
  security: {
    Icon: ShieldCheckIcon,
  },
};

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

function VisualFrame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full min-h-80 items-center overflow-hidden border border-border bg-card p-6 [&>*]:w-full sm:p-8"
    >
      {children}
    </div>
  );
}

function DiagramNode({
  icon: Icon,
  label,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border border-border bg-background px-4 py-4",
        accent && "border-brand/60 bg-brand/5"
      )}
    >
      <Icon className={cn("size-4 shrink-0 text-muted-foreground", accent && "text-brand")} />
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

function S3ProtocolVisual() {
  return (
    <VisualFrame>
      <div className="grid min-h-64 items-center gap-4 sm:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.1fr)]">
        <div className="grid gap-3">
          <DataFlowPulse delay={0}>
            <DiagramNode icon={BracesIcon} label="AWS SDKs" />
          </DataFlowPulse>
          <DataFlowPulse delay={0.18}>
            <DiagramNode icon={CloudIcon} label="Cloud apps" />
          </DataFlowPulse>
          <DataFlowPulse delay={0.36}>
            <DiagramNode icon={SquareTerminalIcon} label="S3 tools" />
          </DataFlowPulse>
        </div>
        <div className="flex items-center justify-center gap-2 text-brand sm:flex-col">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">S3 API</span>
          <DataFlowLine direction="vertical" className="sm:hidden" />
          <DataFlowLine direction="horizontal" className="hidden sm:block" />
        </div>
        <DataFlowPulse delay={0.9} accent>
          <div className="border border-brand/60 bg-brand/5 p-5">
            <DatabaseIcon className="size-5 text-brand" />
            <p className="mt-5 text-xl font-semibold text-foreground">RustFS object layer</p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {["Object", "Bucket", "Policy"].map((label) => (
                <span
                  key={label}
                  className="border border-border bg-background px-2 py-3 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </DataFlowPulse>
      </div>
    </VisualFrame>
  );
}

function WebDavProtocolVisual() {
  const platforms = [
    { label: "Windows", Icon: WindowsIcon },
    { label: "macOS", Icon: AppleIcon },
    { label: "Linux", Icon: SquareTerminalIcon },
  ];

  return (
    <VisualFrame>
      <div className="flex min-h-64 flex-col justify-center">
        <div className="grid grid-cols-3 gap-3">
          {platforms.map(({ label, Icon }, index) => (
            <DataFlowPulse key={label} delay={index * 0.18}>
              <div className="border border-border bg-background p-4 text-center">
                <Icon className="mx-auto size-5 text-muted-foreground" />
                <p className="mt-3 text-xs font-semibold text-foreground">{label}</p>
              </div>
            </DataFlowPulse>
          ))}
        </div>
        <DataFlowLine direction="vertical" className="mx-auto" />
        <DataFlowPulse className="mx-auto w-full max-w-md" delay={0.9} accent>
          <div className="flex items-center gap-4 border border-brand/60 bg-brand/5 p-5">
            <FolderIcon className="size-8 text-brand" />
            <div>
              <p className="text-lg font-semibold text-foreground">Mounted RustFS storage</p>
              <p className="mt-1 text-xs text-muted-foreground">Native WebDAV access</p>
            </div>
          </div>
        </DataFlowPulse>
      </div>
    </VisualFrame>
  );
}

function SwiftProtocolVisual() {
  return (
    <VisualFrame>
      <div className="mx-auto grid min-h-64 w-full max-w-md content-center">
        <DataFlowPulse accent>
          <DiagramNode icon={CloudCogIcon} label="OpenStack" accent />
        </DataFlowPulse>
        <DataFlowLine direction="vertical" className="mx-auto h-7" />
        <div className="grid grid-cols-2 gap-3">
          <DataFlowPulse delay={0.45}>
            <DiagramNode icon={NetworkIcon} label="Private cloud" />
          </DataFlowPulse>
          <DataFlowPulse delay={0.63}>
            <DiagramNode icon={BracesIcon} label="Swift clients" />
          </DataFlowPulse>
        </div>
        <DataFlowLine direction="vertical" className="mx-auto h-7" delay={0.45} />
        <DataFlowPulse delay={1.08} accent>
          <DiagramNode icon={CloudCogIcon} label="RustFS Swift endpoint" accent />
        </DataFlowPulse>
      </div>
    </VisualFrame>
  );
}

function FtpProtocolVisual() {
  return (
    <VisualFrame>
      <div className="grid min-h-64 items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-3">
          <DataFlowPulse>
            <DiagramNode icon={MonitorCogIcon} label="Legacy apps" />
          </DataFlowPulse>
          <DataFlowPulse delay={0.18}>
            <DiagramNode icon={TimerResetIcon} label="Batch jobs" />
          </DataFlowPulse>
        </div>
        <div className="flex flex-col items-center gap-3 text-brand">
          <DataFlowLine direction="vertical" className="sm:hidden" />
          <DataFlowLine direction="horizontal" className="hidden sm:block" />
          <DataFlowPulse delay={0.58} accent>
            <span className="flex size-12 items-center justify-center border border-brand/60 bg-brand/5">
              <LockIcon className="size-5" />
            </span>
          </DataFlowPulse>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]">FTPS / TLS</span>
          <DataFlowLine direction="vertical" className="sm:hidden" delay={0.45} />
          <DataFlowLine direction="horizontal" className="hidden sm:block" delay={0.45} />
        </div>
        <DataFlowPulse delay={1.08} accent>
          <div className="border border-brand/60 bg-brand/5 p-5">
            <ServerCogIcon className="size-5 text-brand" />
            <p className="mt-5 text-xl font-semibold text-foreground">RustFS transfer endpoint</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Encrypted file transfer into object storage</p>
          </div>
        </DataFlowPulse>
      </div>
    </VisualFrame>
  );
}

function McpProtocolVisual() {
  return (
    <VisualFrame>
      <div className="mx-auto flex min-h-64 w-full max-w-lg flex-col justify-center">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "AI agent", Icon: BotIcon },
            { label: "Automation", Icon: WorkflowIcon },
            { label: "Tool client", Icon: WrenchIcon },
          ].map(({ label, Icon }, index) => (
            <DataFlowPulse key={label} delay={index * 0.18}>
              <div className="border border-border bg-background p-4 text-center">
                <Icon className="mx-auto size-5 text-muted-foreground" />
                <p className="mt-3 text-xs font-semibold text-foreground">{label}</p>
              </div>
            </DataFlowPulse>
          ))}
        </div>
        <DataFlowLine direction="vertical" className="mx-auto h-6" />
        <DataFlowPulse delay={0.7} accent>
          <DiagramNode icon={WrenchIcon} label="Controlled MCP tools" accent />
        </DataFlowPulse>
        <DataFlowLine direction="vertical" className="mx-auto h-6" delay={0.45} />
        <DataFlowPulse delay={1.25} accent>
          <DiagramNode icon={DatabaseIcon} label="RustFS objects and operations" accent />
        </DataFlowPulse>
      </div>
    </VisualFrame>
  );
}

function ProtocolIllustration({ section }: { section: FeaturePageSection }) {
  const title = section.title.toLowerCase();

  if (title.includes("webdav")) return <WebDavProtocolVisual />;
  if (title.includes("swift")) return <SwiftProtocolVisual />;
  if (title.includes("ftp")) return <FtpProtocolVisual />;
  if (title.includes("mcp")) return <McpProtocolVisual />;
  return <S3ProtocolVisual />;
}

function SectionIllustration({
  variant,
  sectionIndex,
  section,
}: {
  variant: FeaturePageVariant;
  sectionIndex: number;
  section: FeaturePageSection;
}) {
  if (variant === "protocol") {
    return <ProtocolIllustration section={section} />;
  }

  return <ProductSectionIllustration variant={variant} sectionIndex={sectionIndex} />;
}

function FeatureSection({
  section,
  sectionIndex,
  variant,
}: {
  section: FeaturePageSection;
  sectionIndex: number;
  variant: FeaturePageVariant;
}) {
  const items = section.items ?? [];
  const reverse = sectionIndex % 2 === 1;

  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {section.title}
        </h2>
        {section.description ? (
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {section.description}
          </p>
        ) : null}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        <div className={cn("h-full", reverse && "lg:order-2")}>
          <SectionIllustration
            variant={variant}
            sectionIndex={sectionIndex}
            section={section}
          />
        </div>

        <div className={cn("h-full divide-y divide-border border border-border bg-card", reverse && "lg:order-1")}>
          {items.map((item) => (
            <article key={item.title} className="grid gap-4 p-6 sm:grid-cols-[2.5rem_1fr]">
              <span className="flex size-9 items-center justify-center bg-background text-brand">
                <CheckIcon className="size-4" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductionReview({ variant }: { variant: FeaturePageVariant }) {
  const Icon = variantMeta[variant].Icon;

  return (
    <div className="border border-border bg-card p-6 sm:p-8">
      <Link
        href="/contact-us"
        className="group grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"
      >
        <span className="flex size-12 items-center justify-center bg-background text-brand">
          <Icon className="size-5" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Plan your RustFS deployment
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Share your topology, identity model, and operations constraints with the RustFS team.
          </p>
        </div>
        <ArrowRightIcon className="motion-arrow size-5 text-brand" />
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
  highlightsTitle,
  highlights,
}: FeaturePageProps) {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <h1 className="font-display text-5xl font-extrabold leading-tight text-foreground sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-base leading-8 text-muted-foreground">
          {description}
        </p>
        <ProductLinks links={links} />
        {highlights?.length ? (
          <div className="mt-12">
            {highlightsTitle ? (
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {highlightsTitle}
              </h2>
            ) : null}
            <dl className="mt-5 grid gap-4 md:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="border border-border bg-card p-5 sm:p-6"
                >
                  <dt className="font-semibold text-foreground">{highlight.title}</dt>
                  <dd className="mt-3 text-sm leading-7 text-muted-foreground">
                    {highlight.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {sections.map((section, sectionIndex) => (
          <FeatureSection
            key={section.title}
            section={section}
            sectionIndex={sectionIndex}
            variant={variant}
          />
        ))}
        <ProductionReview variant={variant} />
      </div>
    </main>
  );
}
