/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { SignIn } from '../../../containers/login/SignIn';
import { Navigation } from '../../../containers/layout/Navigation';
import { PageRenderer } from '../PageRenderer';
import { Container, withStyles } from '@material-ui/core';
import styles from './styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
var Application = withStyles(styles)(observer(function (_a) {
    var classes = _a.classes, config = _a.config;
    var _b, _c, _d, _e;
    var links = useMemo(function () {
        return config.pages
            .filter(function (page) { var _a; return (_a = page === null || page === void 0 ? void 0 : page.menu) === null || _a === void 0 ? void 0 : _a.url; })
            .map(function (page) { return ({
            name: page.menu.label,
            url: page.menu.url,
        }); });
    }, [config.pages]);
    if (!((_b = config.auth) === null || _b === void 0 ? void 0 : _b.isLogged) && ((_c = config.auth) === null || _c === void 0 ? void 0 : _c.sendAuthRequest)) {
        return (React.createElement(SignIn, { onSubmit: config.auth.sendAuthRequest, onForgotScreenClick: console.log }));
    }
    return (React.createElement(MuiPickersUtilsProvider, { utils: DateFnsUtils },
        React.createElement(Router, { history: config.history },
            React.createElement(Navigation, { links: links, logo: { url: config.logo, title: config.title }, account: (_d = config.auth) === null || _d === void 0 ? void 0 : _d.user, onLogout: (_e = config.auth) === null || _e === void 0 ? void 0 : _e.logout }),
            React.createElement(Container, { maxWidth: "xl", className: classes.wrapper },
                React.createElement(Switch, null,
                    config.pages
                        .filter(function (page) { var _a; return (_a = page === null || page === void 0 ? void 0 : page.menu) === null || _a === void 0 ? void 0 : _a.url; })
                        .map(function (page) { return (React.createElement(Route, { path: page.menu.url, render: function () { return React.createElement(PageRenderer, { page: page }); }, key: page.menu.url })); }),
                    links.length > 0 && React.createElement(Redirect, { to: links[0].url }))))));
}));
export { Application };
