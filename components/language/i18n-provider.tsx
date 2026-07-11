'use client'

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { languageList } from '@/config/i18n.config'

interface I18nextProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nextProviderProps){
  useEffect(() => {
    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    const storedLanguage = window.localStorage.getItem('i18nextLng');
    const browserLanguage = navigator.languages[0] ?? navigator.language;
    const preferredLanguage = queryLanguage ?? storedLanguage ?? browserLanguage;
    const supportedLanguage = languageList
      .map(({ code }) => code)
      .filter((code) => preferredLanguage === code || preferredLanguage.startsWith(`${code}-`))
      .sort((left, right) => right.length - left.length)[0];

    if (supportedLanguage) {
      void i18n.changeLanguage(supportedLanguage);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  );
}
