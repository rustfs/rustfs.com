'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// Supported language types
type Language = 'zh' | 'en' | 'tr'

// Translation dictionary interface
interface Dictionary {
  [key: string]: string | Dictionary
}

// i18n context interface
interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tw: (zh: string, en: string, tr?: string) => string
  toggleLanguage: () => void
}

// Create context
const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Lazy load dictionaries
const dictionaries: Record<Language, () => Promise<Dictionary>> = {
  zh: () => import('@/locales/zh.json').then(module => module.default),
  en: () => import('@/locales/en.json').then(module => module.default),
  tr: () => import('@/locales/tr.json').then(module => module.default),
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
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en' || savedLanguage === 'tr')) {
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

  // Trilingual toggle function
  const toggleLanguage = () => {
    if (language === 'zh') {
      setLanguage('en')
    } else if (language === 'en') {
      setLanguage('tr')
    } else {
      setLanguage('zh')
    }
  }

  // Trilingual text function
  const tw = (zh: string, en: string, tr?: string): string => {
    if (language === 'zh') return zh
    if (language === 'en') return en
    return tr || en // Fallback to English if Turkish not provided
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
