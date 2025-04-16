import { useLanguageContext } from '@/providers/LanguageContext';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json'; // Import Arabic translations

export function useTranslations(scope) {
  const { locale } = useLanguageContext();

  // Select the correct translations based on locale
  const currentTranslations = locale === 'ar' ? arTranslations : enTranslations;

  // Return translation function for the specified scope
  return (key) => {
    // Try current locale first, then English fallback, then return key as last resort
    return currentTranslations[scope]?.[key] 
           || enTranslations[scope]?.[key] 
           || key;
  };
}