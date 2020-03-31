/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export declare const AUTH_ERRORS: {
    CANT_LOGIN: string;
};
export declare const EMPTY_USER: IAuthProviderProps['user'];
export interface IAuthProviderProps {
    user: {
        id?: number;
        email?: string;
        username?: string;
        role?: string;
        token?: string;
    };
    api: Record<string, {
        url: string;
        method: string;
    }>;
    roleTitles: Record<any, string>;
    authRequestFn?: (email: string, password: string) => Promise<{
        user: IAuthProviderProps['user'];
        error: string;
    }>;
    authPasswRestoreFn?: (email: string) => Promise<{
        error: string;
    }>;
}
