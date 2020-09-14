/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

// throw this to signalize we're not logged in
export const UNAUTHORIZED = 'UNAUTHORIZED';

export const AUTH_ERRORS = {
  CANT_LOGIN: `Can't login. Unknown error.`,
};

export const EMPTY_USER: IAuthProviderProps['user'] = {
  id: 0,
  email: '',
  username: '',
  role: '',
  token: '',
};

export type IAuthRequestFn = (
  email: string,
  password: string
) => Promise<{ user: IAuthProviderProps['user']; error: string }>;

export type IAuthPasswRestoreFn = (email: string) => Promise<{ error: string }>;
export type IAuthPasswUpdateFn = (
  token: string,
  password: string,
  passwordRepeat?: string
) => Promise<{ error: string }>;
export type IAuthNewPasswordValidator = (
  password: string
) => string | undefined;

export interface IAuthProviderProps {
  user: {
    id?: number;
    email?: string;
    username?: string;
    role?: string;
    token?: string;
  };

  api: Record<string, { url: string; method: string }>;
  roleTitles: Record<any, string>;
  persist: boolean;

  authRequestFn?: IAuthRequestFn;
  authPasswRestoreFn?: IAuthPasswRestoreFn;
  authPasswUpdateFn?: IAuthPasswUpdateFn;
  newPasswordValidator?: IAuthNewPasswordValidator;
}

export type WithTokenFunction = (
  req: Function,
  args: Record<string, any>
) => Promise<any>;
