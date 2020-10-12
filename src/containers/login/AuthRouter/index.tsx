import React, { FC, Fragment } from 'react';
import { observer } from 'mobx-react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
import { ForgotPassword } from '~/containers/login/ForgotPassword';
import { ResetPassword } from '~/containers/login/ResetPassword';
import { SignIn } from '~/containers/login/SignIn';
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
            <Route path="/restore" component={ForgotPassword} />
            <Route path="/reset/:token" component={ResetPassword} />
            <SignIn />
          </Switch>
        </auth.layout>
      </Router>

      <config.notifications.Output />
    </ThemeProvider>
  );
});

export { AuthRouter };
