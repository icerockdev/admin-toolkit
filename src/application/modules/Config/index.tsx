/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { IConfigProps } from '~/application/types/config';
import { Theme } from '@material-ui/core';
import { computed } from 'mobx';
import { createBrowserHistory } from 'history';

export class Config {
  name: IConfigProps['name'] = '';
  pages: IConfigProps['pages'] = [];
  auth?: IConfigProps['auth'];
  logo?: IConfigProps['logo'];
  title?: IConfigProps['title'];
  theme?: Theme;
  history = createBrowserHistory();

  constructor(fields?: Partial<IConfigProps>) {
    if (fields) {
      Object.assign(this, fields);
    }

    if (this.pages.length) {
      this.pages.forEach(page => {
        page.parent = this;
      });
    }
  }

  @computed
  get Layout() {
    return <div>LAYOUT</div>
  }
}
