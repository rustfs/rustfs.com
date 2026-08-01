import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  DatabaseZap,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

const DEMO_URL = "https://play.rustfs.com";

const notices = [
  {
    description:
      "Sign in with the shared administrator account shown below. These public credentials are for this demo only.",
    icon: KeyRound,
    label: "Access",
    title: "Use the demo credentials",
  },
  {
    description:
      "The environment resets every day at 00:00 UTC. All buckets, objects, and configuration changes are discarded.",
    icon: DatabaseZap,
    label: "Retention",
    title: "The demo resets daily",
  },
  {
    description:
      "This is a public, shared environment. Do not upload confidential, sensitive, personal, or important data.",
    icon: ShieldAlert,
    label: "Security",
    title: "Upload test data only",
  },
];

export const metadata: Metadata = {
  title: "RustFS Demo | Public Demo Environment",
  description:
    "Review the RustFS public demo credentials, daily reset schedule, and data safety notice before entering the demo environment.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DemoPage() {
  return (
    <main className="relative flex-1">
      <section className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid border border-border bg-card/85 backdrop-blur-sm lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)]">
            <div className="border-b border-border p-6 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                  RustFS public demo
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="size-1.5 bg-success" aria-hidden="true" />
                  Shared environment
                </span>
              </div>

              <div className="pt-10">
                <h1 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                  A quick note before you enter.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Explore the RustFS Console in a live sandbox. Please review the
                  access details and data policy before continuing.
                </p>
              </div>

              <div className="mt-10 border border-border bg-background/70">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Demo credentials
                  </span>
                  <KeyRound className="size-4 text-brand" aria-hidden="true" />
                </div>
                <dl className="grid sm:grid-cols-2">
                  <div className="border-b border-border px-5 py-5 sm:border-r sm:border-b-0">
                    <dt className="text-xs text-muted-foreground">Username</dt>
                    <dd className="mt-2 font-mono text-base font-semibold text-foreground">
                      rustfsadmin
                    </dd>
                  </div>
                  <div className="px-5 py-5">
                    <dt className="text-xs text-muted-foreground">Password</dt>
                    <dd className="mt-2 font-mono text-base font-semibold text-foreground">
                      rustfsadmin
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="motion-button group inline-flex h-14 items-center justify-center gap-2 bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
                  href={DEMO_URL}
                  rel="noopener noreferrer"
                >
                  Enter the public demo
                  <ArrowUpRight
                    className="motion-arrow size-4"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </a>
                <Link
                  className="motion-button group inline-flex h-14 items-center justify-center gap-2 border border-border bg-background/60 px-6 text-sm font-semibold text-foreground hover:bg-muted"
                  href="/"
                >
                  <ArrowLeft
                    className="size-4 transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  Back to RustFS
                </Link>
              </div>
            </div>

            <aside className="flex flex-col" aria-label="Demo environment notices">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5 sm:px-8">
                <Clock3 className="size-4 text-brand" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  Before continuing
                </p>
              </div>

              <div className="divide-y divide-border">
                {notices.map((notice, index) => {
                  const Icon = notice.icon;

                  return (
                    <article
                      className="motion-card group grid grid-cols-[3rem_1fr] gap-4 p-6 sm:p-8"
                      key={notice.label}
                    >
                      <div className="motion-icon-tile flex size-12 items-center justify-center border border-border bg-muted text-brand">
                        <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                            {notice.label}
                          </p>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            0{index + 1}
                          </span>
                        </div>
                        <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                          {notice.title}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {notice.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-border bg-muted/45 px-6 py-5 sm:px-8">
                <p className="flex gap-3 text-xs leading-6 text-muted-foreground">
                  <ShieldAlert
                    className="mt-1 size-4 shrink-0 text-warning"
                    aria-hidden="true"
                  />
                  By continuing, you acknowledge that the demo is temporary and
                  unsuitable for production use or data storage.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
