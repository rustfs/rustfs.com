import ContactUsButton from "@/components/business/buttons/contact-us"
import { getDockerPulls } from "@/lib/docker"
import { getGitHubMetrics } from "@/lib/github"
import { cn } from "@/lib/utils"
import homepageMetrics from "@/public/homepage-metrics.json"
import RustFSLogo from "@/public/rustfs.logo.svg"
import { CpuIcon, DatabaseIcon, GitBranchIcon, ShieldCheckIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import type { ComponentType } from "react"

export const metadata: Metadata = {
  alternates: { canonical: "about/" },
  title: "About RustFS | Next-Generation Distributed Object Storage for AI",
  description: "Learn about RustFS, an Apache 2.0 open-source distributed object storage system built in Rust. Powering AI data centers with native RDMA and DPU acceleration.",
  keywords: "about RustFS, RustFS project, open source object storage, distributed object storage, Rust infrastructure, NVIDIA Inception, RDMA storage, DPU hardware acceleration",
};

const milestones = [
  {
    date: "2024.06.23",
    title: "Initial commit",
    description: "The storage core started with Rust-first system design.",
  },
  {
    date: "2025.07.02",
    title: "Open-sourced",
    description: "RustFS was released to the global community under Apache 2.0.",
  },
  {
    date: "2025.10.27",
    title: "10,000 GitHub stars",
    description: "Open-source storage teams began adopting RustFS at scale.",
  },
  {
    date: "2026.01.20",
    title: "20,000 GitHub stars",
    description: "Community momentum doubled across storage and AI workloads.",
  },
  {
    date: "2026.04.09",
    title: "NVIDIA Inception",
    description: "RustFS joined the NVIDIA Inception Program for AI infrastructure acceleration.",
  },
  {
    date: "2026.04.26",
    title: "Beta release",
    description: "The project moved into production-oriented S3-compatible storage validation.",
  },
  {
    date: "2026.07.20",
    title: "30,000 GitHub stars",
    description: "The global open-source community pushed RustFS past 30,000 GitHub stars.",
  },
];

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <article className="border border-border bg-card p-6">
      <Icon className="size-5 text-brand" />
      <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
    </article>
  );
}

const numberFormat = new Intl.NumberFormat("en-US");
const snapshotDateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const docLinkClassName = "text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand";

function snapshotDate(iso: string) {
  return snapshotDateFormat.format(new Date(iso));
}

export default async function AboutPage() {
  const [dockerPulls, metrics] = await Promise.all([
    getDockerPulls(),
    getGitHubMetrics(),
  ]);

  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            Object storage built for <span className="whitespace-nowrap">Rust-native</span>{" "}
            infrastructure
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            RustFS is a next-generation Apache 2.0 distributed object storage system built in Rust for S3-compatible and AI data center workloads.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            GitHub stars and Docker Hub pulls use the same homepage metrics helpers:{" "}
            <a href="https://github.com/rustfs/rustfs" className={docLinkClassName} rel="noreferrer" target="_blank">
              {numberFormat.format(metrics.stars)} GitHub stars
            </a>
            {metrics.stars === homepageMetrics.github.stars
              ? ` as of ${snapshotDate(homepageMetrics.github.updatedAt)}`
              : ""}
            {" "}and{" "}
            <a href="https://hub.docker.com/r/rustfs/rustfs" className={docLinkClassName} rel="noreferrer" target="_blank">
              {numberFormat.format(dockerPulls)} Docker Hub pulls
            </a>
            {dockerPulls === homepageMetrics.docker.pulls
              ? ` as of ${snapshotDate(homepageMetrics.docker.updatedAt)}`
              : ""}
            . The homepage ticker can refresh those two counts. Deployments stay at 2,700,000+, the figure in the{" "}
            <Link href="/blog/announcing-rustfs-1-0-0-ga/" className={docLinkClassName}>
              September 16, 2026 GA announcement
            </Link>{" "}
            and on the homepage. Dated star milestones stay in the timeline below.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="border border-border bg-card p-6 lg:p-8">
            <span className="flex h-14 w-48 items-center">
              <RustFSLogo className="h-auto w-full" />
            </span>
            <h2 className="mt-10 max-w-xl text-3xl font-semibold leading-tight text-foreground">
              A storage foundation that stays open, self-hosted, and programmable
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              RustFS manages object, bucket, IAM, lifecycle, and cluster workflows and provides{" "}
              <a
                href="https://docs.rustfs.com/en/administration/protocols/s3"
                className={docLinkClassName}
                rel="noreferrer"
                target="_blank"
              >
                S3 API compatibility for common object-storage workflows
              </a>
              . It is not identical to every AWS S3 or MinIO API. Configure the endpoint and validate the operations you depend on.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ValueCard
              icon={ShieldCheckIcon}
              title="Apache 2.0 foundation"
              description="Open-source licensing keeps adoption, redistribution, and commercial deployment straightforward."
            />
            <ValueCard
              icon={DatabaseIcon}
              title="S3-compatible surface"
              description="Applications can use familiar S3 clients while RustFS owns the storage layer. Confirm the operations you need against the S3 protocol docs."
            />
            <ValueCard
              icon={CpuIcon}
              title="AI infrastructure path"
              description="Native RDMA, DPU acceleration, and hardware encryption are core directions for future data center workloads."
            />
            <ValueCard
              icon={GitBranchIcon}
              title="Operator-first control"
              description="Console, rc CLI, and telemetry workflows are designed for teams that run their own storage."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Project timeline
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Key moments across RustFS development, open-source growth, and AI infrastructure positioning.
            </p>
          </div>

          <ol className="overflow-hidden border border-border bg-card">
            {[...milestones].reverse().map((item, index) => (
              <li
                key={`${item.date}-${item.title}`}
                className={cn(
                  "grid border-b border-border last:border-b-0 sm:grid-cols-[12.5rem_1fr]",
                  index === 0 && "bg-muted/20"
                )}
              >
                <div className="flex items-center gap-3 border-b border-border px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] sm:border-b-0 sm:border-r">
                  <time className="text-muted-foreground">{item.date}</time>
                </div>
                <div className="px-5 py-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 border border-border bg-card p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">RustFS</p>
              <h2 className="mt-4 text-3xl font-semibold text-foreground">Contact</h2>
              <address className="mt-5 text-base not-italic leading-8 text-muted-foreground">
                3550 Lenox Road<br />
                NE Atlanta, Georgia 30326
              </address>
            </div>
            <ContactUsButton href="/contact-us" label="Talk to our team" className="!h-12 !px-5 !py-0 leading-none" />
          </div>
        </div>
      </section>
    </main>
  );
}
