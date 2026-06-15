import ContactUsButton from "@/components/business/buttons/contact-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RustFS | Next-Generation Distributed Object Storage for AI",
  description: "Learn about RustFS, an Apache 2.0 open-source distributed object storage system built in Rust. Powering AI data centers with native RDMA and DPU acceleration.",
  keywords: "about RustFS, RustFS project, open source object storage, distributed object storage, Rust infrastructure, NVIDIA Inception, RDMA storage, DPU hardware acceleration",
};

const milestones = [
  {
    date: "2024.06.23",
    title: "Initial Commit",
    description: "Laying the foundation of RustFS.",
  },
  {
    date: "2025.07.02",
    title: "Officially Open Sourced",
    description: "Released to the global community under Apache 2.0.",
  },
  {
    date: "2025.10.27",
    title: "10,000 GitHub Stars",
    description: "Gaining rapid traction in open-source storage.",
  },
  {
    date: "2026.01.20",
    title: "20,000 GitHub Stars",
    description: "Doubling momentum and community adoption.",
  },
  {
    date: "2026.04.09",
    title: "NVIDIA Inception Program",
    description: "Joined the global accelerator for AI infrastructure.",
  },
  {
    date: "2026.04.26",
    title: "Beta Released",
    description: "Unlocking production-ready, S3-compatible storage.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative z-10 flex-1">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About RustFS
          </h1>
          <div className="mt-6 space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              RustFS is a next-generation distributed object storage system built in Rust and licensed under Apache 2.0. As the fastest-growing open-source object storage project, RustFS has achieved massive global adoption, surpassing 28,000 GitHub Stars, 3 million Docker Hub pulls, and 1 million global instances worldwide.
            </p>
            <p>
              RustFS provides the full lifecycle of object storage management and delivers fine-grained orchestration across objects, buckets, and IAM policies. With native S3 compatibility, it integrates seamlessly into existing S3-supported ecosystems.
            </p>
            <p>
              To meet the demands of the AI era, RustFS is pioneering ultra-low latency data pipelines through native RDMA protocol support, DPU-accelerated Erasure Coding, and hardware-level encryption.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Our Journey & Big Milestone
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Key moments in RustFS development, open-source growth, and AI infrastructure acceleration.
            </p>
          </div>

          <ol className="space-y-4">
            {milestones.map((item) => (
              <li key={`${item.date}-${item.title}`} className="rounded-lg border border-border bg-card p-5">
                <div className="text-sm font-semibold text-brand">{item.date}</div>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Contact us</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For partnership, support, and enterprise deployment questions, contact hello@rustfs.com.
            </p>
          </div>
          <ContactUsButton />
        </div>
      </section>
    </main>
  );
}
