"use client";

const getTranslatedName = (nameObj) => {
  // Safe access to localStorage
  const locale = typeof window !== 'undefined' ? 
    (localStorage.getItem("locale") || 'ar') : 
    'ar'; // Server-side fallback

  if (!nameObj) return "N/A";
  if (nameObj[locale]) return nameObj[locale];
  const fallbackLocale = locale === "en" ? "ar" : "en";
  return nameObj[fallbackLocale] || "N/A";
};

export default getTranslatedName;