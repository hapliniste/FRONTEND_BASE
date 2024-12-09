// src/hooks/useComponentTranslation.ts
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const useComponentTranslation = (translations: Record<string, any>) => {
  const { i18n } = useTranslation();

  useMemo(() => {
    const defaultNS = Array.isArray(i18n.options.defaultNS)
      ? i18n.options.defaultNS[0]
      : i18n.options.defaultNS;

    if (typeof defaultNS === 'string') {
      Object.keys(translations).forEach((lng) => {
        i18n.addResourceBundle(lng, defaultNS, translations[lng]);
        //console.log('translations', translations);
      });
    }
    //console.log('translations', translations);
  }, [i18n, translations]);

  return useTranslation();
};

export default useComponentTranslation;