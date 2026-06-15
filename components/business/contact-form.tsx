import { ArrowRightIcon, GitBranchIcon, MailIcon, MessageCircleIcon } from 'lucide-react'
import type { ComponentType } from 'react'
import HomeSectionHeader from './home-section-header'

interface ContactFormProps {
  sectionNumber?: string;
}

function ContactRoute({
  href,
  icon: Icon,
  label,
  description,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="motion-card group grid border border-border bg-card p-5 transition-colors hover:bg-muted/35 sm:grid-cols-[1fr_auto] sm:items-center"
    >
      <div className="flex gap-4">
        <span className="motion-icon-tile flex size-11 shrink-0 items-center justify-center bg-brand text-brand-foreground">
          <Icon className="size-5" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{label}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
      <span className="motion-arrow mt-6 flex size-11 items-center justify-center text-brand sm:mt-0">
        <ArrowRightIcon className="size-5" />
      </span>
    </a>
  )
}

export default function ContactForm({ sectionNumber }: ContactFormProps = {}) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y border-border bg-muted/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">Contact Us</h1>
        <HomeSectionHeader
          sectionNumber={sectionNumber}
          eyebrow="Contact channel"
          title="Contact Us"
          description="Get in touch with the RustFS team for deployment planning, migration support, and enterprise requirements."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.86fr] lg:items-start">
          <a
            href="mailto:hello@rustfs.com"
            className="motion-card group block border border-border bg-card transition-colors hover:bg-muted/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                  Enterprise inquiry
                </p>
                <h2 className="mt-6 text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
                  Talk to the RustFS team.
                </h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  Send deployment planning, migration, production support, or enterprise requirements to hello@rustfs.com.
                </p>
              </div>

              <span className="motion-arrow flex size-12 items-center justify-center text-brand">
                <ArrowRightIcon className="size-5" aria-hidden="true" />
              </span>
            </div>
          </a>

          <div className="flex flex-col gap-4">
            <ContactRoute
              href="mailto:hello@rustfs.com"
              icon={MailIcon}
              label="Email"
              description="For enterprise deployment, migration, partnership, and support."
            />
            <ContactRoute
              href="https://github.com/rustfs/rustfs/discussions"
              icon={GitBranchIcon}
              label="GitHub Discussions"
              description="For community questions, roadmap discussion, and technical context."
            />
            <ContactRoute
              href="https://discord.gg/NcKBCEJp6P"
              icon={MessageCircleIcon}
              label="Discord"
              description="For fast community conversation and project updates."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
