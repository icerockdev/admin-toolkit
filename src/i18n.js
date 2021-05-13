import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EN from '~/locales/en/main.json';
import RU from '~/locales/ru/main.json';
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
  resources: {
    en: {
      main: EN
    },
    ru: {
      main: RU
    },
  },
  fallbackLng: "en",
  debug: true,
  // have a common namespace used around the full app
  ns: ["main"],
  defaultNS: "main",
  keySeparator: false, // we use content as keys
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});

export default i18n;
