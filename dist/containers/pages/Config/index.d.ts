/// <reference types="react" />
import { IConfigProps } from '../../../types/config';
import { Theme } from '@material-ui/core';
export declare class Config {
    name: IConfigProps['name'];
    pages: IConfigProps['pages'];
    auth?: IConfigProps['auth'];
    logo?: IConfigProps['logo'];
    title?: IConfigProps['title'];
    theme?: Theme;
    history: import("history").History<import("history").History.PoorMansUnknown>;
    constructor(fields?: Partial<IConfigProps>);
    get Layout(): JSX.Element;
}
