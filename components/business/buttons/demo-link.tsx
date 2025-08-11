'use client'

import { cn } from "@/lib/utils";
import { ScanSearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DemoLink({ className }: {
  className?: string | string[]
}) {
  const t = useTranslations();

  return (
    <a href="https://play.rustfs.com" className={cn('group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground/90 active:bg-secondary/80 active:text-secondary-foreground/80 focus-visible:outline-secondary transition-colors', className)}>
      <span className="mr-2">{t('buttons.View Demo')}</span>
      <ScanSearchIcon className="h-3 w-3 flex-none" strokeWidth={2.5} />
    </a>
  )
}
