import { FC } from 'react';
import { AuthProvider } from '..';
export declare const UNAUTHORIZED = "UNAUTHORIZED";
export declare const AUTH_ERRORS: {
    CANT_LOGIN: string;
};
export declare const EMPTY_USER: AuthProviderUser;
export declare type UserRole = any;
export declare type IAuthRequestFn = (email: string, password: string) => Promise<{
    user: AuthProviderUser;
    error: string;
}>;
export declare type IAuthPasswRestoreFn = (email: string) => Promise<{
    error: string;
}>;
export declare type IAuthPasswUpdateFn = (token: string, password: string, passwordRepeat?: string) => Promise<{
    error: string;
}>;
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
    passwordValidator?: IAuthNewPasswordValidator;
}
export interface AuthProviderUser extends Record<string, any> {
    id?: number;
    email?: string;
    username?: string;
    role?: string;
    token?: string;
}
export declare type WithTokenFunction = (req: Function, args: Record<string, any>) => Promise<any>;
