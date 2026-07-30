import ContactUsButton from "@/components/business/buttons/contact-us";
import DownloadLink from "@/components/business/buttons/download-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, BadgeCheckIcon, Building2Icon, Code2Icon, LifeBuoyIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | RustFS",
  description: "RustFS is Apache 2.0 open-source object storage. Contact the RustFS team for enterprise support, migration, and deployment planning.",
};

function PricingCard({
  label,
  title,
  description,
  points,
  chips,
  action,
  emphasized,
}: {
  label: string;
  title: string;
  description: string;
  points: string[];
  chips: string[];
  action: { label: string; href: string };
  emphasized?: boolean;
}) {
  const isEmphasized = Boolean(emphasized);

  return (
    <article
      className={cn(
        "flex h-full flex-col border border-border bg-card",
        isEmphasized && "border-brand"
      )}
    >
      <div className="relative flex flex-1 flex-col border-b border-border p-6">
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{label}</p>
        <h2 className="relative mt-4 font-display text-3xl font-semibold text-foreground">{title}</h2>
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
          <Button asChild variant={isEmphasized ? "default" : "outline"} size="lg" className="h-11 px-4 text-sm font-semibold">
            <Link href={action.href}>
              {action.label}
              <ArrowRightIcon data-icon="inline-end" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
      <ul>
        {points.map((point) => (
          <li
            key={point}
            className={cn(
              "flex gap-3 border-b border-border px-6 py-4 last:border-b-0"
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
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Pricing</p>
          <h1 className="mt-5 w-full font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
            Get Started with RustFS
          </h1>
          <div className="mt-6 flex flex-col items-start gap-6">
            <p className="w-full text-base leading-8 text-muted-foreground">
              From local testing to petabyte-scale production clusters—get fast, memory-safe, and S3-compatible object storage up and running in minutes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <DownloadLink className="!h-12 !px-5 !py-0 leading-none" />
              <ContactUsButton className="!h-12 !px-5 !py-0 leading-none bg-background text-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:bg-muted hover:text-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-2">
          <PricingCard
            label="Personal"
            title="Free"
            description="Use RustFS under Apache 2.0 for development, testing, and production deployments you operate yourself."
            chips={["Apache 2.0", "Self-hosted"]}
            action={{ label: "Download", href: "/download" }}
            points={[
              "Apache 2.0 license",
              "S3-compatible object storage",
              "Server binaries, Docker, and Kubernetes paths",
              "Community issue tracking on GitHub",
            ]}
          />
          <PricingCard
            label="Production"
            title="Enterprise"
            description="For teams moving from evaluation to production and needing topology, migration, and operations planning."
            emphasized
            chips={["Planning", "Migration"]}
            action={{ label: "Talk to expert", href: "/contact-us" }}
            points={[
              "Migration planning",
              "Capacity and topology review",
              "Operational readiness guidance",
              "Enterprise requirements discovery",
            ]}
          />
        </div>
      </section>

      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden border border-border bg-card lg:grid-cols-2">
            <div className="relative border-b border-border bg-background p-6 sm:p-8 lg:border-r lg:border-b-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
              />
              <div className="relative">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Support path</p>
                <h2 className="mt-4 w-full text-2xl font-semibold leading-tight text-foreground">
                  Open source first. Add support when the risk is real.
                </h2>
                <p className="mt-4 w-full text-sm leading-7 text-muted-foreground">
                  Validate freely, then bring us in when topology, migration, or operations need review.
                </p>
              </div>
            </div>
            <div className="grid divide-y divide-border">
              {[
                ["Evaluate", "Run RustFS without a sales gate."],
                ["Plan", "Review topology and migration pressure."],
                ["Operate", "Add support for production ownership."],
              ].map(([title, detail]) => (
                <div key={title} className="flex flex-col justify-center px-6 py-5 sm:px-8">
                  <span className="block text-sm font-semibold text-foreground">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              [Code2Icon, "Evaluate without sales friction", "Download the server, run Docker, or install through Kubernetes before starting a commercial conversation."],
              [Building2Icon, "Plan around your environment", "Storage topology, compliance, network, and observability needs vary by organization and workload."],
              [LifeBuoyIcon, "Add support when it matters", "Use enterprise support for production migration, operations, and long-term deployment confidence."],
            ].map(([Icon, title, description]) => (
              <article
                key={title as string}
                className="flex min-h-64 flex-col border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center border border-border bg-background text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Ready
                  </span>
                </div>
                <div className="mt-auto pt-8">
                  <h2 className="text-lg font-semibold text-foreground">{title as string}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{description as string}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
