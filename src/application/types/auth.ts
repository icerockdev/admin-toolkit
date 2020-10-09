/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

// throw this to signalize we're not logged in
import { FC } from 'react';

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

export type IAuthRequestFn = (
  email: string,
  password: string
) => Promise<{ user: AuthProviderUser; error: string }>;

export type IAuthPasswRestoreFn = (email: string) => Promise<{ error: string }>;

export type IAuthPasswUpdateFn = (
  token: string,
  password: string,
  passwordRepeat?: string
) => Promise<{ error: string }>;

export type IAuthNewPasswordValidator = (
  password: string
) => string | undefined;

export interface AuthProviderOptions {
  roleTitles?: Record<any, string>;
  persist?: boolean;
  layout?: FC;
  splash?: string;
  authRequestFn?: IAuthRequestFn;
  authPasswRestoreFn?: IAuthPasswRestoreFn;
  authPasswUpdateFn?: IAuthPasswUpdateFn;
  passwordValidator?: IAuthNewPasswordValidator;
}

export interface AuthProviderUser {
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
