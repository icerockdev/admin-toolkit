/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

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

export interface IAuthProviderProps {
  user: {
    id?: number;
    email?: string;
    username?: string;
    role?: string;
    token?: string;
  };

  api: Record<string, { url: string; method: string }>;

  authRequestFn?: (
    email: string,
    password: string
  ) => Promise<{ user: IAuthProviderProps['user']; error: string }>;
}
