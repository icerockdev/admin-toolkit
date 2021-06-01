/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IConfigProps } from '../../../types/config';
import { Notifications } from '../../common/Notification';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { FC } from 'react';
export declare class Config {
    constructor(options?: Partial<IConfigProps>);
    debug: boolean;
    host?: string;
    name: IConfigProps['name'];
    pages: IConfigProps['pages'];
    auth?: IConfigProps['auth'];
    logo?: IConfigProps['logo'];
    title?: IConfigProps['title'];
    i18nDefaultLanguage: IConfigProps['i18nDefaultLanguage'];
    i18nLanguages: IConfigProps['i18nLanguages'];
    i18nUseBrowserLanguageDetector: IConfigProps['i18nUseBrowserLanguageDetector'];
    i18nResourcesContext: IConfigProps['i18nResourcesContext'];
    theme: ThemeOptions;
    history: import("history").History<import("history").History.PoorMansUnknown>;
    notifications: Notifications;
    themeInstance: import("@material-ui/core/styles/createMuiTheme").Theme;
    layout: FC;
    get pagesForCurrentUser(): import("../..").Page[];
    get linksForCurrentUser(): {
        name: string;
        url: string;
        enabled: boolean;
    }[];
    get fallbackUrl(): string;
}
