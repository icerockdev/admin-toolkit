/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { AuthProvider } from '~/application';
import {
  ADMIN_USER_EMAIL,
  ADMIN_USER_PASSWORD,
  ADMIN_USER_RESPONSE,
  COMMON_USER_EMAIL,
  COMMON_USER_PASSWORD,
  COMMON_USER_RESPONSE
} from "../__mocks__/authData";
import CustomError from "../__mocks__/CustomError";

export default new AuthProvider({
  authRequestFn: (email, password) =>
    new Promise((resolve) => {
      console.info('Authenticating with: ', {email, password});

      if (email === ADMIN_USER_EMAIL && password === ADMIN_USER_PASSWORD) {
        resolve(ADMIN_USER_RESPONSE)
      } else if (email === COMMON_USER_EMAIL && password === COMMON_USER_PASSWORD) {
        resolve(COMMON_USER_RESPONSE)
      } else {
        throw new CustomError('Error', 'Wrong login or password');
      }
    }),
  authPasswRestoreFn: (email: string) =>
    new Promise((resolve) => {
      console.info('Restoring password with: ', {email});
      resolve({error: ''});
    }),
  authSignupFn: (data: any) =>
    new Promise((resolve) => {
      console.info('Registering user with data ', data);
      resolve({error: ''});
    }),
});
