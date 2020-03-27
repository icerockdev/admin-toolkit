import { Config } from "../modules/Config";
export interface IPageProps {
    parent: Config;
    title: string;
    menu: {
        enabled: boolean;
        label: string;
        url: string;
    };
}
