"use client"
import { useLanguageContext } from '@/providers/LanguageContext'
import { useEffect } from 'react'
const RTLManager = () => {

  const locale = useLanguageContext()

  useEffect(() => {
    const existingLink = document.getElementById('rtl-stylesheet')

    if (locale === 'ar') {
      if (!existingLink) {
        const link = document.createElement('link')
        link.id = 'rtl-stylesheet'
        link.rel = 'stylesheet'
        link.href = '../app/globals-rtl.css' // adjust to your path
        document.head.appendChild(link)
      }
    } else {
      if (existingLink) {
        existingLink.remove()
      }
    }
  }, [locale])

  useEffect(() => {
    // document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
  }, [locale])

  return null
}

export default RTLManager