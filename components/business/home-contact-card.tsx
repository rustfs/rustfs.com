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
          className="motion-card group grid overflow-hidden border border-brand bg-brand text-left text-brand-foreground transition-colors hover:bg-brand/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:grid-cols-[minmax(0,1fr)_24rem]"
        >
          <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(135deg,transparent_0_16px,var(--brand-foreground)_16px_17px,transparent_17px_34px)]"
            />
            <div className="relative inline-flex items-center gap-3 border border-brand-foreground/25 bg-brand-foreground/10 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground/75">
              <span className="text-brand-foreground">handoff</span>
              <span className="h-px w-8 bg-brand-foreground/25" />
              <span>production</span>
            </div>
            <h3 className="relative mt-4 max-w-2xl text-2xl font-semibold leading-tight text-brand-foreground sm:text-4xl">
              Talk through topology, migration, and production support.
            </h3>
            <p className="relative mt-4 max-w-3xl text-sm leading-7 text-brand-foreground/75">
              Bring the deployment context. We will help map the next storage decision to RustFS.
            </p>

            <div className="relative mt-8 grid gap-px bg-brand-foreground/25 sm:grid-cols-3">
              {["Deployment planning", "Migration path", "Enterprise review"].map((item) => (
                <span
                  key={item}
                  className="bg-brand px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col border-t border-brand-foreground/25 bg-black/15 lg:border-l lg:border-t-0">
            {[
              ["01", "Size the failure domain"],
              ["02", "Review migration pressure"],
              ["03", "Plan operations ownership"],
            ].map(([step, label]) => (
              <span
                key={step}
                className="grid grid-cols-[3.5rem_1fr] border-b border-brand-foreground/20 last:border-b-0"
              >
                <span className="border-r border-brand-foreground/20 px-4 py-4 font-mono text-[10px] font-semibold text-brand-foreground/75">
                  {step}
                </span>
                <span className="px-4 py-4 text-sm font-medium text-brand-foreground">
                  {label}
                </span>
              </span>
            ))}

            <span className="mt-auto flex items-center justify-between gap-5 border-t border-brand-foreground/25 px-5 py-5 text-sm font-semibold text-brand-foreground">
              Open contact page
              <span className="motion-arrow grid size-10 place-items-center border border-brand-foreground/25 text-brand-foreground transition-colors group-hover:bg-brand-foreground group-hover:text-brand">
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
