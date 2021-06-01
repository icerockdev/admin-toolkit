/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { observer } from 'mobx-react';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
var VerticalNavigation = observer(function () {
    var config = useConfig();
    var t = useTranslation().t;
    var navigation = config.linksForCurrentUser.filter(function (item) { return item.enabled; });
    return (React.createElement("div", { className: classNames(styles.navigation, 'vertical-navigation') }, navigation.map(function (link) { return (React.createElement(NavLink, { to: link.url, className: classNames(styles.link, 'vertical-navigation__link'), key: link.url }, t(link.name))); })));
});
export { VerticalNavigation };
