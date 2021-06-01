/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import { mergeDeepLeft } from "ramda";
export var DEFAULT_LANGUAGES = ["en", "ru"];
export var DEFAULT_NAMESPACE = "common";
export var DEFAULT_NAMESPACES = ["common", "buttons", "messages"];
var loadResources = function (resourcesContext, languages) {
    var resources = languages.reduce(function (o, language) {
        var _a;
        return Object.assign(o, (_a = {}, _a[language] = {}, _a));
    }, {});
    resourcesContext.keys().forEach(function (filePath) {
        var _a;
        var language = getLanguage(filePath);
        if (!resources.hasOwnProperty(language)) {
            return;
        }
        var namespace = getNamespace(filePath);
        var translations = resourcesContext(filePath);
        var existTranslations = ((_a = resources[language][namespace]) !== null && _a !== void 0 ? _a : {});
        resources[language][namespace] = mergeDeepLeft(existTranslations, translations);
    });
    return resources;
};
var getLanguage = function (filePath) {
    var _a;
    return (_a = filePath.split('/').splice(1).shift()) !== null && _a !== void 0 ? _a : "";
};
var getNamespace = function (filePath) {
    var _a, _b, _c;
    return (_c = (_b = (_a = filePath.split('/')) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.split('.').shift()) !== null && _c !== void 0 ? _c : "";
};
export var i18nInit = function (config) {
    i18n.use(initReactI18next);
    if (config.i18nUseBrowserLanguageDetector) {
        i18n.use(BrowserLanguageDetector);
    }
    var defaultResources = loadResources(require.context('~/locales', true, /\.json$/), DEFAULT_LANGUAGES);
    var resources = mergeDeepLeft(loadResources(config.i18nResourcesContext, config.i18nLanguages), defaultResources);
    // noinspection JSIgnoredPromiseFromCall
    i18n.init({
        resources: resources,
        fallbackLng: config.i18nDefaultLanguage,
        debug: config.debug,
        // have a common namespace used around the full app
        ns: DEFAULT_NAMESPACES,
        defaultNS: DEFAULT_NAMESPACE,
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
            wait: true
        }
    });
};
export default i18n;
