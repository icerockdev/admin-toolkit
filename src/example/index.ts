/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Config } from '~/application';
import logo from '~/assets/logo512.png';
import entity from './example/entity';
import page from './example/page';
import jwtAuth from './example/jwtAuth';
import custom from './example/custom';
import feature from './example/feature';
import { VerticalLayout } from '~/application/layouts/VerticalLayout';

export default new Config({
  logo,
  auth: jwtAuth,
  layout: VerticalLayout,
  pages: [page, entity, custom, feature],
});
