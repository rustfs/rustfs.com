import { cn } from "@/lib/utils";

interface HomeSectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  sectionNumber?: string;
  className?: string;
}

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  sectionNumber,
  className,
}: HomeSectionHeaderProps) {
  return (
    <div className={cn("motion-reveal mb-10 lg:mb-14", className)}>
      <div className="relative h-px bg-border">
        <span className="absolute left-0 top-0 h-0.5 w-28 -translate-y-px bg-brand" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="min-w-0">
          <div className="mb-7 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {sectionNumber ? (
              <span className="bg-brand px-4 py-3 font-mono text-sm tracking-[0.14em] text-brand-foreground">
                {sectionNumber}
              </span>
            ) : null}
            <span className="font-mono text-brand">&gt;</span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-4xl font-bold leading-none text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:justify-self-end lg:text-right">
          {description}
        </p>
      </div>
    </div>
  );
}
