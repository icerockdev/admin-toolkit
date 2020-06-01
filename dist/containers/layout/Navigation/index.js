/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styles from './styles';
import { withStyles, AppBar, Toolbar, Tabs, Tab, } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Account } from '../Account';
var LinkTab = function (props) { return (React.createElement(Tab, __assign({ component: "a", onClick: function (event) {
        event.preventDefault();
    } }, props))); };
var NavigationUnstyled = function (_a) {
    var classes = _a.classes, logo = _a.logo, links = _a.links, account = _a.account, onLogout = _a.onLogout;
    var history = useHistory();
    var _b = useState(window.location.pathname.toString()), location = _b[0], setLocation = _b[1];
    useEffect(function () {
        history.listen(function () { return setLocation(history.location.pathname); });
    }, [history]);
    var onTabChange = useCallback(function (_, tab) { return history.push(links[tab].url); }, [
        history,
    ]);
    var activeTab = useMemo(function () { return links.findIndex(function (link) { return link.url === location; }) || 0; }, [location]);
    return (React.createElement(AppBar, { position: "static", className: classes.appbar },
        React.createElement(Toolbar, { className: classes.toolbar },
            logo && (React.createElement(Link, { to: "/", className: classes.title },
                React.createElement("img", { src: logo.url, title: logo.title, className: classes.logo, alt: logo.title }))),
            React.createElement(Tabs, { onChange: onTabChange, value: activeTab, indicatorColor: "primary", textColor: "primary", variant: "scrollable", scrollButtons: "auto", "aria-label": "scrollable auto tabs example", className: classes.tabs }, links.map(function (_a) {
                var name = _a.name, url = _a.url;
                return (React.createElement(Tab, { label: name, key: url, className: classes.tab }));
            })),
            account && (React.createElement(Account, { email: account.email, username: account.username, role: account.role, onLogout: onLogout })))));
};
var Navigation = withStyles(styles, { withTheme: true })(NavigationUnstyled);
export { Navigation };
