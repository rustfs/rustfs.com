import { cn } from "@/lib/utils";

interface HomeSectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  headingLevel?: 1 | 2;
}

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  className,
  headingLevel = 2,
}: HomeSectionHeaderProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className={cn("motion-reveal mb-9 lg:mb-12", className)}>
      <div className="relative h-px bg-border/70">
        <span className="absolute left-0 top-0 h-px w-16 bg-brand" />
      </div>

      <div className="mt-7 max-w-4xl">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span aria-hidden="true" className="h-px w-5 bg-brand/70" />
          <span>{eyebrow}</span>
        </div>
        <Heading className="text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-foreground md:text-5xl">
          {title}
        </Heading>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
