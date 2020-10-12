/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { PageRenderer } from '../../..';
import { observer, Provider } from 'mobx-react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider, withStyles, } from '@material-ui/core';
import styles from './styles';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
import '../../../styles/main.scss';
var Application = withStyles(styles)(observer(function (_a) {
    var _b, _c;
    var config = _a.config;
    if (config.auth && !((_b = config.auth) === null || _b === void 0 ? void 0 : _b.isLogged) && ((_c = config.auth) === null || _c === void 0 ? void 0 : _c.sendAuthRequest)) {
        return (React.createElement(Provider, { config: config },
            React.createElement(config.auth.output, null)));
    }
    return (React.createElement(Provider, { config: config },
        React.createElement(ThemeProvider, { theme: config.themeInstance },
            React.createElement(LocalizationProvider, { dateAdapter: DateFnsAdapter, locale: ruLocale },
                React.createElement(CssBaseline, null),
                React.createElement(Router, { history: config.history },
                    React.createElement(config.layout, null,
                        React.createElement(Switch, null,
                            config.pagesForCurrentUser
                                .filter(function (page) { var _a; return (_a = page === null || page === void 0 ? void 0 : page.menu) === null || _a === void 0 ? void 0 : _a.url; })
                                .map(function (page) { return (React.createElement(Route, { path: page.menu.url, render: function () { return React.createElement(PageRenderer, { page: page }); }, key: page.menu.url })); }),
                            React.createElement(Redirect, { to: config.fallbackUrl })))),
                React.createElement(config.notifications.Output, null)))));
}));
export { Application };
