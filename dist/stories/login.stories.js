/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SignIn } from '../containers/login/SignIn';
import { ForgotPassword } from '../containers/login/ForgotPassword';
import { Container } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
storiesOf('Login', module)
    .addDecorator(function (story) { return (React.createElement(Router, { history: createBrowserHistory() },
    React.createElement(Container, { fixed: true }, story()))); })
    .add('SignIn', function () { return (React.createElement(SignIn, { onForgotScreenClick: action('onForgotScreenClick'), onSubmit: action('onSubmit') })); })
    .add('Forgot password', function () { return (React.createElement(ForgotPassword, { onSubmit: action('onSubmit') })); });
