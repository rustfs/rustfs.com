import { ArrowUpRight } from "lucide-react";

type RedirectPanelProps = {
  actionLabel: string;
  description: string;
  eyebrow: string;
  href: string;
  label: string;
  title: string;
};

export function RedirectPanel({
  actionLabel,
  description,
  eyebrow,
  href,
  label,
  title,
}: RedirectPanelProps) {
  return (
    <main className="relative min-h-[100dvh] text-foreground">
      <div className="mx-auto flex min-h-[100dvh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <section className="w-full border border-border bg-card/80 backdrop-blur-sm">
          <header className="grid grid-cols-[1fr_auto] border-b border-border text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="px-5 py-4">{eyebrow}</span>
            <span className="border-l border-border px-5 py-4">{label}</span>
          </header>
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 h-px w-full bg-border">
              <div className="h-px w-28 bg-brand" />
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              {description}
            </p>
            <a
              className="motion-button mt-8 inline-flex h-11 items-center gap-2 border border-border bg-muted px-5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
              href={href}
            >
              {actionLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
