import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, LayersIcon } from "lucide-react";
import Link from "next/link";

export interface FeaturePageSection {
  title: string;
  description?: string;
  items?: {
    title: string;
    description: string;
  }[];
}

export interface FeaturePageLink {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

interface FeaturePageProps {
  title: string;
  description: string;
  sections: FeaturePageSection[];
  links?: FeaturePageLink[];
}

function slugCode(value: string) {
  const stopWords = new Set(["and", "or", "the", "for", "to", "of", "with", "&"]);
  const words = value
    .split(/\s+/)
    .filter((word) => !stopWords.has(word.toLowerCase()))
    .map((word) => word.replace(/[^a-z0-9]/gi, '').toUpperCase())
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map((word) => (word.length > 4 ? word.slice(0, 4) : word))
    .join('.');
}

export default function FeaturePage({ title, description, sections, links }: FeaturePageProps) {
  const firstSection = sections[0];
  const restSections = sections.slice(1);
  const primaryItems = firstSection?.items?.slice(0, 3) ?? [];
  const productLinks = links ?? [
    { label: "Talk to us", href: "/contact-us" },
    { label: "Read docs", href: "/docs", variant: "outline" as const },
  ];

  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="relative h-px bg-border">
          <span className="absolute left-0 top-0 h-0.5 w-28 -translate-y-px bg-brand" />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:gap-4">
              <span className="bg-brand px-4 py-3 font-mono text-sm tracking-[0.14em] text-brand-foreground">
                {slugCode(title)}
              </span>
              <span className="font-mono text-brand">&gt;</span>
              <span>Product surface</span>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-4xl font-extrabold leading-none text-foreground sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {productLinks.map((link, index) => (
                <Button
                  key={link.href}
                  asChild
                  variant={link.variant ?? (index === 0 ? "default" : "outline")}
                  size="lg"
                  className="h-12 min-w-40 px-5 text-sm font-semibold"
                >
                  <Link href={link.href}>
                    {link.label}
                    <ArrowRightIcon data-icon="inline-end" className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="motion-reveal border border-border bg-card/80" data-motion-delay="1">
            <div className="grid grid-cols-[1fr_auto] border-b border-border">
              <span className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Capability map
              </span>
              <code className="border-l border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
                RustFS
              </code>
            </div>
            <div>
              <div className="relative min-h-64 overflow-hidden border-b border-border p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
                />
                <div className="relative grid h-full gap-3 sm:grid-cols-2">
                  {sections.slice(0, 4).map((section) => (
                    <div key={section.title} className="border border-border bg-card/90 p-4">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                        {slugCode(section.title)}
                      </p>
                      <h2 className="mt-5 text-base font-semibold leading-6 text-foreground">
                        {section.title}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-px bg-border sm:grid-cols-3">
                {primaryItems.map((item) => (
                  <div key={item.title} className="bg-background/70 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Client
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Control
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Storage
                </span>
              </div>
            </div>
          </div>
        </div>

        {firstSection && (
          <div className="mt-16 grid border border-border bg-card/85 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="motion-icon-tile flex size-12 items-center justify-center border border-brand bg-brand text-brand-foreground">
                <LayersIcon className="size-5" />
              </div>
              <p className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                {slugCode(firstSection.title) || "CORE"}
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-foreground">
                {firstSection.title}
              </h2>
              {firstSection.description && (
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {firstSection.description}
                </p>
              )}
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {firstSection.items?.map((item) => (
                <article key={item.title} className="motion-card bg-card p-5">
                  <span className="motion-icon-tile flex size-8 items-center justify-center border border-border bg-background/70 text-brand">
                    <CheckIcon className="size-4" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold leading-6 text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {restSections.map((section) => (
            <section key={section.title} className="border-t border-border pt-10">
              <div className="grid gap-8 lg:grid-cols-[0.38fr_1fr]">
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                    {slugCode(section.title)}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {section.description}
                    </p>
                  )}
                </div>
                {section.items && (
                  <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                    {section.items.map((item) => (
                      <article key={item.title} className="motion-card bg-card p-5">
                        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border border-border bg-card/80 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Production review
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                Map this surface to your deployment plan.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Share your topology, access model, and operational constraints with the RustFS team before you standardize the rollout.
              </p>
            </div>
            <Button asChild size="lg" className="h-12 min-w-40 px-5 text-sm font-semibold">
              <Link href="/contact-us">
                Contact us
                <ArrowRightIcon data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
