/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

// throw this to signalize we're not logged in
import { FC } from 'react';
import { AuthProvider } from '~/application';

export const UNAUTHORIZED = 'UNAUTHORIZED';

export const AUTH_ERRORS = {
  CANT_LOGIN: `Can't login. Unknown error.`,
};

export const EMPTY_USER: AuthProviderUser = {
  id: 0,
  email: '',
  username: '',
  role: '',
  token: '',
};

export type UserRole = any;

export type IAuthRequestFn = (
  email: string,
  password: string
) => Promise<{ user: AuthProviderUser; error?: string }>;

export type IAuthPasswRestoreFn = (
  email: string
) => Promise<{ error?: string }>;

export type IAuthPasswUpdateFn = (
  token: string,
  password: string,
  passwordRepeat?: string
) => Promise<{ error?: string }>;

export type IAuthSignupFn = (data: Record<any, any>) => Promise<any>;

export type IAuthNewPasswordValidator = (
  password: string
) => string | undefined;

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

export type WithTokenFunction = (
  req: Function,
  args: Record<string, any>
) => Promise<any>;
