'use client'

import { MoonIcon, SunIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from '@/lib/i18n';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { t } = useTranslations('theme');
  const { resolvedTheme, setTheme } = useTheme()
  // Ensure component displays theme state after client-side hydration
  const [mounted, setMounted] = useState(false)

  // 确保组件在客户端完全水合后再显示主题状态
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Display neutral loading state during server-side rendering
  if (!mounted) {
    return (
      <button
        type="button"
        className="relative p-0 text-muted-foreground hover:text-primary transition-colors"
        aria-label={t('toggle')}
        disabled
      >
        <div className="relative size-5">
          <div className="absolute inset-0 opacity-50">
            <SunIcon className="size-5" />
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative p-0 text-muted-foreground hover:text-primary transition-colors"
      aria-label={t('toggle')}
    >
      <div className="relative size-5">
        <AnimatePresence mode="wait">
          {resolvedTheme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0"
            >
              <MoonIcon className="size-5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: -90, opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0"
            >
              <SunIcon className="size-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}
