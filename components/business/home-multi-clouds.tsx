'use client'

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import MinioIcon from "../../public/svgs/softwares/minio.svg";
import NvidiaLogo from "../../public/svgs/softwares/nvidia.svg";
import HomeSectionHeader from "./home-section-header";

const stories = [
  {
    title: "A practical MinIO evaluation path",
    token: "minio eval",
    label: "Migration path",
    description:
      "Reuse familiar S3 clients and validate migration on a backup or copy before planning a controlled production cutover with a rollback path.",
    href: "/blog/binary-replacement-a-simple-way-to-migrate-from-minio-to-rustfs",
    linkText: "Read the migration guide",
  },
  {
    title: "NVIDIA Inception Program",
    token: "rdma+dpu",
    label: "AI roadmap",
    description:
      "RustFS has joined the NVIDIA Inception Program. RDMA and DPU offload remain roadmap directions, not current production guarantees.",
    href: "/blog/big-news-rustfs-joins-the-nvidia-inception-program",
    linkText: "Read the roadmap story",
  },
];

export default function HomeMultiClouds() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="05"
          eyebrow="Field posts"
          title="Two paths into the product"
          description="Start with the immediate task many teams have: evaluating an actively maintained Apache 2.0 path from an existing S3 or MinIO estate. Keep AI acceleration work in view as roadmap, not baseline."
        />
        <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            href={stories[0].href}
            className="motion-card group block overflow-hidden bg-card/45 transition-colors hover:bg-muted/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label={stories[0].linkText}
          >
            <div className="relative min-h-64 overflow-hidden border-b border-border bg-background">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:34px_34px]"
              />
              <div className="relative flex min-h-64 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    FIG.MIGRATION
                  </span>
                  <code className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {stories[0].token}
                  </code>
                </div>
                <span className="mx-auto my-8 flex h-20 w-full max-w-96 items-center px-6 text-foreground sm:h-24 sm:px-8">
                  <MinioIcon className="h-10 w-full sm:h-12" aria-label="MinIO" />
                </span>
                <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-px border-y border-border bg-border/70 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="bg-background/70 px-3 py-2.5">Backup</span>
                  <span className="bg-background/70 px-3 py-2.5">Validate</span>
                  <span className="bg-background/70 px-3 py-2.5">Rollback</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-brand">Spotlight</span>
                <span className="h-px bg-border" />
                <span>{stories[0].label}</span>
              </div>
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <h3 className="max-w-xl text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                    {stories[0].title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                    {stories[0].description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5 border-t border-border pt-5 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground md:min-w-40 md:border-t-0 md:pt-0">
                  <span>{stories[0].linkText}</span>
                  <ArrowUpRightIcon className="motion-arrow size-4" />
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-px bg-border">
            <Link
              href={stories[1].href}
              className="motion-card group relative block overflow-hidden bg-card/45 transition-colors hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label={stories[1].linkText}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 right-0 hidden w-44 opacity-35 [background-image:repeating-linear-gradient(135deg,transparent_0_16px,var(--border)_16px_17px,transparent_17px_32px)] sm:block"
              />
              <div className="relative p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <span className="flex h-14 w-44 items-center px-1">
                    <NvidiaLogo className="h-7 w-full" aria-label="NVIDIA" />
                  </span>
                  <span className="motion-arrow grid size-10 shrink-0 place-items-center border border-border bg-background text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>

                <code className="mt-8 inline-flex text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                  {stories[1].token}
                </code>
                <h3 className="mt-4 max-w-md text-2xl font-semibold leading-tight text-foreground">
                  {stories[1].title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                  {stories[1].description}
                </p>
              </div>
              <div className="relative grid gap-px bg-border text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:grid-cols-3">
                {["Roadmap", "RDMA", "DPU"].map((item) => (
                  <span key={item} className="bg-background/65 px-4 py-3">
                    {item}
                  </span>
                ))}
              </div>
            </Link>

            <div className="bg-card/35">
              <p className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Roadmap status
              </p>
              <div className="divide-y divide-border text-sm text-foreground">
                <div className="flex justify-between gap-4 px-5 py-4">
                  <span>AI data path</span>
                  <code className="text-muted-foreground">explore</code>
                </div>
                <div className="flex justify-between gap-4 px-5 py-4">
                  <span>RDMA</span>
                  <code className="text-muted-foreground">roadmap</code>
                </div>
                <div className="flex justify-between gap-4 px-5 py-4">
                  <span>DPU offload</span>
                  <code className="text-muted-foreground">roadmap</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
