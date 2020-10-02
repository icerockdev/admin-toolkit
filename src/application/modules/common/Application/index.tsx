/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useMemo } from 'react';
import { Config } from '../../config/Config';
import { observer, Provider } from 'mobx-react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { SignIn } from '~/containers/login/SignIn';
import { PageRenderer } from '../PageRenderer';
import {
  CssBaseline,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import { ForgotPassword } from '~/containers/login/ForgotPassword';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider } from '@material-ui/pickers';
import { ResetPassword } from '~/containers/login/ResetPassword';
import ruLocale from 'date-fns/locale/ru';

type IProps = WithStyles<typeof styles> & {
  config: Config;
};

const Application = withStyles(styles)(
  observer(({ config }: IProps) => {
    const onForgotPassword = useMemo(
      () =>
        config.auth?.authPasswRestoreFn
          ? () => {
              config.history.push('/restore');
            }
          : undefined,
      [config.history, config.auth, config.auth?.authPasswRestoreFn]
    );

    if (!config.auth?.isLogged && config.auth?.sendAuthRequest) {
      return (
        <Provider config={config}>
          <ThemeProvider theme={config.themeInstance}>
            <CssBaseline />

            <Router history={config.history}>
              <Switch>
                <Route
                  path="/restore"
                  render={() => (
                    <ForgotPassword
                      onSubmit={config.auth?.sendAuthPasswRestore}
                    />
                  )}
                />

                <Route
                  path="/reset-password/:token"
                  render={(params) => (
                    <ResetPassword
                      onSubmit={config.auth?.sendAuthPasswUpdate}
                      token={params.match.params.token}
                    />
                  )}
                />

                <SignIn
                  onSubmit={config.auth.sendAuthRequest}
                  onForgotScreenClick={onForgotPassword}
                />
              </Switch>
            </Router>

            <config.notifications.Output />
          </ThemeProvider>
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
                  {config.pages
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
