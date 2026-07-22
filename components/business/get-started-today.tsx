'use client'

import ContactUsButton from './buttons/contact-us'
import DownloadLink from './buttons/download-link'
import HomeSectionHeader from './home-section-header'

const ctaButtonClassName = "!h-12 !min-h-12 w-full shrink-0 !px-5 !py-0 leading-none sm:!w-48";

export default function GetStartedToday() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-background py-20 text-foreground sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="Deploy surface"
          title="Start building with RustFS"
          description="Download RustFS for local testing, or contact us to plan production deployment, migration, and enterprise support."
        />

        <div className="motion-card group relative overflow-hidden border border-brand bg-brand text-brand-foreground">
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.1] [background-image:repeating-linear-gradient(135deg,transparent_0_18px,var(--brand-foreground)_18px_19px,transparent_19px_36px)]"
          />

          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="w-full text-3xl font-semibold leading-tight text-brand-foreground sm:text-4xl">
                <span className="sm:whitespace-nowrap">Deploy RustFS locally.</span>{" "}
                <span className="sm:whitespace-nowrap">Keep the same path to production.</span>
              </h2>
              <p className="mt-4 w-full text-sm leading-7 text-brand-foreground/75">
                Start with one machine, then carry the same S3-compatible storage layer into migration and multi-node operations.
              </p>
            </div>

            <div className="flex flex-col gap-3 px-6 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:py-10">
              <DownloadLink className={`${ctaButtonClassName} !bg-brand-foreground !text-brand hover:!bg-brand-foreground/90 hover:!text-brand`} />
              <ContactUsButton className={`${ctaButtonClassName} border border-brand-foreground/30 !bg-transparent !text-brand-foreground hover:!bg-brand-foreground/10 hover:!text-brand-foreground`} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
