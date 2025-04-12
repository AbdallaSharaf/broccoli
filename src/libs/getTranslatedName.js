const getTranslatedName = (nameObj) => {
    const locale = localStorage.getItem("locale");
    if (!nameObj) return "N/A";
    if (nameObj[locale]) return nameObj[locale];
    const fallbackLocale = locale === "en" ? "ar" : "en";
    return nameObj[fallbackLocale] || "N/A";
  };

export default getTranslatedName
  