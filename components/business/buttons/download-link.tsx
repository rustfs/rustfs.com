'use client'

import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowDownToLineIcon } from "lucide-react";
import Link from "next/link";

export default function DownloadLink({ className }: {
  className?: string | string[]
}) {
  const { t } = useTranslations('buttons');

  return (
    <Link href="/download" className={cn('group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground focus-visible:outline-secondary transition-colors', className)}>
      <span className="mr-2">{t('Download')}</span>
      <ArrowDownToLineIcon className="h-3 w-3 flex-none" strokeWidth={2.5} />
    </Link>
  )
}
