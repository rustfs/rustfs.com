'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { locales, type Locale } from './constants'
import { getMessagesClient, translate, type Messages } from './i18n-utils'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, namespace?: string, values?: Record<string, string | number>) => string
  messages: Messages
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider')
  }

  const { locale, t: translate, setLocale, isLoading } = context

  // 使用 useCallback 稳定 t 函数的引用
  const stableTranslate = useCallback((key: string, values?: Record<string, string | number>) => {
    return translate(key, namespace, values)
  }, [translate, namespace])

  // 返回翻译函数，支持命名空间
  return {
    t: stableTranslate,
    locale,
    setLocale,
    isLoading
  }
}

export function I18nProvider({
  children,
  locale,
  messages: initialMessages
}: {
  children: React.ReactNode
  locale: Locale
  messages: Messages
}) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale)
  const [currentMessages, setCurrentMessages] = useState<Messages>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSetLocale = useCallback(async (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    setIsLoading(true)
    try {
      // 动态加载新语言包
      const newMessages = await getMessagesClient(newLocale)
      setCurrentLocale(newLocale)
      setCurrentMessages(newMessages)

      // 更新路由
      const segments = pathname.split('/')
      if (segments[1] && locales.includes(segments[1] as Locale)) {
        segments[1] = newLocale
      } else {
        segments.splice(1, 0, newLocale)
      }
      router.push(segments.join('/'))

      // 保存到 localStorage
      if (isClient) {
        localStorage.setItem('locale', newLocale)
      }
    } catch (error) {
      console.error('Failed to change locale:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentLocale, pathname, router, isClient])

  const translateFunction = useCallback((key: string, namespace?: string, values?: Record<string, string | number>): string => {
    return translate(currentMessages, key, namespace, values)
  }, [currentMessages])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && locales.includes(savedLocale) && savedLocale !== currentLocale) {
        // 直接调用逻辑，避免依赖 handleSetLocale 导致的无限循环
        const changeLocale = async () => {
          setIsLoading(true)
          try {
            // 动态加载新语言包
            const newMessages = await getMessagesClient(savedLocale)
            setCurrentLocale(savedLocale)
            setCurrentMessages(newMessages)

            // 更新路由
            const segments = pathname.split('/')
            if (segments[1] && locales.includes(segments[1] as Locale)) {
              segments[1] = savedLocale
            } else {
              segments.splice(1, 0, savedLocale)
            }
            router.push(segments.join('/'))

            // 保存到 localStorage
            localStorage.setItem('locale', savedLocale)
          } catch (error) {
            console.error('Failed to change locale:', error)
          } finally {
            setIsLoading(false)
          }
        }
        changeLocale()
      }
    }
  }, [currentLocale, isClient, pathname, router])

  const value: I18nContextType = {
    locale: currentLocale,
    setLocale: handleSetLocale,
    t: translateFunction,
    messages: currentMessages,
    isLoading
  }

  return React.createElement(I18nContext.Provider, { value }, children)
}

