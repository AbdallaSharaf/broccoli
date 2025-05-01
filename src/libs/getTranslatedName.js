"use client";

const getTranslatedName = (nameObj) => {
  const locale = typeof window !== 'undefined'
    ? (localStorage.getItem("locale") || 'ar')
    : 'ar'; // fallback

  // Ensure nameObj is a non-null object
  if (typeof nameObj !== 'object' || nameObj === null) {
    return "N/A";
  }

  if (nameObj[locale]) return nameObj[locale];
  const fallbackLocale = locale === "en" ? "ar" : "en";
  return nameObj[fallbackLocale] || "N/A";
};

export default getTranslatedName;
