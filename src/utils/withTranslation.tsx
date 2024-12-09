// lib/withTranslations.js
/*import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const withTranslation = (namespaces = ['common']) => async (context: any) => {
  //console.log('Translation context:', context);
  const locale = context?.locale ?? context?.defaultLocale ?? 'fr';
  
  //console.log('Using locale:', locale);
  //console.log('Using namespaces:', namespaces);

  try {
    const translations = await serverSideTranslations(locale, namespaces);
    //console.log('Translations loaded successfully :', translations);
    return {
      props: {
        ...translations,
      },
    };
  } catch (error) {
    //console.error('Error loading translations:', error);
    throw error;
  }
};*/

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const withTranslation =
  (namespaces = ['common']) =>
  async (ctx) => {
    const { locale } = ctx;
    return {
      props: {
        ...(await serverSideTranslations(locale, namespaces)),
      },
    };
  };