/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { AuthProviderUser, WithTokenFunction } from '../../../types/auth';
import { AuthProvider } from '../AuthProvider';
import { IJWTAuthProviderProps } from './types';
export declare class JWTAuthProvider extends AuthProvider {
    tokens: Record<string, string>;
    authRequestFn?: IJWTAuthProviderProps['authRequestFn'];
    tokenRefreshFn?: IJWTAuthProviderProps['tokenRefreshFn'];
    constructor(fields?: Partial<IJWTAuthProviderProps>);
    sendAuthRequest: (email: string, password: string) => void;
    sendAuthRequestCancel: () => void;
    logout: () => void;
    tokenRefreshInstance?: any;
    withToken: WithTokenFunction;
    getPersistedCredentials: () => {
        user?: AuthProviderUser;
        tokens?: Record<string, string>;
    };
    persistCredentials: () => void;
    persistTokens: () => void;
    get isLogged(): boolean;
    get token(): string;
}
