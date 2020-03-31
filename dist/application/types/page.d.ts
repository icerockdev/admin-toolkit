import { Config } from '../modules/Config';
export interface IPageProps {
    roles?: {
        all?: string[];
        list?: string[];
        update?: string[];
        create?: string[];
    };
    parent: Config;
    title: string;
    menu: {
        enabled: boolean;
        label: string;
        url: string;
    };
}
