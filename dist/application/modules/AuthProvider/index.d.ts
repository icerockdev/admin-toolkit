/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IAuthProviderProps } from '../../types/auth';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Config } from '../Config';
export declare class AuthProvider {
    parent?: Config;
    user: IAuthProviderProps['user'];
    authRequestFn?: IAuthProviderProps['authRequestFn'];
    authPasswRestoreFn?: IAuthProviderProps['authPasswRestoreFn'];
    authPasswUpdateFn?: IAuthProviderProps['authPasswUpdateFn'];
    roleTitles?: Record<any, string>;
    persist?: IAuthProviderProps['persist'];
    newPasswordValidator?: IAuthProviderProps['newPasswordValidator'];
    constructor(fields?: Partial<IAuthProviderProps>);
    isLoading: boolean;
    error: string;
    sendAuthRequestInstance?: CancellablePromise<any>;
    sendAuthRequest: ({ email, password, }: {
        email: string;
        password: string;
    }) => void;
    sendAuthRequestCancel: () => void;
    sendAuthPasswRestoreInstance?: CancellablePromise<any>;
    sendAuthPasswRestore: ({ email }: {
        email: string;
    }) => void;
    sendAuthPasswRestoreCancel: () => void;
    sendAuthPasswUpdateInstance?: CancellablePromise<any>;
    sendAuthPasswUpdate: ({ token, password, passwordRepeat, }: {
        token: string;
        password: string;
        passwordRepeat: string;
    }) => void;
    sendAuthPasswUpdateCancel: () => void;
    getPersistedCredentials: () => {
        user?: {
            id?: number | undefined;
            email?: string | undefined;
            username?: string | undefined;
            role?: string | undefined;
            token?: string | undefined;
        } | undefined;
    };
    persistCredentials: () => void;
    logout: () => void;
    withToken: (req: any, args: any) => Promise<any>;
    get isLogged(): boolean;
}
