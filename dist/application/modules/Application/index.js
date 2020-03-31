/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { SignIn } from '../../../containers/login/SignIn';
import { Navigation } from '../../../containers/layout/Navigation';
import { PageRenderer } from '../PageRenderer';
import { Container, withStyles, CssBaseline, ThemeProvider, } from '@material-ui/core';
import styles from './styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
var Application = withStyles(styles)(observer(function (_a) {
    var classes = _a.classes, config = _a.config;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var links = useMemo(function () {
        return config.pages
            .filter(function (page) { var _a; return ((_a = page === null || page === void 0 ? void 0 : page.menu) === null || _a === void 0 ? void 0 : _a.url) && page.canList; })
            .map(function (page) { return ({
            name: page.menu.label,
            url: page.menu.url,
        }); });
    }, [config.pages, (_c = (_b = config.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role]);
    var role = useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (((_a = config.auth) === null || _a === void 0 ? void 0 : _a.roleTitles) && ((_c = (_b = config.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role) && ((_d = config.auth) === null || _d === void 0 ? void 0 : _d.roleTitles[(_f = (_e = config.auth) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.role])) || ((_h = (_g = config.auth) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.role);
    }, [(_d = config.auth) === null || _d === void 0 ? void 0 : _d.roleTitles, (_f = (_e = config.auth) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.role]);
    if (!((_g = config.auth) === null || _g === void 0 ? void 0 : _g.isLogged) && ((_h = config.auth) === null || _h === void 0 ? void 0 : _h.sendAuthRequest)) {
        return (React.createElement(ThemeProvider, { theme: config.theme },
            React.createElement(CssBaseline, null),
            React.createElement(SignIn, { onSubmit: config.auth.sendAuthRequest, onForgotScreenClick: console.log }),
            React.createElement(config.notifications.Output, null)));
    }
    return (React.createElement(ThemeProvider, { theme: config.theme },
        React.createElement(MuiPickersUtilsProvider, { utils: DateFnsUtils },
            React.createElement(CssBaseline, null),
            React.createElement(Router, { history: config.history },
                React.createElement(Navigation, { links: links, logo: { url: config.logo, title: config.title }, account: {
                        email: ((_k = (_j = config.auth) === null || _j === void 0 ? void 0 : _j.user) === null || _k === void 0 ? void 0 : _k.email) || '',
                        role: role,
                    }, onLogout: (_l = config.auth) === null || _l === void 0 ? void 0 : _l.logout }),
                React.createElement(Container, { maxWidth: "xl", className: classes.wrapper },
                    React.createElement(Switch, null,
                        config.pages
                            .filter(function (page) { var _a; return (_a = page === null || page === void 0 ? void 0 : page.menu) === null || _a === void 0 ? void 0 : _a.url; })
                            .map(function (page) { return (React.createElement(Route, { path: page.menu.url, render: function () { return React.createElement(PageRenderer, { page: page }); }, key: page.menu.url })); }),
                        links.length > 0 && React.createElement(Redirect, { to: links[0].url })))),
            React.createElement(config.notifications.Output, null))));
}));
export { Application };
