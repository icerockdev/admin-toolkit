/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useConfig } from '../../../utils/hooks';
import { Link } from 'react-router-dom';
import { VerticalNavigation } from '../../../../containers/layout/VerticalNavigation';
import { Account } from '../../../../containers/auth/Account';
var VerticalLayout = observer(function (_a) {
    var children = _a.children;
    var config = useConfig();
    return (React.createElement("div", { className: classNames(styles.layout, 'vertical-layout') },
        React.createElement("div", { className: classNames(styles.menu, 'vertical-layout__menu') },
            React.createElement("div", { className: classNames(styles.logo, 'vertical-layout__logo') },
                React.createElement(Link, { to: config.fallbackUrl },
                    React.createElement("img", { src: config.logo, alt: "logo" }))),
            React.createElement("div", { className: classNames(styles.navigation, 'vertical-layout__navigation') },
                React.createElement(VerticalNavigation, null)),
            !!config.auth && (React.createElement("div", { className: classNames(styles.account, 'vertical-layout__account') }, !!config.auth && React.createElement(Account, null)))),
        React.createElement("div", { className: classNames(styles.content, 'vertical-layout__content') }, children)));
});
export { VerticalLayout };
