/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { useConfig } from '../../../../application';
import { Link } from 'react-router-dom';
import { FormHelperText } from "@material-ui/core";
import { ADMIN_USER_EMAIL, ADMIN_USER_PASSWORD, COMMON_USER_EMAIL, COMMON_USER_PASSWORD } from "../../../auth/__mocks__/authData";
var AuthCustomLayout = observer(function (_a) {
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
                    React.createElement("div", { className: styles.content }, children)),
                React.createElement("div", null,
                    React.createElement("h4", null, "Demo login details"),
                    React.createElement(FormHelperText, null,
                        "Admin user: ",
                        ADMIN_USER_EMAIL,
                        " / ",
                        ADMIN_USER_PASSWORD),
                    React.createElement(FormHelperText, null,
                        "Common user: ",
                        COMMON_USER_EMAIL,
                        " / ",
                        COMMON_USER_PASSWORD)))),
        React.createElement("div", { className: styles.image, style: { backgroundImage: "url('" + splash + "')" } })));
});
export { AuthCustomLayout };
