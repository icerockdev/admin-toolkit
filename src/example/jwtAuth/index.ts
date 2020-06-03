/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { JWTAuthProvider } from '~/application';
import { Unwrap } from '~/application/types/common';
import { IJWTAuthRequestFn } from '~/application/modules/JWTAuthProvider';

export default new JWTAuthProvider({
  authRequestFn: (
    email: string,
    password: string
  ): Unwrap<ReturnType<IJWTAuthRequestFn>> =>
    new Promise((resolve) => {
      console.log('Authenticating with: ', { email, password });
      resolve({
        user: {
          email,
          username: email,
          role: 'user',
        },
        tokens: { access: 'accessToken', refresh: 'refreashToken' },
        error: '',
      });
    }),

  authPasswRestoreFn: (email: string) =>
    new Promise((resolve) => {
      console.log('Restoring password with: ', { email });
      resolve({ error: '' });
    }),

  tokenRefreshFn: (refresh: string) => {
    console.log('Refreshing JWT tokens');
    const seed = Math.random() * 65535;
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            access: `accessToken_${seed}`,
            refresh: `refreshToken_${seed}`,
          }),
        3000
      )
    );
  },
});
