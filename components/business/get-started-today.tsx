'use client'

import ContactUsButton from './buttons/contact-us'
import DownloadLink from './buttons/download-link'
import HomeSectionHeader from './home-section-header'
import BackgroundGrid from '@/components/ui/background-grid'

const ctaButtonClassName = "!h-16 !min-h-16 w-full shrink-0 !px-0 !py-0 leading-none sm:!w-60";

export default function GetStartedToday() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-muted/30 py-24 text-foreground sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="06"
          eyebrow="Deploy surface"
          title="Start building with RustFS"
          description="Download RustFS for local testing, or contact us to plan production deployment, migration, and enterprise support."
        />

        <div className="motion-card grid border border-border bg-card lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <code className="border border-border bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              production-ready
            </code>
            <h2 className="mt-8 font-display text-2xl font-semibold leading-tight text-foreground sm:text-4xl">
              Open-source object storage for AI and cloud-native workloads.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
              Use the same storage foundation from laptop validation to multi-node deployment.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <DownloadLink className={`${ctaButtonClassName} border border-primary`} />
              <ContactUsButton className={`${ctaButtonClassName} border border-border bg-background text-foreground hover:bg-muted`} />
            </div>
          </div>

          <div className="relative min-h-80 overflow-hidden bg-background lg:min-h-full">
            <BackgroundGrid className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
