'use client'

import { cn } from "@/lib/utils";
import { ArrowDownToLineIcon } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import Link from "next/link";

export default function DownloadLink({ className }: {
  className?: string | string[]
}) {
  const { t } = useTranslations('buttons');

  return (
    <Link href="/download" className={cn('group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-secondary-foreground/90 active:bg-secondary/80 active:text-secondary-foreground/80 focus-visible:outline-secondary transition-colors', className)}>
      <span className="mr-2">{t('Download')}</span>
      <ArrowDownToLineIcon className="h-3 w-3 flex-none" strokeWidth={2.5} />
    </Link>
  )
}
