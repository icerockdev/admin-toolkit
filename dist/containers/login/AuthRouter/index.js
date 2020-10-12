import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
import { ForgotPassword } from '../ForgotPassword';
import { ResetPassword } from '../ResetPassword';
import { SignIn } from '../SignIn';
import { useConfig } from '../../../application/utils/hooks';
var AuthRouter = observer(function () {
    var config = useConfig();
    var auth = config.auth;
    if (!auth)
        return React.createElement(Fragment, null);
    return (React.createElement(ThemeProvider, { theme: config.themeInstance },
        React.createElement(CssBaseline, null),
        React.createElement(Router, { history: config.history },
            React.createElement(auth.layout, null,
                React.createElement(Switch, null,
                    React.createElement(Route, { path: "/restore", component: ForgotPassword }),
                    React.createElement(Route, { path: "/reset/:token", component: ResetPassword }),
                    React.createElement(SignIn, null)))),
        React.createElement(config.notifications.Output, null)));
});
export { AuthRouter };
