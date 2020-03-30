import { IAuthProviderProps } from '~/application';
import axios from 'axios';

const authGetTokens = (
  email: string,
  password: string
): Promise<{
  data: {
    success: boolean;
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
    .post('http://localhost:8080/admin/v1/auth/signin', { email, password })
    .catch((e) => e);

const authGetProfile = (
  accessToken: string
): Promise<{
  data: {
    success: boolean;
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
    .get('http://localhost:8080/admin/v1/user/profile', {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .catch((e) => e);

export const authRequestFn = async (
  email: string,
  password: string
): Promise<{
  user: IAuthProviderProps['user'];
  tokens: Record<string, string>;
  error: string;
}> => {
  try {
    const auth = await authGetTokens(email, password);

    if (!auth.data || !auth.data.success) {
      console.log({ auth });
      throw new Error(auth.response?.data?.message);
    }

    const profile = await authGetProfile(auth.data.data.accessToken);

    if (!profile.data || !profile.data.success) {
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
