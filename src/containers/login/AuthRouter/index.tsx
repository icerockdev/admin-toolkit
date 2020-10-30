import React, { FC, Fragment } from 'react';
import { observer } from 'mobx-react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
import { useConfig } from '~/application/utils/hooks';

const AuthRouter: FC = observer(() => {
  const config = useConfig();
  const auth = config.auth;

  if (!auth) return <Fragment />;

  return (
    <ThemeProvider theme={config.themeInstance}>
      <CssBaseline />

      <Router history={config.history}>
        <auth.layout>
          <Switch>
            <Route path="/signup" component={auth.signUp} />
            <Route path="/restore" component={auth.forgotPassword} />
            <Route path="/reset/:token" component={auth.resetPassword} />
            <auth.signIn />
          </Switch>
        </auth.layout>
      </Router>

      <config.notifications.Output />
    </ThemeProvider>
  );
});

export { AuthRouter };
