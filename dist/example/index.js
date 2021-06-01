/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { Config } from '../application';
import logo from './assets/logo512.png';
import entity from './pages/entity';
import page from './pages/page';
import pageHidden from './pages/page-hidden';
import pageAdminOnly from './pages/page-admin-only';
import pageUserOnly from './pages/page-user-only';
import pageAdminAndUser from './pages/page-admin-and-user';
import jwtAuth from './auth/jwt';
import custom from './pages/custom';
import feature from './pages/feature';
export default new Config({
    logo: logo,
    host: 'https://sample.org',
    auth: jwtAuth,
    pages: [page, pageHidden, pageAdminOnly, pageUserOnly, pageAdminAndUser, entity, custom, feature],
    i18nDefaultLanguage: "en",
    i18nLanguages: ["en", "ru", "es"],
    i18nUseBrowserLanguageDetector: true,
    i18nResourcesContext: require.context('~/example/locales', true, /\.json$/)
});
