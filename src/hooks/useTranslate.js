"use client"
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json'; // Import Arabic translations
// import getItemsFromLocalstorage from '@/libs/getItemsFromLocalstorage';

export function useTranslations(scope) {
  // Handle server-side case
  if (typeof window === 'undefined') {
    return (key) => key; // Fallback during SSR
  }
  
  let locale = "en";
  
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