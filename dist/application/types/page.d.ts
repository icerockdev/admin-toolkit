import { Config } from '../modules/Config';
export interface IPageProps {
    roles?: Record<string, string[]>;
    parent: Config;
    title: string;
    menu: {
        enabled: boolean;
        label: string;
        url: string;
    };
}
