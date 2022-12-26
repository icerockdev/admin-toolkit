/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from '../../../../../admin-toolkit/_node_modules/@types/react';
import { AuthProvider } from '..';
export declare const UNAUTHORIZED = "UNAUTHORIZED";
export declare const AUTH_ERRORS: {
    CANT_LOGIN: string;
};
export declare const EMPTY_USER: AuthProviderUser;
export declare type UserRole = any;
export declare type IAuthRequestFn = (email: string, password: string) => Promise<{
    user: AuthProviderUser;
    error?: string;
}>;
export declare type IAuthPasswRestoreFn = (email: string) => Promise<{
    error?: string;
}>;
export declare type IAuthPasswUpdateFn = (token: string, password: string, passwordRepeat?: string) => Promise<{
    error?: string;
}>;
export declare type IAuthSignupFn = (data: Record<any, any>) => Promise<any>;
export declare type IAuthLogoutFn = (token: String) => Promise<any>;
export declare type IAuthNewPasswordValidator = (password: string) => string | undefined;
export interface AuthProviderOptions {
    getUserName: (auth: AuthProvider) => string;
    getUserRoleTitle: (auth: AuthProvider) => string;
    getUserRole: (auth: AuthProvider) => UserRole;
    roleTitles?: Record<any, string>;
    persist?: boolean;
    layout?: FC;
    splash?: string;
    authRequestFn?: IAuthRequestFn;
    authPasswRestoreFn?: IAuthPasswRestoreFn;
    authPasswUpdateFn?: IAuthPasswUpdateFn;
    authSignupFn?: IAuthSignupFn;
    authLogoutFn?: IAuthLogoutFn;
    passwordValidator?: IAuthNewPasswordValidator;
    loginLabel?: string;
    router?: FC;
    signIn?: FC;
    signUp?: FC;
    forgotPassword?: FC;
    resetPassword?: FC;
}
export interface AuthProviderUser extends Record<string, any> {
    id?: number;
    email?: string;
    username?: string;
    role?: string;
    token?: string;
}
export declare type WithTokenFunction = (req: Function, args: Record<string, any>) => Promise<any>;
