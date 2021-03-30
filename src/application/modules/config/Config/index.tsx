/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IConfigProps } from '~/application/types/config';
import { createBrowserHistory } from 'history';
import { Notifications } from '../../common/Notification';
import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';
import { computed, observable } from 'mobx';
import { DEFAULT_THEME } from '~/utils/theme';
import { FC } from 'react';
import { VerticalLayout } from '~/application/layouts/application/VerticalLayout';

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

    this.host = options?.host;
  }

  @observable host?: string;
  @observable name: IConfigProps['name'] = '';
  @observable pages: IConfigProps['pages'] = [];
  @observable auth?: IConfigProps['auth'];
  @observable logo?: IConfigProps['logo'];
  @observable title?: IConfigProps['title'];
  @observable theme: ThemeOptions = {};
  @observable history = createBrowserHistory();
  @observable notifications = new Notifications();
  @observable themeInstance = createMuiTheme(DEFAULT_THEME);
  @observable layout: FC = VerticalLayout;

  @computed
  get pagesForCurrentUser() {
    return this.pages.filter((page) => page?.menu?.url && page.canList);
  }

  @computed
  get linksForCurrentUser() {
    return this.pagesForCurrentUser.map((page) => ({
      name: page.menu.label,
      url: page.menu.url,
      enabled: page.menu.enabled,
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
