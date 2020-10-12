/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useRouteMatch } from 'react-router';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
var ResetPassword = function () {
    var _a = useState(''), password = _a[0], setPassword = _a[1];
    var _b = useState(''), passwordRepeat = _b[0], setPasswordRepeat = _b[1];
    var matches = useRouteMatch();
    var config = useConfig();
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
    }, [config.auth, matches, passwordRepeat, password]);
    return (React.createElement("div", { className: styles.wrap },
        React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture, className: styles.form },
            React.createElement("h3", { className: styles.header }, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"),
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "password", label: "Password", name: "password", defaultValue: password, onChange: onPasswordChange, autoFocus: true }),
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "password", label: "Password repeat", name: "passwordRepeat", defaultValue: passwordRepeat, onChange: onPasswordRepeatChange }),
            React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: !password.length ||
                    !passwordRepeat.length ||
                    password !== passwordRepeat, className: styles.button }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C"))));
};
export { ResetPassword };
