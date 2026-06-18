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
    <section className="border-t border-border py-24 md:py-32">
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
            className="motion-card group grid overflow-hidden border border-border bg-card transition-colors hover:bg-muted/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand xl:grid-cols-[0.86fr_1.14fr]"
            aria-label={stories[0].linkText}
          >
            <div className="relative min-h-80 overflow-hidden border-b border-border bg-background xl:border-b-0 xl:border-r">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:34px_34px]"
              />
              <div className="relative flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    FIG.NVDA
                  </span>
                  <code className="border border-border bg-card/80 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stories[0].token}
                  </code>
                </div>
                <span className="mx-auto my-auto flex h-20 w-full max-w-80 items-center border border-border bg-card/90 px-6 text-foreground">
                  <NvidiaLogo className="h-9 w-full" aria-label="NVIDIA" />
                </span>
                <div className="grid grid-cols-3 gap-px bg-border text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="bg-card/90 px-3 py-3">RDMA</span>
                  <span className="bg-card/90 px-3 py-3">DPU</span>
                  <span className="bg-card/90 px-3 py-3">AI data</span>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="mb-8 grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-brand">Spotlight</span>
                <span className="h-px bg-border" />
                <span>{stories[0].label}</span>
              </div>
              <h3 className="text-3xl font-semibold text-foreground">
                {stories[0].title}
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                {stories[0].description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-10 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
                <span>{stories[0].linkText}</span>
                <ArrowUpRightIcon className="motion-arrow size-4" />
              </div>
            </div>
          </Link>

          <div className="grid gap-4">
            <Link
              href={stories[1].href}
              className="motion-card group grid border border-border bg-card transition-colors hover:bg-muted/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:grid-cols-[auto_1fr_auto]"
              aria-label={stories[1].linkText}
            >
              <span className="flex min-h-24 items-center border-b border-border px-5 sm:border-b-0 sm:border-r">
                <span className="flex h-12 w-40 items-center border border-border bg-background px-3">
                  <MinioIcon className="h-6 w-full" aria-label="MinIO" />
                </span>
              </span>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <code className="border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stories[1].token}
                  </code>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{stories[1].title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{stories[1].description}</p>
              </div>
              <span className="motion-arrow flex items-center justify-end border-t border-border px-5 py-5 text-brand sm:border-l sm:border-t-0">
                <ArrowUpRightIcon className="size-5" />
              </span>
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
