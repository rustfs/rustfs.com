'use client'

import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GetStartedButton() {
  const t = useTranslations();

  return (
    <a href="https://docs.rustfs.com" className="group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-secondary-foreground/90 active:bg-secondary/80 active:text-secondary-foreground/80 focus-visible:outline-secondary transition-colors">
      <span className="mr-2">{t('buttons.getStarted')}</span>
      <ArrowRightIcon className="h-3 w-3 flex-none" strokeWidth={2.5} />
    </a>
  )
}
