import ContactUsButton from "@/components/business/buttons/contact-us";
import DownloadLink from "@/components/business/buttons/download-link";
import { Badge } from "@/components/ui/badge";
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
  chips,
  emphasized,
}: {
  label: string;
  title: string;
  price: string;
  description: string;
  points: string[];
  chips: string[];
  emphasized?: boolean;
}) {
  const isEmphasized = Boolean(emphasized);

  return (
    <article
      className={cn(
        "flex h-full flex-col border-t-2 border-border bg-transparent",
        isEmphasized && "border-brand"
      )}
    >
      <div className="relative flex flex-1 flex-col border-b border-border px-1 py-6 lg:px-6">
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{label}</p>
        <h2 className="relative mt-4 text-2xl font-semibold text-foreground">{title}</h2>
        <p className="relative mt-5 font-display text-3xl font-semibold text-foreground">{price}</p>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Badge
              key={chip}
              variant="outline"
              className={cn(
                "h-7 bg-background/45 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
                isEmphasized && "border-brand/40 bg-brand/5 text-brand"
              )}
            >
              {chip}
            </Badge>
          ))}
        </div>
        <p className="relative mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
        <div className="relative mt-auto pt-6">
          <div className="grid grid-cols-[auto_1fr_auto] border-y border-border text-[10px] font-semibold uppercase tracking-[0.12em]">
            <span className="border-r border-border px-3 py-2 text-muted-foreground">Path</span>
            <span className="px-3 py-2 text-foreground">{label}</span>
            <span className="border-l border-border px-3 py-2 text-muted-foreground">
              {price === "$0" ? "OSS" : price === "Custom" ? "SLA" : "Plan"}
            </span>
          </div>
        </div>
      </div>
      <ul>
        {points.map((point) => (
          <li
            key={point}
            className={cn(
              "flex gap-3 border-b border-border px-1 py-4 last:border-b-0 lg:px-6"
            )}
          >
            <BadgeCheckIcon className="motion-icon-tile mt-0.5 size-4 shrink-0 text-brand" />
            <span className="text-sm leading-6 text-foreground">{point}</span>
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

        <div className="mt-12 grid items-stretch gap-8 border-y border-border lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border">
          <PricingCard
            label="Open source"
            title="Self-hosted RustFS"
            price="$0"
            description="Use RustFS under Apache 2.0 for development, testing, and production deployments you operate yourself."
            chips={["Apache 2.0", "Self-hosted"]}
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
            chips={["Planning", "Migration"]}
            points={[
              "Migration planning",
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
            chips={["SLA path", "Enterprise"]}
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
          <div className="flex overflow-hidden border-y border-border">
            <div className="flex w-full flex-col">
              <div className="relative border-b border-border bg-background p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
                />
                <div className="relative">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Support path</p>
                  <h2 className="mt-4 max-w-md text-2xl font-semibold leading-tight text-foreground">
                    Open source first. Add support when the risk is real.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                    Validate freely, then bring us in when topology, migration, or operations need review.
                  </p>
                </div>
              </div>
              <div className="grid flex-1 divide-y divide-border">
                {[
                  ["Evaluate", "Run RustFS without a sales gate."],
                  ["Plan", "Review topology and migration pressure."],
                  ["Operate", "Add support for production ownership."],
                ].map(([title, detail]) => (
                  <div key={title} className="px-5 py-5">
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{title}</span>
                      <span className="mt-1 block text-sm leading-6 text-muted-foreground">{detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-y border-border">
            {[
              [Code2Icon, "Evaluate without sales friction", "Download the server, run Docker, or install through Kubernetes before starting a commercial conversation."],
              [Building2Icon, "Plan around your environment", "Storage topology, compliance, network, and observability needs vary by organization and workload."],
              [LifeBuoyIcon, "Add support when it matters", "Use enterprise support for production migration, operations, and long-term deployment confidence."],
            ].map(([Icon, title, description]) => (
              <div
                key={title as string}
                className="grid gap-4 border-b border-border px-5 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
              >
                <span className="flex size-11 items-center justify-center border border-border bg-background text-brand">
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
