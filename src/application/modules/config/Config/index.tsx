/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IConfigProps } from '~/application/types/config';
import { createBrowserHistory } from 'history';
import { Notifications } from '../../common/Notification';
import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';
import { computed, observable } from 'mobx';
import { DEFAULT_THEME } from '~/utils/theme';
import { HorizontalLayout } from '~/application/layouts/HorizontalLayout';
import { FC } from 'react';

export class Config {
  constructor(options?: Partial<IConfigProps>) {
    if (options) {
      Object.assign(this, options);
    }

    if (this.pages.length) {
      this.pages.forEach((page) => {
        page.parent = this;
      });
    }

    if (this.auth) {
      this.auth.parent = this;
    }

    if (options?.theme)
      this.themeInstance = createMuiTheme({
        ...DEFAULT_THEME,
        ...options.theme,
      });

    if (options?.layout) {
      this.layout = options.layout;
    }
  }

  @observable name: IConfigProps['name'] = '';
  @observable pages: IConfigProps['pages'] = [];
  @observable auth?: IConfigProps['auth'];
  @observable logo?: IConfigProps['logo'];
  @observable title?: IConfigProps['title'];
  @observable theme: ThemeOptions = {};
  @observable history = createBrowserHistory();
  @observable notifications = new Notifications();
  @observable themeInstance = createMuiTheme(DEFAULT_THEME);
  @observable layout: FC = HorizontalLayout;

  @computed
  get linksForCurrentUser() {
    return this.pages
      .filter((page) => page?.menu?.url && page.canList)
      .map((page) => ({
        name: page.menu.label,
        url: page.menu.url,
      }));
  }

  @computed
  get fallbackUrl() {
    return (
      (this.linksForCurrentUser?.length > 0 &&
        this.linksForCurrentUser[0].url) ||
      '/'
    );
  }
}
