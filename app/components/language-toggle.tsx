'use client'

import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'

interface LanguageToggleProps {
  className?: string
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale } = useI18n()

  const toggleLanguage = () => {
    setLocale(locale === 'zh' ? 'en' : 'zh')
  }

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      aria-label={`Switch to ${locale === 'zh' ? 'English' : '中文'}`}
    >
      <Languages className="h-4 w-4 mr-2" />
      <span className="min-w-[24px] text-center">
        {locale === 'zh' ? 'EN' : '中文'}
      </span>
    </button>
  )
}
