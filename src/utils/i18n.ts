import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const languageList = [
  { code: 'ca', name: 'Català' }, // Catalan
  // { code: 'zh-Hans', name: '中文' }, // Chinese (simplified)
  { code: 'da', name: 'Dansk' }, // Danish
  { code: 'de', name: 'Deutsch' }, // German
  { code: 'el', name: 'Ελληνικά' }, // Greek
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }, // Spanish
  { code: 'fr', name: 'Français' }, // French
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Nederlands' }, // Dutch
  { code: 'pl', name: 'polski' }, // Polish
  { code: 'pt', name: 'Português' },
  { code: 'sr', name: 'Српски' }, // Serbian
  { code: 'ru', name: 'Русский' }, // Russian
  { code: 'tr', name: 'Türkçe' }, // Turkish
  { code: 'uk', name: 'Українська' }, // Ukrainian
];

export const fallbackLng = {
  'ca-ES': ['ca'],
  'ca-AD': ['ca'],
  'el-GR': ['el'],
  'el-CY': ['el'],
  'en-US': ['en'],
  'en-UK': ['en'],
  'es-AR': ['es'],
  'es-ES': ['es'],
  'it-CH': ['it'],
  'pt-BR': ['pt'],
  'pt-PT': ['pt'],
  'fr-FR': ['fr'],
  'uk-UA': ['uk'],
  default: ['en'],
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    fallbackLng,
    backend: {
      loadPath: `/locales/{{lng}}.json?v=${process.env.REACT_APP_VERSION}`,
      allowMultiLoading: false,
    },
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react
    },
  });

i18n.on('languageChanged', (newLang) => {
  document.documentElement.lang = newLang;
});

export default i18n;
