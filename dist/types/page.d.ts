import { Config } from "../containers/pages/Config";
export interface IPageProps {
    parent: Config;
    title: string;
    menu: {
        enabled: boolean;
        label: string;
        url: string;
    };
}
