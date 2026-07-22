import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import HomeSectionHeader from "./home-section-header";

export default function HomeContactCard() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="Contact channel"
          title="Contact Us"
          description="Get in touch with the RustFS team for deployment planning, migration support, and enterprise requirements."
        />

        <Link
          href="/contact-us"
          aria-label="Open the RustFS contact page"
          className="motion-card group relative block overflow-hidden border border-brand bg-brand text-left text-brand-foreground transition-colors hover:bg-brand/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.1] [background-image:repeating-linear-gradient(135deg,transparent_0_16px,var(--brand-foreground)_16px_17px,transparent_17px_34px)]"
          />
          <div className="relative p-6 pr-24 sm:p-8 sm:pr-28 lg:p-10 lg:pr-32">
            <span
              className="relative inline-flex border border-brand-foreground/25 bg-brand-foreground/10 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground/75"
            >
              Production handoff
            </span>
            <h3 className="relative mt-4 max-w-2xl text-2xl font-semibold leading-tight text-brand-foreground sm:text-4xl">
              Talk to the RustFS team.
            </h3>
            <p className="relative mt-4 max-w-3xl text-sm leading-7 text-brand-foreground/75">
              Bring deployment context for topology, migration, or production support.
            </p>
          </div>

          <span className="motion-arrow absolute right-6 top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-brand-foreground/25 text-brand-foreground transition-colors group-hover:bg-brand-foreground group-hover:text-brand sm:right-8 lg:right-10">
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
