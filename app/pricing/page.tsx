import ContactUsButton from "@/components/business/buttons/contact-us";
import DownloadLink from "@/components/business/buttons/download-link";
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
  return (
    <article className={`motion-card flex h-full flex-col border border-border bg-card ${emphasized ? "border-brand" : ""}`}>
      <div className="flex flex-1 flex-col border-b border-border p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{label}</p>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">{title}</h2>
        <p className="mt-5 font-display text-4xl font-semibold text-foreground">{price}</p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
      <ul className="grid grid-rows-4">
        {points.map((point) => (
          <li key={point} className="flex min-h-20 gap-3 border-b border-border px-6 py-4 last:border-b-0 lg:h-20">
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
        <div className="mx-auto grid max-w-7xl gap-0 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="motion-card border border-border bg-card p-6">
            <Code2Icon className="motion-icon-tile size-5 text-brand" />
            <h2 className="mt-6 text-lg font-semibold text-foreground">Evaluate without sales friction</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Download the server, run Docker, or install through Kubernetes before starting a commercial conversation.</p>
          </div>
          <div className="motion-card border border-border bg-card p-6 lg:border-l-0">
            <Building2Icon className="motion-icon-tile size-5 text-brand" />
            <h2 className="mt-6 text-lg font-semibold text-foreground">Plan around your environment</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Storage topology, compliance, network, and observability needs vary by organization and workload.</p>
          </div>
          <div className="motion-card border border-border bg-card p-6 lg:border-l-0">
            <LifeBuoyIcon className="motion-icon-tile size-5 text-brand" />
            <h2 className="mt-6 text-lg font-semibold text-foreground">Add support when it matters</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Use enterprise support for production migration, operations, and long-term deployment confidence.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
