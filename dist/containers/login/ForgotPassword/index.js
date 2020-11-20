/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
var ForgotPassword = function () {
    var config = useConfig();
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var onEmailChange = useCallback(function (event) {
        setEmail(event.target.value);
    }, [setEmail]);
    var onSubmitCapture = useCallback(function (event) {
        var _a;
        event.preventDefault();
        if (!((_a = config === null || config === void 0 ? void 0 : config.auth) === null || _a === void 0 ? void 0 : _a.sendAuthPasswRestore))
            return;
        config.auth.sendAuthPasswRestore(email);
    }, [email, config.auth]);
    return (React.createElement("div", { className: styles.wrap },
        React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture, className: styles.form },
            React.createElement("h3", { className: styles.header }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F"),
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "email", label: "Email", name: "email", autoComplete: "email", defaultValue: email, onChange: onEmailChange, autoFocus: true }),
            React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: !email.length, className: styles.button }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C"),
            React.createElement(Button, { type: "button", component: Link, to: "/", variant: "text", fullWidth: true, className: styles.cancel }, "\u041E\u0442\u043C\u0435\u043D\u0430"))));
};
export { ForgotPassword };
