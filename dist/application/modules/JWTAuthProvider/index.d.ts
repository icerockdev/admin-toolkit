/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IAuthProviderProps } from '../../types/auth';
import { AuthProvider } from '../AuthProvider';
export declare type IJWTTokenRefreshFn = (refresh: string) => Promise<{
    access: string;
    refresh: string;
}>;
export declare type IJWTAuthRequestFn = (email: string, password: string) => Promise<{
    user: IAuthProviderProps['user'];
    tokens: {
        access: string;
        refresh: string;
    };
    error: string;
}>;
export declare type IJWTAuthProviderProps = IAuthProviderProps & {
    authRequestFn: IJWTAuthRequestFn;
    tokenRefreshFn: IJWTTokenRefreshFn;
};
export declare class JWTAuthProvider extends AuthProvider {
    tokens: Record<string, string>;
    authRequestFn?: IJWTAuthProviderProps['authRequestFn'];
    tokenRefreshFn?: IJWTAuthProviderProps['tokenRefreshFn'];
    constructor(fields?: Partial<IJWTAuthProviderProps>);
    sendAuthRequest: ({ email, password, }: {
        email: string;
        password: string;
    }) => void;
    sendAuthRequestCancel: () => void;
    logout: () => void;
    withToken: (req: any, args: any) => Promise<any>;
    getPersistedCredentials: () => {
        user?: {
            id?: number | undefined;
            email?: string | undefined;
            username?: string | undefined;
            role?: string | undefined;
            token?: string | undefined;
        } | undefined;
        tokens?: Record<string, string> | undefined;
    };
    persistCredentials: () => void;
    persistTokens: () => void;
    get isLogged(): boolean;
}
