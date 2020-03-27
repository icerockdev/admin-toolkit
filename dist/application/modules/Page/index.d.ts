/// <reference types="react" />
import { IPageProps } from '../../types/page';
export declare class Page {
    title: IPageProps['title'];
    menu: IPageProps['menu'];
    parent?: IPageProps['parent'];
    constructor(fields?: Partial<IPageProps>);
    onMount: (page: Page) => void;
    onUnmount: (page: Page) => void;
    get output(): () => JSX.Element;
}
