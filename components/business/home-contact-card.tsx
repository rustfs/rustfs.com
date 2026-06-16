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
          className="motion-card group grid overflow-hidden border border-border bg-card transition-colors hover:bg-muted/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:grid-cols-[minmax(0,1fr)_22rem_auto]"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
              Production handoff
            </p>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-foreground sm:text-4xl">
              Plan the next storage move.
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Share topology, migration context, or enterprise requirements with the RustFS team.
            </p>
          </div>

          <div className="grid grid-cols-3 border-t border-border bg-background/30 lg:grid-cols-1 lg:border-l lg:border-t-0">
            {["Deployment", "Migration", "Enterprise"].map((item) => (
              <span
                key={item}
                className="flex items-center border-r border-border px-4 py-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-stretch border-t border-border lg:border-l lg:border-t-0">
            <span className="flex min-w-full items-center justify-between gap-5 px-6 py-5 text-sm font-semibold text-foreground lg:min-w-52">
              Contact team
              <span className="motion-arrow grid size-10 place-items-center border border-border text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground">
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
