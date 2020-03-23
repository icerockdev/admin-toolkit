/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, } from 'react';
import { Typography, Paper, TextField, Button, withStyles, Container, } from '@material-ui/core';
import styles from '../styles';
var ForgotPasswordUnstyled = function (_a) {
    var classes = _a.classes, email = _a.email, onEmailChange = _a.onEmailChange, onSubmit = _a.onSubmit;
    var onSubmitCapture = useCallback(function (event) {
        event.preventDefault();
        onSubmit(event);
    }, [onSubmit]);
    return (React.createElement("div", { className: classes.wrap },
        React.createElement(Container, { component: "main", maxWidth: "sm" },
            React.createElement(Paper, { className: classes.paper },
                React.createElement(Typography, { align: "center", component: "h3", className: classes.header }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F"),
                React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture },
                    React.createElement(TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "email", label: "Email", name: "email", className: classes.marginTop, autoComplete: "email", defaultValue: email, onChange: onEmailChange, autoFocus: true }),
                    React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.marginTop, disabled: !email.length }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C"))))));
};
var ForgotPassword = withStyles(styles, { withTheme: true })(ForgotPasswordUnstyled);
export { ForgotPassword };
