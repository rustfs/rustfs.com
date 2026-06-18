import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import HomeSectionHeader from "./home-section-header";

export default function HomeContactCard() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-muted/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="08"
          eyebrow="Contact channel"
          title="Contact Us"
          description="Get in touch with the RustFS team for deployment planning, migration support, and enterprise requirements."
        />

        <Link
          href="/contact-us"
          aria-label="Open the RustFS contact page"
          className="motion-card group grid overflow-hidden border border-border bg-card/90 text-left transition-colors hover:bg-muted/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:grid-cols-[minmax(0,1fr)_24rem]"
        >
          <div className="relative p-6 sm:p-8 lg:p-10">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand via-brand/30 to-transparent"
            />
            <div className="inline-flex items-center gap-3 border border-border bg-background/70 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="text-brand">handoff</span>
              <span className="h-px w-8 bg-border" />
              <span>production</span>
            </div>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-foreground sm:text-4xl">
              Talk through topology, migration, and production support.
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Bring the deployment context. We will help map the next storage decision to RustFS.
            </p>

            <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
              {["Deployment planning", "Migration path", "Enterprise review"].map((item) => (
                <span
                  key={item}
                  className="bg-background/60 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col border-t border-border bg-background/35 lg:border-l lg:border-t-0">
            {[
              ["01", "Size the failure domain"],
              ["02", "Review migration pressure"],
              ["03", "Plan operations ownership"],
            ].map(([step, label]) => (
              <span
                key={step}
                className="grid grid-cols-[3.5rem_1fr] border-b border-border last:border-b-0"
              >
                <span className="border-r border-border px-4 py-4 font-mono text-[10px] font-semibold text-brand">
                  {step}
                </span>
                <span className="px-4 py-4 text-sm font-medium text-foreground">
                  {label}
                </span>
              </span>
            ))}

            <span className="mt-auto flex items-center justify-between gap-5 border-t border-border px-5 py-5 text-sm font-semibold text-foreground">
              Open contact page
              <span className="motion-arrow grid size-10 place-items-center text-brand transition-colors group-hover:text-foreground">
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
