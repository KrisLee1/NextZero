import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from '@/public/locales/de/common.json';
import en from '@/public/locales/en/common.json';
import fr from '@/public/locales/fr/common.json';
import ja from '@/public/locales/ja/common.json';
import ko from '@/public/locales/ko/common.json';
import ru from '@/public/locales/ru/common.json';
import zh from '@/public/locales/zh/common.json';
import zhHant from '@/public/locales/zh-Hant/common.json';

const fallbackLng = 'en';
const defaultNS = 'common';
const languages = [fallbackLng, 'zh', 'zh-Hant', 'ja', 'ko', 'de', 'ru', 'fr'];

i18n
  // 将 i18n 实例传递给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    supportedLngs: languages,
    // Keep the server and initial client render identical. The browser
    // preference is applied by I18nProvider after hydration.
    lng: fallbackLng,
    fallbackLng,
    ns: defaultNS,
    defaultNS,
    fallbackNS: defaultNS,
    interpolation: {
      escapeValue: false, // 不需要 React 已经转义
    },
    initAsync: false,
    resources: {
      de: { common: de },
      en: { common: en },
      fr: { common: fr },
      ja: { common: ja },
      ko: { common: ko },
      ru: { common: ru },
      zh: { common: zh },
      'zh-Hant': { common: zhHant },
    },
  });

export default i18n;

interface Locale {
  code: string;
  label: string;
}

export const languageList: Locale[] = [
  {
    "code": "zh",
    "label": "中文"
  },
  {
    "code": "zh-Hant",
    "label": "中文（繁體）"
  },
  {
    "code": "en",
    "label": "English"
  },
  {
    "code": "ja",
    "label": "日本語"
  },
  {
    "code": "ko",
    "label": "한국어"
  },
  {
    "code": "de",
    "label": "Deutsch"
  },
  {
    "code": "ru",
    "label": "Русский"
  },
  {
    "code": "fr",
    "label": "Français"
  }
];
