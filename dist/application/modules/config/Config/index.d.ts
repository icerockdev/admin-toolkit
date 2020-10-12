import { IConfigProps } from '../../../types/config';
import { Notifications } from '../../common/Notification';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { FC } from 'react';
export declare class Config {
    constructor(options?: Partial<IConfigProps>);
    host?: string;
    name: IConfigProps['name'];
    pages: IConfigProps['pages'];
    auth?: IConfigProps['auth'];
    logo?: IConfigProps['logo'];
    title?: IConfigProps['title'];
    theme: ThemeOptions;
    history: import("history").History<import("history").History.PoorMansUnknown>;
    notifications: Notifications;
    themeInstance: import("@material-ui/core/styles/createMuiTheme").Theme;
    layout: FC;
    get pagesForCurrentUser(): import("../..").Page[];
    get linksForCurrentUser(): {
        name: string;
        url: string;
    }[];
    get fallbackUrl(): string;
}
