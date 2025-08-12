'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { defaultLocale, locales, type Locale } from './constants'

export type Messages = Record<string, unknown>

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, namespace?: string) => string
  messages: Messages
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

// 客户端动态加载语言包
export async function getMessagesClient(locale: Locale): Promise<Messages> {
  try {
    // 动态导入对应语言的 JSON 文件
    const response = await fetch(`/api/i18n/${locale}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch messages for locale: ${locale}`)
    }
    return await response.json()
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${locale}`, error)
    // 如果加载失败，尝试加载默认语言包
    if (locale !== defaultLocale) {
      try {
        const response = await fetch(`/api/i18n/${defaultLocale}`)
        if (response.ok) {
          return await response.json()
        }
      } catch (fallbackError) {
        console.warn(`Failed to load fallback messages for locale: ${defaultLocale}`, fallbackError)
      }
    }
    // 如果默认语言也失败，返回空对象
    return {}
  }
}

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider')
  }

  const { locale, t: translate, setLocale, isLoading } = context

  // 返回翻译函数，支持命名空间
  return {
    t: (key: string) => translate(key, namespace),
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', newLocale)
      }
    } catch (error) {
      console.error('Failed to change locale:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentLocale, pathname, router])

  const translate = (key: string, namespace?: string): string => {
    if (namespace) {
      // 如果有命名空间，先查找命名空间下的翻译
      const namespaceMessages = currentMessages[namespace] as Record<string, unknown>
      if (namespaceMessages && typeof namespaceMessages[key] === 'string') {
        return namespaceMessages[key] as string
      }
    }

    // 如果没有命名空间或命名空间下没有找到，查找全局翻译
    return (currentMessages[key] as string) || key
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && locales.includes(savedLocale) && savedLocale !== currentLocale) {
        handleSetLocale(savedLocale)
      }
    }
  }, [currentLocale, handleSetLocale])

  const value: I18nContextType = {
    locale: currentLocale,
    setLocale: handleSetLocale,
    t: translate,
    messages: currentMessages,
    isLoading
  }

  return React.createElement(I18nContext.Provider, { value }, children)
}

