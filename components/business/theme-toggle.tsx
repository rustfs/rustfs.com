'use client'

import { MoonIcon, SunIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Display neutral loading state during server-side rendering and initial hydration
  if (!mounted) {
    return (
      <button
        type="button"
        className="relative inline-flex size-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-primary motion-reduce:transition-none"
        aria-label="Toggle theme"
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

  // Only render theme-specific content after hydration is complete
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex size-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-primary motion-reduce:transition-none"
      aria-label="Toggle theme"
    >
      <div className="relative size-5">
        <AnimatePresence mode="wait">
          {resolvedTheme === 'dark' ? (
            <motion.div
              key="moon"
              initial={reduceMotion ? false : { scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0, rotate: 90, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0"
            >
              <MoonIcon className="size-5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={reduceMotion ? false : { scale: 0, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0, rotate: -90, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.2,
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
