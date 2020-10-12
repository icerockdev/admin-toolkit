/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './styles';
import { AppBar, Tab, Tabs, Toolbar, withStyles, } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Account } from '../../login/Account';
import classnames from 'classnames';
import { useLocation } from 'react-router';
import { useConfig } from '../../../application/utils/hooks';
var HorizontalNavigationUnstyled = function (_a) {
    var _b, _c;
    var classes = _a.classes;
    var config = useConfig();
    var history = useHistory();
    var location = useLocation();
    var wrapper = useRef(null);
    var appbar = useRef(null);
    var links = useMemo(function () {
        return config.pages
            .filter(function (page) { var _a; return ((_a = page === null || page === void 0 ? void 0 : page.menu) === null || _a === void 0 ? void 0 : _a.url) && page.canList; })
            .map(function (page) { return ({
            name: page.menu.label,
            url: page.menu.url,
        }); });
    }, [config, config.pages, (_c = (_b = config.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role]);
    var onTabChange = useCallback(function (_, tab) { return history.push(links[tab].url); }, [
        history,
    ]);
    var activeTab = useMemo(function () {
        var active = links.findIndex(function (link) {
            var re = new RegExp("" + link.url.replace(/\//gim, '\\/'));
            return location.pathname.match(re);
        });
        return active >= 0 ? active : 0;
    }, [location]);
    useEffect(function () {
        if (!appbar.current || !wrapper.current)
            return;
        var height = appbar.current.getBoundingClientRect().height;
        if (!height)
            return;
        wrapper.current.style.height = height + "px";
    }, [appbar.current, wrapper.current]);
    return (React.createElement("div", { ref: wrapper },
        React.createElement(AppBar, { className: classes.appbar, ref: appbar },
            React.createElement(Toolbar, { className: classes.toolbar },
                config.logo && (React.createElement(Link, { to: "/", className: classnames('logo', classes.title) },
                    React.createElement("img", { src: config.logo, title: config.title, className: classes.logo, alt: config.title }))),
                React.createElement(Tabs, { onChange: onTabChange, value: activeTab, indicatorColor: "primary", textColor: "primary", variant: "scrollable", scrollButtons: "auto", "aria-label": "scrollable auto tabs example", className: classes.tabs }, links.map(function (_a) {
                    var name = _a.name, url = _a.url;
                    return (React.createElement(Tab, { label: name, key: url, className: classes.tab }));
                })),
                React.createElement("div", { className: classes.account }, !!config.auth && React.createElement(Account, null))))));
};
var HorizontalNavigation = withStyles(styles, { withTheme: true })(HorizontalNavigationUnstyled);
export { HorizontalNavigation };
