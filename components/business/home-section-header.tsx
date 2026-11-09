import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HomeSectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
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
      <div className="type-label-md mb-7 flex items-center gap-4 text-muted-foreground">
        <span className="h-px w-8 shrink-0 bg-brand" aria-hidden="true" />
        <span className="shrink-0">{eyebrow}</span>
        <span className="h-px min-w-8 flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <Heading className="w-full break-words text-balance type-headline-lg md:type-display-md text-foreground">
          {title}
        </Heading>
        <p className="type-body-md mt-5 max-w-3xl text-pretty text-left text-muted-foreground md:type-body-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
