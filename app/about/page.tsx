import ContactUsButton from "@/components/business/buttons/contact-us";
import NvidiaLogo from "@/public/svgs/softwares/nvidia.svg";
import RustFSLogo from "@/public/rustfs.logo.svg";
import { CpuIcon, DatabaseIcon, GitBranchIcon, ShieldCheckIcon } from "lucide-react";
import type { Metadata } from "next";
import type { ComponentType } from "react";

export const metadata: Metadata = {
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
    title: "Open sourced",
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
    <article className="border border-border bg-card p-5">
      <Icon className="size-5 text-brand" />
      <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
    </article>
  );
}

export default function AboutPage() {
  return (
    <main className="relative z-10 flex-1 bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">About RustFS</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              Object storage built for Rust-native infrastructure.
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:ml-auto">
            RustFS is an Apache 2.0 distributed object storage system focused on S3 compatibility, operational control, and AI data center workloads.
          </p>
        </div>

        <div className="mt-12 grid border border-border bg-card lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
            <span className="flex h-14 w-48 items-center border border-border bg-background px-4">
              <RustFSLogo className="h-auto w-full" />
            </span>
            <h2 className="mt-10 max-w-xl text-3xl font-semibold leading-tight text-foreground">
              A storage foundation that stays open, self-hosted, and programmable.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              RustFS manages object, bucket, IAM, lifecycle, and cluster workflows while keeping the S3 interface stable for existing tools and applications.
            </p>
          </div>
          <div className="grid sm:grid-cols-2">
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

          <ol className="border border-border bg-card">
            {milestones.map((item) => (
              <li key={`${item.date}-${item.title}`} className="grid border-b border-border last:border-b-0 sm:grid-cols-[10rem_1fr]">
                <div className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:border-b-0 sm:border-r">
                  {item.date}
                </div>
                <div className="px-5 py-4">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 border border-border bg-card p-6 lg:grid-cols-[0.36fr_1fr_auto] lg:items-center lg:p-8">
            <span className="flex h-20 max-w-xs items-center border border-border bg-background px-5">
              <NvidiaLogo className="h-auto w-full" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">AI infrastructure</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">NVIDIA Inception Program</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                RustFS is accelerating AI data center storage with native RDMA support and future DPU offload for Erasure Coding and encryption.
              </p>
            </div>
            <ContactUsButton className="!h-12 !px-5 !py-0 leading-none" />
          </div>
        </div>
      </section>
    </main>
  );
}
