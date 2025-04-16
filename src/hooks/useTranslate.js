'use client';

import { useLanguageContext } from '@/providers/LanguageContext';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

export function useTranslations(scope) {
  const locale = useLanguageContext() || 'en';

  const currentTranslations =
    locale === 'ar' ? arTranslations : enTranslations;

  return (key) => {
    return (
      currentTranslations?.[scope]?.[key] ||
      enTranslations?.[scope]?.[key] ||
      key
    );
  };
}
