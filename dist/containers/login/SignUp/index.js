/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState } from 'react';
import { useConfig } from '../../../application';
import styles from './styles.module.scss';
import { Button, TextField } from '@material-ui/core';
var SignUp = function () {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var config = useConfig();
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
    return (React.createElement("form", { className: styles.form, onSubmit: onSubmit },
        React.createElement("h3", { className: styles.header }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"),
        React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "email", label: auth.loginLabel, name: "email", autoComplete: "email", defaultValue: email, onChange: onEmailChange, autoFocus: true }),
        React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, name: "password", label: "\u041F\u0430\u0440\u043E\u043B\u044C", type: "password", id: "password", defaultValue: password, onChange: onPasswordChange, autoComplete: "current-password" }),
        React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: !email.length || !password.length, className: styles.button }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F")));
};
export { SignUp };
