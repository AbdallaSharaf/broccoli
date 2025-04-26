import { useLanguageContext } from '@/providers/LanguageContext';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json'; // Import Arabic translations

export function useTranslations(scope) {
  const { locale } = useLanguageContext();

  const currentTranslations = locale === 'ar' ? arTranslations : enTranslations;

  return (key, variables = {}) => {
    // Get the translation string
    const translation = currentTranslations[scope]?.[key] 
                     || enTranslations[scope]?.[key] 
                     || key;

    // Replace variables like {x} if provided
    return Object.keys(variables).reduce((text, variable) => {
      return text.replace(new RegExp(`{${variable}}`, 'g'), variables[variable]);
    }, translation);
  };
}
