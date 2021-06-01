/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useMemo, useState } from 'react';
import { useConfig } from '../../../application';
import styles from './styles.module.scss';
import { Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
var SignUp = function () {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var config = useConfig();
    var t = useTranslation().t;
    var auth = config.auth;
    var onSubmit = useCallback(function (event) {
        event.preventDefault();
        auth.sendAuthSignup({
            email: email,
            password: password,
        });
    }, [auth, email, password]);
    var onEmailChange = useCallback(function (event) { return setEmail(event.target.value); }, [
        setEmail,
    ]);
    var onPasswordChange = useCallback(function (event) { return setPassword(event.target.value); }, [setPassword]);
    var loginLabel = useMemo(function () { var _a; return ((_a = config.auth) === null || _a === void 0 ? void 0 : _a.loginLabel) || t('Login'); }, [config.auth, t]);
    return (React.createElement("div", { className: styles.wrap },
        React.createElement(Helmet, null,
            React.createElement("title", null, t('Sign Up'))),
        React.createElement("h3", { className: styles.header }, t('Sign Up')),
        React.createElement("form", { onSubmit: onSubmit },
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "email", label: loginLabel, name: "email", autoComplete: "email", defaultValue: email, onChange: onEmailChange, autoFocus: true }),
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, name: "password", label: t('Password'), type: "password", id: "password", defaultValue: password, onChange: onPasswordChange, autoComplete: "current-password" }),
            React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: !email.length || !password.length, className: styles.button }, t('Register now')),
            React.createElement(Button, { type: "button", component: Link, to: "/", variant: "text", fullWidth: true, className: styles.cancel }, t('buttons:Cancel')))));
};
export { SignUp };
