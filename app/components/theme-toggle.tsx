'use client'

import { useI18n } from '@/lib/i18n';
import { MoonIcon, SunIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { tw } = useI18n();
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative p-0 text-muted-foreground hover:text-primary transition-colors"
      aria-label={tw('切换主题', 'Toggle theme')}
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
