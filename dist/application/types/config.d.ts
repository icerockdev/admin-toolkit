/// <reference types="webpack-env" />
import { Page } from '../modules/pages/Page';
import { AuthProvider } from '../modules/auth/AuthProvider';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { FC } from 'react';
export interface IConfigProps {
    logo: string;
    title: string;
    name: string;
    pages: Page[];
    auth: AuthProvider;
    theme?: ThemeOptions;
    layout?: FC;
    host?: string;
    i18nDefaultLanguage: string;
    i18nLanguages: string[];
    i18nUseBrowserLanguageDetector: boolean;
    i18nResourcesContext: __WebpackModuleApi.RequireContext;
}
