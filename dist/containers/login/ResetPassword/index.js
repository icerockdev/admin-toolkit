/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState } from 'react';
import { Typography, Paper, TextField, Button, withStyles, Container, } from '@material-ui/core';
import styles from '../styles';
var ResetPasswordUnstyled = function (_a) {
    var classes = _a.classes, onSubmit = _a.onSubmit, token = _a.token;
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(''), passwordRepeat = _c[0], setPasswordRepeat = _c[1];
    var onPasswordChange = useCallback(function (event) {
        setPassword(event.target.value);
    }, [setPassword]);
    var onPasswordRepeatChange = useCallback(function (event) {
        setPasswordRepeat(event.target.value);
    }, [setPasswordRepeat]);
    var onSubmitCapture = useCallback(function (event) {
        event.preventDefault();
        if (!onSubmit)
            return;
        onSubmit({ token: token, password: password, passwordRepeat: passwordRepeat });
    }, [onSubmit, token, passwordRepeat, password]);
    return (React.createElement("div", { className: classes.wrap },
        React.createElement(Container, { component: "main", maxWidth: "sm" },
            React.createElement(Paper, { className: classes.paper },
                React.createElement(Typography, { align: "center", component: "h3", className: classes.header }, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"),
                React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture },
                    React.createElement(TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "password", label: "Password", name: "password", className: classes.marginTop, defaultValue: password, onChange: onPasswordChange, autoFocus: true }),
                    React.createElement(TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "password", label: "Password repeat", name: "passwordRepeat", className: classes.marginTop, defaultValue: passwordRepeat, onChange: onPasswordRepeatChange, autoFocus: true }),
                    React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.marginTop, disabled: !password.length ||
                            !passwordRepeat.length ||
                            password !== passwordRepeat }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C"))))));
};
var ResetPassword = withStyles(styles, { withTheme: true })(ResetPasswordUnstyled);
export { ResetPassword };
