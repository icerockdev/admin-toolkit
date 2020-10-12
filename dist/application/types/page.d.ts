import { Config } from '../modules/config/Config';
import { UserRole } from '..';
export interface IPageProps {
    roles?: UserRole[];
    parent: Config;
    title: string;
    menu: {
        enabled: boolean;
        label: string;
        url: string;
    };
}
