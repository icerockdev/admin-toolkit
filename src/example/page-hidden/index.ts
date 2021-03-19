/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Page } from '~/application';

export default new Page({
  title: 'Hidden page',
  menu: {
    enabled: false,
    url: '/test-hidden',
    label: 'Sample hidden page',
  },
});
