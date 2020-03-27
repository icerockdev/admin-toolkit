import { Page } from '../modules/Page';
import { AuthProvider } from '../modules/AuthProvider';
export interface IConfigProps {
    logo: string;
    title: string;
    name: string;
    pages: Page[];
    auth: AuthProvider;
}
