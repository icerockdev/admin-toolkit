import { IAuthProviderProps } from '../../types/auth';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Config } from '../Config';
export declare class AuthProvider {
    parent?: Config;
    user: IAuthProviderProps['user'];
    authRequestFn?: IAuthProviderProps['authRequestFn'];
    roleTitles?: Record<any, string>;
    constructor(fields?: Partial<IAuthProviderProps>);
    isLoading: boolean;
    error: string;
    sendAuthRequestInstance?: CancellablePromise<any>;
    sendAuthRequest: ({ email, password, }: {
        email: string;
        password: string;
    }) => void;
    sendAuthRequestCancel: () => void;
    logout: () => void;
    withToken: (req: any, args: any) => any;
    get isLogged(): boolean;
}
