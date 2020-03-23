/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState, } from 'react';
import { Paper, Typography, TextField, withStyles, InputAdornment, Button, Container, } from '@material-ui/core';
import styles from '../styles';
var SignInUnstyled = function (_a) {
    var classes = _a.classes, onForgotScreenClick = _a.onForgotScreenClick, onSubmit = _a.onSubmit;
    var _b = useState(''), email = _b[0], setEmail = _b[1];
    var _c = useState(''), password = _c[0], setPassword = _c[1];
    var onSubmitCapture = useCallback(function (event) {
        event.preventDefault();
        onSubmit({ email: email, password: password });
    }, [email, password, onSubmit]);
    var onEmailChange = useCallback(function (event) { return setEmail(event.target.value); }, [
        setEmail,
    ]);
    var onPasswordChange = useCallback(function (event) { return setPassword(event.target.value); }, [setPassword]);
    return (React.createElement("div", { className: classes.wrap },
        React.createElement(Container, { component: "main", maxWidth: "sm" },
            React.createElement(Paper, { className: classes.paper },
                React.createElement(Typography, { align: "center", component: "h3", className: classes.header }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"),
                React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture },
                    React.createElement(TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "email", label: "Email", name: "email", className: classes.marginTop, autoComplete: "email", defaultValue: email, onChange: onEmailChange, autoFocus: true }),
                    React.createElement(TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "password", label: "\u041F\u0430\u0440\u043E\u043B\u044C", type: "password", id: "password", className: classes.marginTop, defaultValue: password, onChange: onPasswordChange, autoComplete: "current-password", InputProps: {
                            endAdornment: (React.createElement(InputAdornment, { position: "end", onClick: onForgotScreenClick, className: classes.forgot }, "\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?")),
                        } }),
                    React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.marginTop, disabled: !email.length || !password.length }, "\u0412\u043E\u0439\u0442\u0438"))))));
};
var SignIn = withStyles(styles, { withTheme: true })(SignInUnstyled);
export { SignIn };
