/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { AuthProviderOptions, AuthProviderUser } from '~/application';

export type AuthProviderJWTTokens = {
  access: string;
  refresh: string;
};
export type IJWTTokenRefreshFn = (
  refresh: string
) => Promise<AuthProviderJWTTokens>;

export type IJWTAuthRequestFn = (
  email: string,
  password: string
) => Promise<{
  user: AuthProviderUser;
  tokens: AuthProviderJWTTokens;
  error: string;
}>;

export type IJWTAuthProviderProps = AuthProviderOptions & {
  authRequestFn: IJWTAuthRequestFn;
  tokenRefreshFn: IJWTTokenRefreshFn;
};
