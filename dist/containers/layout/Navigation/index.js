/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import styles from './styles';
import { withStyles, AppBar, Toolbar } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { Account } from '../Account';
var NavigationUnstyled = function (_a) {
    var classes = _a.classes, logo = _a.logo, links = _a.links, account = _a.account, onLogout = _a.onLogout;
    return (React.createElement(AppBar, { position: "static", className: classes.appbar },
        React.createElement(Toolbar, { className: classes.toolbar },
            logo && (React.createElement(Link, { to: "/", className: classes.title },
                React.createElement("img", { src: logo.url, title: logo.title, className: classes.logo, alt: logo.title }))),
            links && links.length > 0 && (React.createElement("div", { className: classes.links }, links.map(function (_a) {
                var name = _a.name, url = _a.url;
                return (React.createElement(NavLink, { key: name, className: classes.link, to: url }, name));
            }))),
            account && (React.createElement(Account, { email: account.email, role: account.role, onLogout: onLogout })))));
};
var Navigation = withStyles(styles, { withTheme: true })(NavigationUnstyled);
export { Navigation };
