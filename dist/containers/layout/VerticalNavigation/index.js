/* Copyright (c) 2020-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { List, Collapse, ListItem } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
var VerticalNavigation = observer(function () {
    var _a = useState(false), openList = _a[0], setOpenList = _a[1];
    var config = useConfig();
    var t = useTranslation().t;
    var navigation = config.linksForCurrentUser.filter(function (item) { return item.enabled; });
    var handleClick = function () {
        setOpenList(!openList);
    };
    return (React.createElement("div", { className: classNames(styles.navigation, 'vertical-navigation') }, navigation.map(function (link) {
        if (link.childFields) {
            return (React.createElement(List, { component: "nav", disablePadding: true, subheader: React.createElement(ListItem, { onClick: handleClick, className: styles.list },
                    React.createElement("h2", { className: styles.text }, link.name),
                    openList ? React.createElement(ExpandLess, null) : React.createElement(ExpandMore, null)) },
                React.createElement(Collapse, { in: openList }, link.childFields.map(function (child) {
                    return (React.createElement(ListItem, { className: styles.list },
                        React.createElement(NavLink, { to: child.url, className: classNames(styles.link, 'vertical-navigation__link'), key: child.url }, t(child.label))));
                }))));
        }
        return (React.createElement(NavLink, { to: link.url, className: classNames(styles.link, 'vertical-navigation__link'), key: link.url }, t(link.name)));
    })));
});
export { VerticalNavigation };
