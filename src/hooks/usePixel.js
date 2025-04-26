'use client';

export function usePixel() {
  const trackEvent = (event, options = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event, options);
    }
  };

  const trackCustomEvent = (eventName, options = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, options);
    }
  };

  return { trackEvent, trackCustomEvent };
}
