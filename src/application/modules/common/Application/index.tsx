/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { Config, PageRenderer } from '~/application';
import { observer, Provider } from 'mobx-react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import {
  CssBaseline,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
import '../../../styles/main.scss';

type IProps = WithStyles<typeof styles> & {
  config: Config;
};

const Application = withStyles(styles)(
  observer(({ config }: IProps) => {
    if (config.auth && !config.auth?.isLogged && config.auth?.sendAuthRequest) {
      return (
        <Provider config={config}>
          <config.auth.output />
        </Provider>
      );
    }

    return (
      <Provider config={config}>
        <ThemeProvider theme={config.themeInstance}>
          <LocalizationProvider dateAdapter={DateFnsAdapter} locale={ruLocale}>
            <CssBaseline />

            <Router history={config.history}>
              <config.layout>
                <Switch>
                  {config.pagesForCurrentUser
                    .filter((page) => page?.menu?.url)
                    .map((page) => (
                      <Route
                        path={page.menu.url}
                        render={() => <PageRenderer page={page} />}
                        key={page.menu.url}
                      />
                    ))}

                  <Redirect to={config.fallbackUrl} />
                </Switch>
              </config.layout>
            </Router>

            <config.notifications.Output />
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );
  })
);

export { Application };
