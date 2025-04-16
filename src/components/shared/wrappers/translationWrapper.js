// components/TranslationWrapper.js
'use client';

import { useTranslations } from '@/hooks/useTranslate';

export const TranslationWrapper = ({ children, scope, serverTranslations }) => {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations(scope);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const context = {
    t: isClient ? t : (key) => serverTranslations?.[key] || key
  };

  return children(context);
};