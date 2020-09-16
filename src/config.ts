/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Config } from './application';
import logo from '~/assets/logo512.png';
import entity from './example/entity';
import page from './example/page';
import jwtAuth from './example/jwtAuth';
import custom from './example/custom';
import base from './example/base';
import { DEFAULT_THEME } from '~/styles';

export default new Config({
  logo,
  auth: jwtAuth,
  pages: [page, entity, custom, base],
  theme: {
    ...DEFAULT_THEME,
    shape: { borderRadius: 4 },
  },
});
