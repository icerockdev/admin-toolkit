import { AuthProviderOptions, AuthProviderUser, WithTokenFunction } from '../../../types/auth';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Config } from '../../config/Config';
import { FC } from 'react';
export declare class AuthProvider<U extends AuthProviderUser = AuthProviderUser> {
    constructor(options?: Partial<AuthProviderOptions>);
    splash: string;
    layout: FC;
    parent?: Config;
    user: AuthProviderUser;
    authRequestFn?: AuthProviderOptions['authRequestFn'];
    authPasswRestoreFn?: AuthProviderOptions['authPasswRestoreFn'];
    authPasswUpdateFn?: AuthProviderOptions['authPasswUpdateFn'];
    roleTitles?: Record<any, string>;
    persist?: AuthProviderOptions['persist'];
    passwordValidator?: AuthProviderOptions['passwordValidator'];
    router: FC;
    getUserName: AuthProviderOptions['getUserName'];
    getUserRoleTitle: AuthProviderOptions['getUserRoleTitle'];
    getUserRole: AuthProviderOptions['getUserRole'];
    isLoading: boolean;
    error: string;
    get userName(): string;
    get userRoleTitle(): string;
    get userRole(): string;
    sendAuthRequestInstance?: CancellablePromise<any>;
    sendAuthRequest: (email: string, password: string) => void;
    sendAuthRequestCancel: () => void;
    sendAuthPasswRestoreInstance?: CancellablePromise<any>;
    sendAuthPasswRestore: (email: string) => void;
    sendAuthPasswRestoreCancel: () => void;
    sendAuthPasswUpdateInstance?: CancellablePromise<any>;
    sendAuthPasswUpdate: (token: string, password: string) => void;
    sendAuthPasswUpdateCancel: () => void;
    getPersistedCredentials: () => AuthProviderUser;
    persistCredentials: () => void;
    logout: () => void;
    /**
     * Passes token variable to {args}
     * @param req - request function
     * @param args - args object, that'll be extended with token
     */
    withToken: WithTokenFunction;
    get isLogged(): boolean;
    get output(): FC<{}>;
}
