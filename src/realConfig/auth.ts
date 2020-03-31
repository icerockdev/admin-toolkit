/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IAuthProviderProps } from '~/application';
import axios from 'axios';

const authRestorePassword = (
  host: string,
  email: string
): Promise<{
  data: {
    success: boolean;
    isSuccess: boolean;
  };
  response: {
    data: {
      message: string;
    };
  };
}> =>
  axios
    .post(`${host}/admin/v1/auth/restore-password`, { email })
    .catch((e) => e);

const authGetTokens = (
  host: string,
  email: string,
  password: string
): Promise<{
  data: {
    success: boolean;
    isSuccess: boolean;
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
  response: {
    data: {
      message: string;
    };
  };
}> =>
  axios
    .post(`${host}/admin/v1/auth/signin`, { email, password })
    .catch((e) => e);

const authGetProfile = (
  host: string,
  accessToken: string
): Promise<{
  data: {
    success: boolean;
    isSuccess: boolean;
    data: {
      id: number;
      email: string;
      name: string;
      role: number;
    };
  };
  response: {
    data: {
      message: string;
    };
  };
}> =>
  axios
    .get(`${host}/admin/v1/user/profile`, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .catch((e) => e);

export const authRequestFn = (host: string) => async (
  email: string,
  password: string
): Promise<{
  user: IAuthProviderProps['user'];
  tokens: Record<string, string>;
  error: string;
}> => {
  try {
    const auth = await authGetTokens(host, email, password);

    if (!auth.data || !(auth.data.success || auth.data.isSuccess)) {
      throw new Error(auth.response?.data?.message);
    }

    const profile = await authGetProfile(host, auth.data.data.accessToken);

    if (!profile.data || !profile.data?.data.id) {
      throw new Error(profile.response?.data?.message);
    }

    return {
      user: {
        id: profile.data.data.id,
        email: profile.data.data.email,
        username: profile.data.data.name,
        role: String(profile.data.data.role),
      },
      tokens: {
        access: auth.data.data.accessToken,
        refresh: auth.data.data.refreshToken,
      },
      error: '',
    };
  } catch (error) {
    return {
      user: {},
      tokens: {},
      error: error.message,
    };
  }
};

export const authPasswRestoreFn = (host: string) => async (
  email: string
): Promise<{
  error: string;
}> => {
  try {
    const restore = await authRestorePassword(host, email);

    if (!restore.data || !(restore.data.success || restore.data.isSuccess)) {
      throw new Error(restore.response?.data?.message);
    }

    return {
      error: '',
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
