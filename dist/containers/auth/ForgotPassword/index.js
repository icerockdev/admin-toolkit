/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
var ForgotPassword = function () {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var config = useConfig();
    var t = useTranslation().t;
    var onEmailChange = useCallback(function (event) {
        setEmail(event.target.value);
    }, [setEmail]);
    var onSubmitCapture = useCallback(function (event) {
        var _a;
        event.preventDefault();
        if (!((_a = config === null || config === void 0 ? void 0 : config.auth) === null || _a === void 0 ? void 0 : _a.sendAuthPasswRestore))
            return;
        config.auth.sendAuthPasswRestore(email);
    }, [config, email]);
    return (React.createElement("div", { className: styles.wrap },
        React.createElement(Helmet, null,
            React.createElement("title", null, t('Password recovery'))),
        React.createElement("h3", { className: styles.header }, t('Password recovery')),
        React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture },
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "email", label: t('Email'), name: "email", autoComplete: "email", defaultValue: email, onChange: onEmailChange, autoFocus: true }),
            React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: !email.length, className: styles.button }, t('Restore')),
            React.createElement(Button, { type: "button", component: Link, to: "/", variant: "text", fullWidth: true, className: styles.cancel }, t('buttons:Cancel')))));
};
export { ForgotPassword };
