'use client'

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import MinioIcon from "../../public/svgs/softwares/minio.svg";
import NvidiaLogo from "../../public/svgs/softwares/nvidia.svg";
import HomeSectionHeader from "./home-section-header";

const stories = [
  {
    title: "NVIDIA Inception Program",
    token: "rdma+dpu",
    label: "AI infrastructure",
    description:
      "RustFS has joined the NVIDIA Inception Program. We are accelerating AI data center storage with native RDMA support and future DPU offload for Erasure Coding and encryption.",
    href: "/blog/big-news-rustfs-joins-the-nvidia-inception-program",
    linkText: "Read the story",
  },
  {
    title: "Drop-in Replacement for MinIO",
    token: "minio swap",
    label: "Migration path",
    description:
      "Migrate instantly without data moving headaches. RustFS supports seamless, in-place migration from MinIO by swapping the binary or container image.",
    href: "/blog/binary-replacement-a-simple-way-to-migrate-from-minio-to-rustfs",
    linkText: "Read the migration guide",
  },
];

export default function HomeMultiClouds() {
  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="05"
          eyebrow="Field posts"
          title="Built for the next generation of object storage"
          description="RustFS combines Rust-native engineering, Apache 2.0 licensing, and S3 compatibility for AI infrastructure and direct MinIO migrations."
        />
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            href={stories[0].href}
            className="motion-card group block overflow-hidden border border-border bg-card transition-colors hover:bg-muted/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
                    FIG.NVDA
                  </span>
                  <code className="border border-border bg-card/80 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stories[0].token}
                  </code>
                </div>
                <span className="mx-auto my-8 flex h-20 w-full max-w-96 items-center border border-border bg-card/90 px-6 text-foreground sm:h-24 sm:px-8">
                  <NvidiaLogo className="h-10 w-full sm:h-12" aria-label="NVIDIA" />
                </span>
                <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-px border border-border bg-border text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="bg-card/90 px-3 py-2.5">RDMA</span>
                  <span className="bg-card/90 px-3 py-2.5">DPU</span>
                  <span className="bg-card/90 px-3 py-2.5">AI data</span>
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

          <div className="grid gap-4">
            <Link
              href={stories[1].href}
              className="motion-card group relative block overflow-hidden border border-border bg-card transition-colors hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label={stories[1].linkText}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 right-0 hidden w-44 opacity-35 [background-image:repeating-linear-gradient(135deg,transparent_0_16px,var(--border)_16px_17px,transparent_17px_32px)] sm:block"
              />
              <div className="relative p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <span className="flex h-14 w-44 items-center border border-border bg-background px-4">
                    <MinioIcon className="h-7 w-full" aria-label="MinIO" />
                  </span>
                  <span className="motion-arrow grid size-10 shrink-0 place-items-center border border-border bg-background text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>

                <code className="mt-8 inline-flex border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
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
                {["Binary swap", "Container", "S3 clients"].map((item) => (
                  <span key={item} className="bg-background/65 px-4 py-3">
                    {item}
                  </span>
                ))}
              </div>
            </Link>

            <div className="border border-border bg-card">
              <p className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Migration shape
              </p>
              <div className="divide-y divide-border text-sm text-foreground">
                <div className="flex justify-between gap-4 px-5 py-4">
                  <span>Binary replacement</span>
                  <code className="text-muted-foreground">swap</code>
                </div>
                <div className="flex justify-between gap-4 px-5 py-4">
                  <span>Container image</span>
                  <code className="text-muted-foreground">drop-in</code>
                </div>
                <div className="flex justify-between gap-4 px-5 py-4">
                  <span>Existing clients</span>
                  <code className="text-muted-foreground">S3</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
