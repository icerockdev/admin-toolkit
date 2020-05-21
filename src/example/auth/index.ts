/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { AuthProvider } from '~/application';

export default new AuthProvider({
  authRequestFn: (email, password) =>
    new Promise((resolve) => {
      console.log('Authenticating with: ', { email, password });
      resolve({
        user: {
          email,
          username: email,
          token: 'SAMPLE_TOKEN',
          role: 'user',
        },
        error: '',
      });
    }),
  authPasswRestoreFn: (email: string) =>
    new Promise((resolve) => {
      console.log('Restoring password with: ', { email });
      resolve({ error: '' });
    }),
});
