/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useMemo, useState } from 'react';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
var SignIn = function () {
    var _a;
    var config = useConfig();
    var t = useTranslation().t;
    var auth = config.auth;
    var onForgotPassword = useMemo(function () {
        var _a;
        return ((_a = config.auth) === null || _a === void 0 ? void 0 : _a.authPasswRestoreFn) ? function () {
            config.history.push('/restore');
        }
            : undefined;
    }, [config.history, config.auth, (_a = config.auth) === null || _a === void 0 ? void 0 : _a.authPasswRestoreFn]);
    var _b = useState(''), email = _b[0], setEmail = _b[1];
    var _c = useState(''), password = _c[0], setPassword = _c[1];
    var onSubmitCapture = useCallback(function (event) {
        event.preventDefault();
        auth.sendAuthRequest(email, password);
    }, [email, password, auth]);
    var onEmailChange = useCallback(function (event) { return setEmail(event.target.value); }, [
        setEmail,
    ]);
    var onPasswordChange = useCallback(function (event) { return setPassword(event.target.value); }, [setPassword]);
    var loginLabel = useMemo(function () { var _a; return ((_a = config.auth) === null || _a === void 0 ? void 0 : _a.loginLabel) || t('Login'); }, [
        config.auth,
        t,
    ]);
    return (React.createElement("div", { className: styles.wrap },
        React.createElement(Helmet, null,
            React.createElement("title", null, t('Sign In'))),
        React.createElement("h3", { className: styles.header }, t('Sign In')),
        React.createElement("form", { noValidate: true, onSubmit: onSubmitCapture },
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, id: "email", label: t(loginLabel), name: "email", autoComplete: "email", defaultValue: email, onChange: onEmailChange, autoFocus: true }),
            React.createElement(TextField, { variant: "filled", margin: "normal", required: true, fullWidth: true, name: "password", label: t('Password'), type: "password", id: "password", defaultValue: password, onChange: onPasswordChange, autoComplete: "current-password", InputProps: {
                    endAdornment: onForgotPassword ? (React.createElement(InputAdornment, { position: "end", onClick: onForgotPassword, className: styles.forgot }, t('Forgot password?'))) : null,
                } }),
            React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: !email.length || !password.length, className: styles.button }, t('Log In')),
            !!(auth === null || auth === void 0 ? void 0 : auth.authSignupFn) && (React.createElement(Button, { type: "button", fullWidth: true, variant: "outlined", color: "primary", className: styles.button, component: Link, to: "/signup" }, t('Sign Up'))))));
};
export { SignIn };
