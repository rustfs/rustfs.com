import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import HomeSectionHeader from "./home-section-header";

export default function HomeContactCard() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y border-border bg-muted/30 py-24 sm:py-32"
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
          className="motion-card group block border border-border bg-card transition-colors hover:bg-muted/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold leading-tight text-foreground sm:text-4xl">
                Talk to the RustFS team.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Use the dedicated contact page for production deployment, migration, and enterprise support.
              </p>
            </div>

            <span className="motion-arrow flex size-12 items-center justify-center text-brand">
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
