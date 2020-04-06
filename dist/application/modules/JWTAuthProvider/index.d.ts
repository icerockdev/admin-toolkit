/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IAuthProviderProps } from '../../types/auth';
import { AuthProvider } from '../AuthProvider';
export declare class JWTAuthProvider extends AuthProvider {
    tokens: Record<string, string>;
    authRequestFn?: (email: string, password: string) => Promise<{
        user: IAuthProviderProps['user'];
        tokens: Record<string, string>;
        error: string;
    }>;
    constructor(fields?: Partial<IAuthProviderProps>);
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
