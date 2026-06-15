'use client'

import { ExternalLinkIcon } from "lucide-react";
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
    href: "https://rustfs.dev/big-news-rustfs-joins-the-nvidia-inception-program/",
    linkText: "Learn more",
  },
  {
    title: "Drop-in Replacement for MinIO",
    token: "minio swap",
    label: "Migration path",
    description:
      "Migrate instantly without data moving headaches. RustFS supports seamless, in-place migration from MinIO by swapping the binary or container image.",
    href: "https://rustfs.dev/binary-replacement-a-simple-way-to-migrate-from-minio-to-rustfs/",
    linkText: "Read the migration guide",
  },
];

export default function HomeMultiClouds() {
  return (
    <section className="border-y border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="05"
          eyebrow="Field notes"
          title="Built for the next generation of object storage"
          description="RustFS combines Rust-native engineering, Apache 2.0 licensing, and S3 compatibility for AI infrastructure and direct MinIO migrations."
        />
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="motion-card flex flex-col border border-border bg-card">
            <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="px-5 py-3">{stories[0].label}</span>
              <span className="border-l border-border px-4 py-3">Spotlight</span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex h-16 w-full items-center border border-border bg-card px-5 text-foreground sm:w-56">
                  <NvidiaLogo className="h-9 w-full" aria-label="NVIDIA" />
                </span>
                <code className="w-fit border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {stories[0].token}
                </code>
              </div>
              <h3 className="mt-10 text-3xl font-semibold text-foreground">
                {stories[0].title}
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                {stories[0].description}
              </p>
              <div className="mt-10 grid border border-border bg-background text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:grid-cols-3">
                <span className="border-b border-border px-4 py-4 sm:border-b-0 sm:border-r">RDMA</span>
                <span className="border-b border-border px-4 py-4 sm:border-b-0 sm:border-r">DPU offload</span>
                <span className="px-4 py-4">AI storage</span>
              </div>
              <div className="mt-auto flex justify-end pt-12">
                <a
                  href={stories[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={stories[0].linkText}
                  className="motion-button flex size-10 items-center justify-center border border-border bg-background text-brand transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <ExternalLinkIcon className="motion-arrow size-4" />
                </a>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            <article className="motion-card border border-border bg-muted/40 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-40 items-center border border-border bg-card px-3">
                  <MinioIcon className="h-6 w-full" aria-label="MinIO" />
                </span>
                <code className="border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {stories[1].token}
                </code>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-foreground">{stories[1].title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{stories[1].description}</p>
              <a
                href={stories[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand"
              >
                <span>{stories[1].linkText}</span>
                <ExternalLinkIcon className="motion-arrow size-4" />
              </a>
            </article>

            <div className="motion-card border border-border bg-card p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Migration shape
              </p>
              <div className="mt-6 space-y-3 text-sm text-foreground">
                <div className="flex justify-between gap-4 border-b border-border pb-3">
                  <span>Binary replacement</span>
                  <code className="text-muted-foreground">swap</code>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-3">
                  <span>Container image</span>
                  <code className="text-muted-foreground">drop-in</code>
                </div>
                <div className="flex justify-between gap-4">
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
