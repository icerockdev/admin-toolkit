/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { AuthProviderOptions, AuthProviderUser } from '../../..';
export declare type AuthProviderJWTTokens = {
    access: string;
    refresh: string;
};
export declare type IJWTTokenRefreshFn = (refresh: string) => Promise<AuthProviderJWTTokens>;
export declare type IJWTAuthRequestFn = (email: string, password: string) => Promise<{
    user: AuthProviderUser;
    tokens: AuthProviderJWTTokens;
    error: string;
}>;
export declare type IJWTAuthProviderProps = AuthProviderOptions & {
    authRequestFn: IJWTAuthRequestFn;
    tokenRefreshFn: IJWTTokenRefreshFn;
};
