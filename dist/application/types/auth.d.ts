/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export declare const UNAUTHORIZED = "UNAUTHORIZED";
export declare const AUTH_ERRORS: {
    CANT_LOGIN: string;
};
export declare const EMPTY_USER: IAuthProviderProps['user'];
export declare type IAuthRequestFn = (email: string, password: string) => Promise<{
    user: IAuthProviderProps['user'];
    error: string;
}>;
export declare type IAuthPasswRestoreFn = (email: string) => Promise<{
    error: string;
}>;
export declare type IAuthPasswUpdateFn = (token: string, password: string, passwordRepeat?: string) => Promise<{
    error: string;
}>;
export declare type IAuthNewPasswordValidator = (password: string) => string | undefined;
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
    persist: boolean;
    authRequestFn?: IAuthRequestFn;
    authPasswRestoreFn?: IAuthPasswRestoreFn;
    authPasswUpdateFn?: IAuthPasswUpdateFn;
    newPasswordValidator?: IAuthNewPasswordValidator;
}
