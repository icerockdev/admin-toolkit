/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useRouteMatch } from 'react-router';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
var ResetPassword = function () {
    var _a = useState(''), password = _a[0], setPassword = _a[1];
    var _b = useState(''), passwordRepeat = _b[0], setPasswordRepeat = _b[1];
    var matches = useRouteMatch();
    var config = useConfig();
    var t = useTranslation().t;
    var onPasswordChange = useCallback(function (event) {
        setPassword(event.target.value);
    }, [setPassword]);
    var onPasswordRepeatChange = useCallback(function (event) {
        setPasswordRepeat(event.target.value);
    }, [setPasswordRepeat]);
    var onSubmitCapture = useCallback(function (event) {
        var _a;
        event.preventDefault();
        var token = matches.params.token;
        if (!((_a = config === null || config === void 0 ? void 0 : config.auth) === null || _a === void 0 ? void 0 : _a.sendAuthPasswUpdate))
            return;
        if (password !== passwordRepeat) {
            config.notifications.showError("Passwords doesn't match");
            return;
        }
        config.auth.sendAuthPasswUpdate(token, password);
    }, [matches.params.token, config, password, passwordRepeat]);
    return (React.createElement("div", { className: styles.wrap },
        React.createElement(Helmet, null,
            React.createElement("title", null, t('Password recovery'))),
        React.createElement("h3", { className: styles.header }, t('Enter a new password')),
        React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture },
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "password", label: t('Password'), name: "password", defaultValue: password, onChange: onPasswordChange, autoFocus: true }),
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "password", label: t('Password repeat'), name: "passwordRepeat", defaultValue: passwordRepeat, onChange: onPasswordRepeatChange }),
            React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: !password.length ||
                    !passwordRepeat.length ||
                    password !== passwordRepeat, className: styles.button }, t('Restore')),
            React.createElement(Button, { type: "button", component: Link, to: "/", variant: "text", fullWidth: true, className: styles.cancel }, t('buttons:Cancel')))));
};
export { ResetPassword };
