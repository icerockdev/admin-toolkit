/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { useConfig } from '../../../utils/hooks';
import { Link } from 'react-router-dom';
var AuthVerticalLayout = observer(function (_a) {
    var _b;
    var children = _a.children;
    var config = useConfig();
    var splash = ((_b = config.auth) === null || _b === void 0 ? void 0 : _b.splash) || '';
    return (React.createElement("div", { className: styles.layout },
        React.createElement("div", { className: styles.left },
            React.createElement("div", { className: styles.left__wrap },
                React.createElement("div", { className: styles.logo },
                    React.createElement(Link, { to: "/" },
                        React.createElement("img", { src: config.logo, alt: config.title }))),
                React.createElement("div", { className: styles.form },
                    React.createElement("div", { className: styles.content }, children)))),
        React.createElement("div", { className: styles.image, style: { backgroundImage: "url('" + splash + "')" } })));
});
export { AuthVerticalLayout };
