import ContactUsButton from "@/components/business/buttons/contact-us";
import DownloadLink from "@/components/business/buttons/download-link";
import { cn } from "@/lib/utils";
import { BadgeCheckIcon, Building2Icon, Code2Icon, LifeBuoyIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | RustFS",
  description: "RustFS is Apache 2.0 open-source object storage. Contact the RustFS team for enterprise support, migration, and deployment planning.",
};

function PricingCard({
  label,
  title,
  price,
  description,
  points,
  emphasized,
}: {
  label: string;
  title: string;
  price: string;
  description: string;
  points: string[];
  emphasized?: boolean;
}) {
  const isEmphasized = Boolean(emphasized);

  return (
    <article
      className={cn(
        "motion-card flex h-full flex-col overflow-hidden border border-border bg-card",
        isEmphasized && "border-brand bg-brand text-brand-foreground"
      )}
    >
      <div className={cn("relative flex flex-1 flex-col border-b border-border p-6", isEmphasized && "border-brand-foreground/20")}>
        {isEmphasized ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-14 opacity-35 [background-image:repeating-linear-gradient(135deg,transparent_0_12px,var(--brand-foreground)_12px_13px,transparent_13px_26px)]"
          />
        ) : null}
        <p className={cn("relative text-[11px] font-semibold uppercase tracking-[0.22em] text-brand", isEmphasized && "text-brand-foreground/75")}>{label}</p>
        <h2 className={cn("relative mt-4 text-2xl font-semibold text-foreground", isEmphasized && "text-brand-foreground")}>{title}</h2>
        <p className={cn("relative mt-5 font-display text-4xl font-semibold text-foreground", isEmphasized && "text-brand-foreground")}>{price}</p>
        <p className={cn("relative mt-4 text-sm leading-7 text-muted-foreground", isEmphasized && "text-brand-foreground/75")}>{description}</p>
        <div className={cn("relative mt-6 grid grid-cols-[auto_1fr_auto] border border-border text-[10px] font-semibold uppercase tracking-[0.12em]", isEmphasized && "border-brand-foreground/25")}>
          <span className={cn("border-r border-border px-3 py-2 text-muted-foreground", isEmphasized && "border-brand-foreground/25 text-brand-foreground/70")}>Path</span>
          <span className={cn("px-3 py-2 text-foreground", isEmphasized && "text-brand-foreground")}>{label}</span>
          <span className={cn("border-l border-border px-3 py-2 text-muted-foreground", isEmphasized && "border-brand-foreground/25 text-brand-foreground/70")}>
            {price === "$0" ? "OSS" : price === "Custom" ? "SLA" : "Plan"}
          </span>
        </div>
      </div>
      <ul className="grid grid-rows-4">
        {points.map((point) => (
          <li
            key={point}
            className={cn(
              "flex min-h-20 gap-3 border-b border-border px-6 py-4 last:border-b-0 lg:h-20",
              isEmphasized && "border-brand-foreground/20"
            )}
          >
            <BadgeCheckIcon className={cn("motion-icon-tile mt-0.5 size-4 shrink-0 text-brand", isEmphasized && "text-brand-foreground")} />
            <span className={cn("text-sm leading-6 text-foreground", isEmphasized && "text-brand-foreground")}>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingPage() {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Pricing</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              Open-source storage, clear support path.
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:ml-auto">
              Run RustFS freely, then involve the team for deployment planning, migration, and production support.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <DownloadLink className="!h-12 !px-5 !py-0 leading-none" />
              <ContactUsButton className="!h-12 !px-5 !py-0 leading-none bg-background text-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:bg-muted hover:text-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          <PricingCard
            label="Open source"
            title="Self-hosted RustFS"
            price="$0"
            description="Use RustFS under Apache 2.0 for development, testing, and production deployments you operate yourself."
            points={[
              "Apache 2.0 license",
              "S3-compatible object storage",
              "Server binaries, Docker, and Kubernetes paths",
              "Community issue tracking on GitHub",
            ]}
          />
          <PricingCard
            label="Production"
            title="Deployment support"
            price="Talk to us"
            description="For teams moving from evaluation to production and needing topology, migration, and operations planning."
            emphasized
            points={[
              "Migration planning from existing object storage",
              "Capacity and topology review",
              "Operational readiness guidance",
              "Enterprise requirements discovery",
            ]}
          />
          <PricingCard
            label="Enterprise"
            title="Ongoing assistance"
            price="Custom"
            description="For organizations that need a long-running support relationship around RustFS operations."
            points={[
              "Production troubleshooting path",
              "Upgrade and observability review",
              "Security and IAM workflow consultation",
              "Roadmap and deployment alignment",
            ]}
          />
        </div>
      </section>

      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div className="motion-card overflow-hidden border border-border bg-card">
            <div className="relative min-h-56 border-b border-border bg-background p-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
              />
              <div className="relative grid h-full content-end gap-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Support path</p>
                <h2 className="max-w-md text-2xl font-semibold text-foreground">
                  Start open source, add planning when production risk appears.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-px bg-border text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {["Evaluate", "Plan", "Operate"].map((item) => (
                <span key={item} className="bg-card px-4 py-4">{item}</span>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card">
            {[
              [Code2Icon, "Evaluate without sales friction", "Download the server, run Docker, or install through Kubernetes before starting a commercial conversation."],
              [Building2Icon, "Plan around your environment", "Storage topology, compliance, network, and observability needs vary by organization and workload."],
              [LifeBuoyIcon, "Add support when it matters", "Use enterprise support for production migration, operations, and long-term deployment confidence."],
            ].map(([Icon, title, description]) => (
              <div
                key={title as string}
                className="motion-card group grid gap-4 border-b border-border px-5 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
              >
                <span className="motion-icon-tile flex size-11 items-center justify-center border border-border bg-background text-brand">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{title as string}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{description as string}</p>
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Ready
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
