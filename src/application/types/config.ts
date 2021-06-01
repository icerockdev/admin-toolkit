/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Page } from '~/application/modules/pages/Page';
import { AuthProvider } from '~/application/modules/auth/AuthProvider';
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
