'use client'

import { SITE_CONFIG } from '@/app.config'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rustfs-language-banner-dismissed'

export default function FixedLanguageBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if banner was dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) {
      return
    }

    // Detect browser language
    const browserLang = navigator.language.toLowerCase()
    const isChinese = browserLang.startsWith('zh')

    if (isChinese) {
      setShowBanner(true)
    }
  }, [])

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleGoToChinese = () => {
    window.location.href = SITE_CONFIG.secondaryDomain
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="border-b border-border/50 bg-primary text-primary-foreground shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex-1 text-sm">
            <span>检测到您的浏览器语言为中文，</span>
            <button
              onClick={handleGoToChinese}
              className="ml-1 font-medium underline underline-offset-4 transition-all hover:no-underline hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded-sm"
            >
              前往中文站点
            </button>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 rounded-md p-1 transition-colors hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary active:bg-primary-foreground/20"
            aria-label="关闭提示"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

