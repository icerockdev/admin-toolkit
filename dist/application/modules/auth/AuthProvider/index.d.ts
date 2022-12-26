import { AuthProviderOptions, AuthProviderUser, WithTokenFunction } from '../../../types/auth';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Config } from '../../..';
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
    authSignupFn?: AuthProviderOptions['authSignupFn'];
    authLogoutFn?: AuthProviderOptions['authLogoutFn'];
    roleTitles?: Record<any, string>;
    persist?: AuthProviderOptions['persist'];
    passwordValidator?: AuthProviderOptions['passwordValidator'];
    loginLabel: AuthProviderOptions['loginLabel'];
    getUserName: AuthProviderOptions['getUserName'];
    router: FC;
    signIn: FC;
    signUp: FC;
    forgotPassword: FC;
    resetPassword: FC;
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
    sendAuthSignup: (data: any) => void;
    getPersistedCredentials: () => AuthProviderUser;
    persistCredentials: () => void;
    logoutInstance?: CancellablePromise<any>;
    logout: () => void;
    logoutCancel: () => void;
    /**
     * Passes token variable to {args}
     * @param req - request function
     * @param args - args object, that'll be extended with token
     */
    withToken: WithTokenFunction;
    get isLogged(): boolean;
    get output(): FC<{}>;
    get token(): string | undefined;
}
