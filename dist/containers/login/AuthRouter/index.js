import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
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
                    React.createElement(Route, { path: "/signup", component: auth.signUp }),
                    React.createElement(Route, { path: "/restore", component: auth.forgotPassword }),
                    React.createElement(Route, { path: "/reset/:token", component: auth.resetPassword }),
                    React.createElement(auth.signIn, null)))),
        React.createElement(config.notifications.Output, null)));
});
export { AuthRouter };
