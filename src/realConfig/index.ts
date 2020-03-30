/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Config, JWTAuthProvider } from '~/application';
import logo from '~/assets/logo512.png';
import { authRequestFn } from './auth';
import admins from './pages/admins';

export default new Config({
  logo,
  auth: new JWTAuthProvider({
    authRequestFn,
  }),
  pages: [admins],
});
