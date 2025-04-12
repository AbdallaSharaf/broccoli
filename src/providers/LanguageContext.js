'use client'

import main from '@/libs/main'
import { createContext, useState, useContext, useEffect } from 'react'

const LanguageContext = createContext(null)

export default function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en')

  // Initialize from localStorage or browser language
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale')
    const browserLang = navigator.language
    const isArabic = savedLocale
      ? savedLocale === 'ar'
      : ['ar', 'he', 'fa'].some(lang => browserLang.startsWith(lang))

    const finalLocale = isArabic ? 'ar' : 'en'
    setLocale(finalLocale)
    
    // Set <html dir=""> and <html lang="">
    document.documentElement.lang = finalLocale
  }, [])

  // Toggle between languages
  const toggleLanguage = (newLocale) => {
    if (newLocale === locale) {
      return
    }
    main()
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)

    // Set <html dir=""> and <html lang="">
    document.documentElement.lang = newLocale
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        toggleLanguage,
        isRtl: locale === 'ar',
      }}
    >
      <div key={locale}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }
  return context
}
