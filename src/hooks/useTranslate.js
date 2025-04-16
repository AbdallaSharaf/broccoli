import { useLanguageContext } from '@/providers/LanguageContext';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

export function useTranslations(scope) {
  // Get the context unconditionally at the top level
  const { locale } = useLanguageContext();
  
  // Handle server-side case
  const isServer = typeof window === 'undefined';
  
  // Return translation function
  return (key) => {
    if (isServer) {
      return key; // Fallback during SSR
    }
    
    // Client-side only
    const currentTranslations = locale === 'ar' ? arTranslations : enTranslations;
    return currentTranslations[scope]?.[key] || enTranslations[scope]?.[key] || key;
  };
}