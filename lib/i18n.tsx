'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// Supported language types
type Language = 'zh' | 'en'

// Translation dictionary interface
interface Dictionary {
  [key: string]: string | Dictionary
}

// i18n context interface
interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tw: (zh: string, en: string) => string
  toggleLanguage: () => void
}

// Create context
const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Lazy load dictionaries
const dictionaries: Record<Language, () => Promise<Dictionary>> = {
  zh: () => import('@/locales/zh.json').then(module => module.default),
  en: () => import('@/locales/en.json').then(module => module.default)
}

// Get dictionary
const getDictionary = async (language: Language): Promise<Dictionary> => {
  return dictionaries[language]()
}

// i18n provider component
export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Use default language on initialization to avoid hydration issues
  const [language, setLanguageState] = useState<Language>('zh')
  const [dictionary, setDictionary] = useState<Dictionary>({})

  // Read saved language preference from localStorage after client-side hydration
  useEffect(() => {
    // Read language preference from cookie or localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Load dictionary
  useEffect(() => {
    getDictionary(language).then(setDictionary)
  }, [language])

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.')
    let current: string | Dictionary = dictionary

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k]
      } else {
        return key // Return original key if translation not found
      }
    }

    return typeof current === 'string' ? current : key
  }

  // Bilingual toggle function
  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh'
    setLanguage(newLang)
  }

  // Bilingual text function
  const tw = (zh: string, en: string): string => {
    return language === 'zh' ? zh : en
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, tw, toggleLanguage }}>
      {children}
    </I18nContext.Provider>
  )
}

// Hook to use i18n
export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
