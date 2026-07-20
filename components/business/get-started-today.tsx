'use client'

import ContactUsButton from './buttons/contact-us'
import DownloadLink from './buttons/download-link'
import HomeSectionHeader from './home-section-header'

const ctaButtonClassName = "!h-12 !min-h-12 w-full shrink-0 !px-5 !py-0 leading-none sm:!w-48";

const deployPaths = [
  {
    label: "Validate",
    detail: "single node",
  },
  {
    label: "Migrate",
    detail: "S3-compatible",
  },
  {
    label: "Operate",
    detail: "multi-node",
  },
];

export default function GetStartedToday() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="06"
          eyebrow="Deploy surface"
          title="Start building with RustFS"
          description="Download RustFS for local testing, or contact us to plan production deployment, migration, and enterprise support."
        />

        <div className="motion-card group relative overflow-hidden border border-brand bg-brand text-brand-foreground">
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(135deg,transparent_0_18px,var(--brand-foreground)_18px_19px,transparent_19px_36px)]"
          />

          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-brand-foreground/25 bg-brand-foreground/10 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground/80">
                  Production ready
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-foreground/55">
                  open source / s3 api
                </span>
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-brand-foreground sm:text-4xl">
                Deploy RustFS locally. Keep the same path to production.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-foreground/75">
                Start with one machine, then carry the same S3-compatible storage layer into migration and multi-node operations.
              </p>
            </div>

            <div className="flex flex-col gap-3 px-6 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:py-10">
              <DownloadLink className={`${ctaButtonClassName} !bg-brand-foreground !text-brand hover:!bg-brand-foreground/90 hover:!text-brand`} />
              <ContactUsButton className={`${ctaButtonClassName} border border-brand-foreground/30 !bg-transparent !text-brand-foreground hover:!bg-brand-foreground/10 hover:!text-brand-foreground`} />
            </div>
          </div>

          <div className="relative grid border-t border-brand-foreground/20 bg-black/10 sm:grid-cols-3">
            {deployPaths.map((path) => (
              <div
                key={path.label}
                className="border-b border-brand-foreground/15 px-6 py-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 lg:px-10"
              >
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-foreground/55">
                  {path.label}
                </div>
                <div className="mt-2 text-sm font-semibold text-brand-foreground">
                  {path.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
