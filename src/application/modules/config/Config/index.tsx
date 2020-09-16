/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IConfigProps } from '~/application/types/config';
import { createBrowserHistory } from 'history';
import { Notifications } from '../../common/Notification';
import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';
import { observable } from 'mobx';
import { DEFAULT_THEME } from '~/utils/theme';

export class Config {
  constructor(fields?: Partial<IConfigProps>) {
    if (fields) {
      Object.assign(this, fields);
    }

    if (this.pages.length) {
      this.pages.forEach((page) => {
        page.parent = this;
      });
    }

    if (this.auth) {
      this.auth.parent = this;
    }

    if (fields?.theme)
      this.themeInstance = createMuiTheme({
        ...DEFAULT_THEME,
        ...fields.theme,
      });
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
}
