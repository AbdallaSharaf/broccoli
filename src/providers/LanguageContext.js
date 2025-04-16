'use client'

import main from '@/libs/main'
import { createContext, useState, useContext, useEffect } from 'react'

const LanguageContext = createContext(null)

export default function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('ar') // Default to English

  // Initialize from localStorage or default to English
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale')
    
    // If no saved locale, default to English
    if (!savedLocale) {
      setLocale('ar')
      localStorage.setItem('locale', 'ar')
      document.documentElement.lang = 'en'
      document.documentElement.dir = 'ltr'
      return
    }

    // If there is a saved locale, use it
    const isArabic = savedLocale === 'ar'
    const finalLocale = isArabic ? 'ar' : 'en'
    setLocale(finalLocale)
    document.documentElement.lang = finalLocale
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [])

  // Toggle between languages
  const toggleLanguage = (newLocale) => {
    if (newLocale === locale) return
    
    main()
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        toggleLanguage,
        isRtl: locale === 'ar',
      }}
    >
      <div key={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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