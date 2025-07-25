'use client'

import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'
import { useEffect, useState } from 'react'

interface LanguageToggleProps {
  className?: string
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useI18n()
  // Ensure component displays language state after client-side hydration
  const [mounted, setMounted] = useState(false)

  // 确保组件在客户端完全水合后再显示语言状态
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    if (language === 'zh') {
      setLanguage('en')
    } else if (language === 'en') {
      setLanguage('tr')
    } else {
      setLanguage('zh')
    }
  }

  // Display neutral loading state during server-side rendering
  if (!mounted) {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        aria-label="Language toggle"
        disabled
      >
        <Languages className="h-4 w-4 mr-2" />
        <span className="min-w-[24px] text-center opacity-50">
          中文
        </span>
      </button>
    )
  }

  const getNextLanguageLabel = () => {
    if (language === 'zh') return 'EN'
    if (language === 'en') return 'TR'
    return '中文'
  }

  const getAriaLabel = () => {
    if (language === 'zh') return 'Switch to English'
    if (language === 'en') return 'Switch to Türkçe'
    return 'Switch to 中文'
  }

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      aria-label={getAriaLabel()}
    >
      <Languages className="h-4 w-4 mr-2" />
      <span className="min-w-[24px] text-center">
        {getNextLanguageLabel()}
      </span>
    </button>
  )
}
