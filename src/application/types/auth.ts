/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export const EMPTY_USER: IAuthProviderProps['user'] = {
  email: '',
  username: '',
  role: '',
  token: '',
};

export interface IAuthProviderProps {
  user: {
    email: string;
    username: string;
    role: string;
    token: string;
  };

  api: Record<string, { url: string; method: string }>;

  authRequestFn?: (
    email: string,
    password: string
  ) => Promise<{ user: IAuthProviderProps['user']; error: string }>;
}
