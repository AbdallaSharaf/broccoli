  // Format date function
export const formatDate = (dateString, locale) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    };
    
    // Get current language from your i18n system or localStorage
    
    // For Arabic (ar) locale
    if (locale === 'ar') {
      return new Date(dateString).toLocaleDateString('ar-EG', options);
    }
    
    // Default English format
    return new Date(dateString).toLocaleDateString(undefined, options);
  };