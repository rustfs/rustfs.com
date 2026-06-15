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
}

interface FeaturePageProps {
  title: string;
  description: string;
  sections: FeaturePageSection[];
  links?: FeaturePageLink[];
}

function slugCode(value: string) {
  return value
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.replace(/[^a-z0-9]/gi, '').toUpperCase())
    .filter(Boolean)
    .join('.');
}

export default function FeaturePage({ title, description, sections, links }: FeaturePageProps) {
  const firstSection = sections[0];
  const restSections = sections.slice(1);

  return (
    <main className="relative z-10 flex-1 bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Product surface</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              {title}
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:ml-auto">
              {description}
            </p>
            {links && (
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {links.map((link) => (
                  <Button key={link.href} asChild size="lg" className="h-11 px-4 text-sm font-semibold">
                    <Link href={link.href}>
                      {link.label}
                      <ArrowRightIcon data-icon="inline-end" className="size-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {firstSection && (
          <div className="mt-12 grid border border-border bg-card lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="flex size-12 items-center justify-center bg-brand text-brand-foreground">
                <LayersIcon className="size-5" />
              </div>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
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
            <div className="grid sm:grid-cols-2">
              {firstSection.items?.map((item) => (
                <article key={item.title} className="motion-card border-b border-border p-5 even:sm:border-l last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <CheckIcon className="motion-icon-tile size-5 text-brand" />
                  <h3 className="mt-5 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          {restSections.map((section, index) => (
            <section key={section.title} className="border-t border-border pt-8">
              <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                    {String(index + 2).padStart(2, "0")}
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
                  <div className="grid border border-border bg-card md:grid-cols-2">
                    {section.items.map((item) => (
                      <article key={item.title} className="motion-card border-b border-border p-5 even:md:border-l md:[&:nth-last-child(-n+2)]:border-b-0">
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
      </section>
    </main>
  );
}
