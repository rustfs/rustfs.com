import ContactUsButton from "@/components/business/buttons/contact-us"
import { cn } from "@/lib/utils"
import RustFSLogo from "@/public/rustfs.logo.svg"
import NvidiaLogo from "@/public/svgs/softwares/nvidia.svg"
import { CpuIcon, DatabaseIcon, GitBranchIcon, ShieldCheckIcon } from "lucide-react"
import type { Metadata } from "next"
import type { ComponentType } from "react"

export const metadata: Metadata = {
  title: "About RustFS | Open S3-Compatible Storage in Rust",
  description: "Learn about RustFS, an Apache 2.0 open-source S3-compatible object storage project built in Rust and currently in public beta.",
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
    title: "Open sourced",
    description: "RustFS was released to the global community under Apache 2.0.",
  },
  {
    date: "2025.10.27",
    title: "10,000 GitHub stars",
    description: "The repository reached a visible open-source community milestone.",
  },
  {
    date: "2026.01.20",
    title: "20,000 GitHub stars",
    description: "The open-source community reached another repository milestone.",
  },
  {
    date: "2026.04.09",
    title: "NVIDIA Inception",
    description: "RustFS joined the NVIDIA Inception Program for AI infrastructure acceleration.",
  },
  {
    date: "2026.04.26",
    title: "Beta release",
    description: "The project entered public beta and expanded S3-compatible storage validation.",
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
    <article className="border-t border-border py-6">
      <Icon className="size-5 text-brand" />
      <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
    </article>
  );
}

export default function AboutPage() {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">About RustFS</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              Open object storage, engineered in Rust.
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:ml-auto">
            RustFS is an Apache 2.0 S3-compatible object storage project built in Rust. The project is in public beta, with an active open repository and a published compatibility overview for teams evaluating self-hosted storage.
          </p>
        </div>

        <div className="mt-12 grid border-y border-border lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
            <span className="flex h-14 w-48 items-center border border-border bg-background px-4">
              <RustFSLogo className="h-auto w-full" />
            </span>
            <h2 className="mt-10 max-w-xl text-3xl font-semibold leading-tight text-foreground">
              A storage foundation that stays open, self-hosted, and programmable.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              RustFS covers object, bucket, IAM, lifecycle, and cluster workflows through an evolving S3-compatible surface. Teams can inspect current coverage and known gaps before adoption.
            </p>
          </div>
          <div className="grid gap-x-8 px-6 sm:grid-cols-2 lg:px-8">
            <ValueCard
              icon={ShieldCheckIcon}
              title="Apache 2.0 foundation"
              description="Open-source licensing keeps adoption, redistribution, and commercial deployment straightforward."
            />
            <ValueCard
              icon={DatabaseIcon}
              title="S3-compatible surface"
              description="Applications keep speaking the same object storage protocol while RustFS owns the storage layer."
            />
            <ValueCard
              icon={CpuIcon}
              title="AI infrastructure path"
              description="RDMA, DPU acceleration, and hardware encryption are roadmap directions for future data center workloads."
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
        <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Milestones</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              Project timeline
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Key moments across RustFS development, open-source growth, and AI infrastructure positioning.
            </p>
          </div>

          <ol className="overflow-hidden border-y border-border">
            {[...milestones].reverse().map((item, index) => (
              <li
                key={`${item.date}-${item.title}`}
                className={cn(
                  "grid border-b border-border last:border-b-0 sm:grid-cols-[12.5rem_1fr]",
                  index === 0 && "bg-muted/20"
                )}
              >
                <div className="flex items-center gap-3 border-b border-border px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] sm:border-b-0 sm:border-r">
                  <span className="text-brand">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-border" />
                  <time className="text-muted-foreground">{item.date}</time>
                </div>
                <div className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="w-fit border border-border bg-background px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {index === 0 ? "Latest" : "Event"}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 border-y border-border py-8 lg:grid-cols-[0.36fr_1fr_auto] lg:items-center">
            <span className="flex h-20 max-w-xs items-center border border-border bg-background px-5">
              <NvidiaLogo className="h-auto w-full" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">AI infrastructure</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">NVIDIA Inception Program</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                RustFS is a member of the NVIDIA Inception Program. RDMA and DPU offload for erasure coding and encryption remain roadmap directions, not current production guarantees or a technical endorsement.
              </p>
            </div>
            <ContactUsButton className="!h-12 !px-5 !py-0 leading-none" />
          </div>
        </div>
      </section>
    </main>
  );
}
