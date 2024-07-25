import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ukJSON from './locales/uk/translations.json';
import enJSON from './locales/en/translations.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'uk',
  lng: navigator.language || 'uk',
  resources: {
    uk: { translations: { ...ukJSON } },
    en: { translations: { ...enJSON } },
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'uk'];
export default i18n;
