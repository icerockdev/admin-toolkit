/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import { mergeDeepLeft } from "ramda";
import { Config, IConfigProps } from "~/application";

export const DEFAULT_LANGUAGES = ["en", "ru"]
export const DEFAULT_NAMESPACE = "common"
export const DEFAULT_NAMESPACES = ["common", "buttons", "messages"]

const loadResources = (resourcesContext: IConfigProps['i18nResourcesContext'], languages: IConfigProps['i18nLanguages']): Resource => {
  const resources: Resource =
    languages.reduce((o, language) => Object.assign(o, {[language]: {}}), {});

  resourcesContext.keys().forEach((filePath: string) => {
    const language = getLanguage(filePath);
    if (!resources.hasOwnProperty(language)) {
      return;
    }
    const namespace = getNamespace(filePath);
    const translations = resourcesContext(filePath);

    const existTranslations = (resources[language][namespace] ?? {}) as object
    resources[language][namespace] = mergeDeepLeft(existTranslations, translations);
  });

  return resources
}

const getLanguage = (filePath: string): string => {
  return filePath.split('/').splice(1).shift() ?? "";
}

const getNamespace = (filePath: string): string => {
  return filePath.split('/')?.pop()?.split('.').shift() ?? "";
}

export const i18nInit = (config: Config) => {
  i18n.use(initReactI18next)

  if (config.i18nUseBrowserLanguageDetector) {
    i18n.use(BrowserLanguageDetector)
  }

  const defaultResources = loadResources(require.context('~/locales', true, /\.json$/), DEFAULT_LANGUAGES)
  const resources = mergeDeepLeft(loadResources(config.i18nResourcesContext, config.i18nLanguages), defaultResources)

  // noinspection JSIgnoredPromiseFromCall
  i18n.init({
    resources: resources,
    fallbackLng: config.i18nDefaultLanguage,
    debug: true,
    // have a common namespace used around the full app
    ns: DEFAULT_NAMESPACES,
    defaultNS: DEFAULT_NAMESPACE,
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    },
    react: {
      wait: true
    }
  });
}

export default i18n;
