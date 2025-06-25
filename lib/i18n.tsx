'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// 支持的语言类型
export type Locale = 'zh' | 'en'

// 翻译字典接口
interface Dictionary {
  [key: string]: string | Dictionary
}

// i18n 上下文接口
interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  tw: (zh: string, en: string) => string
}

// 创建上下文
const I18nContext = createContext<I18nContextType | undefined>(undefined)

// 懒加载字典
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  zh: () => import('../locales/zh.json').then((module) => module.default),
  en: () => import('../locales/en.json').then((module) => module.default),
}

// 获取字典
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]()
}

// i18n 提供者组件
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh')
  const [dictionary, setDictionary] = useState<Dictionary>({})

  // 从本地存储中读取语言偏好
  useEffect(() => {
    const savedLocale = localStorage.getItem('rustfs-locale') as Locale | null
    if (savedLocale && ['zh', 'en'].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  // 加载字典
  useEffect(() => {
    dictionaries[locale]().then(setDictionary)
  }, [locale])

  // 设置语言并保存到本地存储
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('rustfs-locale', newLocale)
  }

  // 翻译函数
  const t = (key: string): string => {
    const keys = key.split('.')
    let current: string | Dictionary = dictionary

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k]
      } else {
        return key // 如果找不到翻译，返回原始 key
      }
    }

    return typeof current === 'string' ? current : key
  }

  // 双语切换函数
  const tw = (zh: string, en: string): string => {
    return locale === 'zh' ? zh : en
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tw }}>
      {children}
    </I18nContext.Provider>
  )
}

// 使用 i18n 的钩子
export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
