import { Page } from '../containers/pages/Page';
import { AuthProvider } from '../containers/pages/AuthProvider';
export interface IConfigProps {
    logo: string;
    title: string;
    name: string;
    pages: Page[];
    auth: AuthProvider;
}
