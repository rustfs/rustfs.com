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
    <section className="border-t border-border bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="Field posts"
          title="Built for the next generation of object storage"
          description="RustFS combines Rust-native engineering, Apache 2.0 licensing, and S3 compatibility for AI infrastructure and direct MinIO migrations."
        />

        <div className="grid border border-border lg:grid-cols-2">
          <Link
            href={stories[0].href}
            className="motion-card group flex min-h-[30rem] flex-col bg-card transition-colors hover:bg-muted/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label={stories[0].linkText}
          >
            <div className="relative flex min-h-52 items-center overflow-hidden bg-background p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:34px_34px]"
              />
              <NvidiaLogo
                className="relative h-12 w-full max-w-sm text-foreground sm:h-14"
                aria-label="NVIDIA"
              />
            </div>

            <StoryContent story={stories[0]} className="border-t border-border" />
          </Link>

          <Link
            href={stories[1].href}
            className="motion-card group relative flex min-h-[30rem] flex-col overflow-hidden border-t border-border bg-card transition-colors hover:!border-border hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:border-l lg:border-t-0"
            aria-label={stories[1].linkText}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 transition-[opacity,background-position] duration-500 [background-image:repeating-linear-gradient(135deg,transparent_0_20px,var(--border)_20px_21px,transparent_21px_40px)] group-hover:bg-[position:32px_0] group-hover:opacity-45"
            />
            <div className="relative flex min-h-52 items-center p-8 sm:p-10">
              <MinioIcon className="h-11 w-full max-w-xs" aria-label="MinIO" />
            </div>

            <StoryContent story={stories[1]} className="border-t border-border" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StoryContent({
  story,
  className = "",
}: {
  story: (typeof stories)[number];
  className?: string;
}) {
  return (
    <div className={`relative flex flex-1 flex-col p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-brand">{story.label}</span>
        <span className="h-px flex-1 bg-border" />
        <code>{story.token}</code>
      </div>
      <h3 className="mt-7 max-w-xl text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {story.title}
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
        {story.description}
      </p>
      <ArrowUpRightIcon className="motion-arrow mt-auto size-5 self-end text-brand" />
    </div>
  );
}
