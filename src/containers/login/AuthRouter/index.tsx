import React, { FC, Fragment, useMemo } from 'react';
import { observer } from 'mobx-react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
import { ForgotPassword } from '~/containers/login/ForgotPassword';
import { ResetPassword } from '~/containers/login/ResetPassword';
import { SignIn } from '~/containers/login/SignIn';
import { useConfig } from '~/utils/hooks';

const AuthRouter: FC = observer(() => {
  const config = useConfig();
  const auth = config.auth;

  if (!auth) return <Fragment />;

  return (
    <ThemeProvider theme={config.themeInstance}>
      <CssBaseline />

      <Router history={config.history}>
        <Switch>
          <Route
            path="/restore"
            render={() => (
              <ForgotPassword onSubmit={auth.sendAuthPasswRestore} />
            )}
          />

          <Route
            path="/reset-password/:token"
            render={(params) => (
              <ResetPassword
                onSubmit={auth.sendAuthPasswUpdate}
                token={params.match.params.token}
              />
            )}
          />

          <SignIn />
        </Switch>
      </Router>

      <config.notifications.Output />
    </ThemeProvider>
  );
});

export { AuthRouter };
