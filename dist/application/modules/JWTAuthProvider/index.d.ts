/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IAuthProviderProps } from '../../types/auth';
import { AuthProvider } from '../AuthProvider';
declare type IJWTAuthProviderProps = IAuthProviderProps & {
    tokenRefreshFn: (refresh: string) => Promise<{
        access: '';
        refresh: '';
    }>;
};
export declare class JWTAuthProvider extends AuthProvider {
    tokens: Record<string, string>;
    authRequestFn?: (email: string, password: string) => Promise<{
        user: IAuthProviderProps['user'];
        tokens: Record<string, string>;
        error: string;
    }>;
    tokenRefreshFn?: (refresh: string) => Promise<{
        access: string;
        refresh: string;
    }>;
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
export {};
