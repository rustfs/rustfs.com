'use client'

import { SITE_CONFIG } from '@/app.config'
import { X } from 'lucide-react'
import { useState, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'rustfs-language-banner-dismissed'

function subscribeLanguagePreference(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}

  const timer = window.setTimeout(onStoreChange, 0)
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange()
  }

  window.addEventListener('storage', handleStorage)

  return () => {
    window.clearTimeout(timer)
    window.removeEventListener('storage', handleStorage)
  }
}

function getLanguagePreferenceSnapshot() {
  if (typeof window === 'undefined') return false

  const isDismissed = localStorage.getItem(STORAGE_KEY) === 'true'
  const isChinese = navigator.language.toLowerCase().startsWith('zh')

  return isChinese && !isDismissed
}

export default function FixedLanguageBanner() {
  const shouldShowBanner = useSyncExternalStore(
    subscribeLanguagePreference,
    getLanguagePreferenceSnapshot,
    () => false,
  )
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleGoToChinese = () => {
    window.location.href = SITE_CONFIG.secondaryDomain
  }

  if (!shouldShowBanner || isDismissed) {
    return null
  }

  return (
    <div className="border-b border-border bg-background/85 text-muted-foreground backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2.5">
          <div className="flex-1 text-sm">
            <span>检测到您的浏览器语言为中文，</span>
            <button
              onClick={handleGoToChinese}
              className="ml-1 font-medium text-foreground underline underline-offset-4 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              前往中文站点
            </button>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="关闭提示"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
