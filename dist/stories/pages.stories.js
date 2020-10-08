/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Application, PageRenderer } from '../application';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import config from '../example';
storiesOf('Pages', module)
    .add('PageRenderer: Entity sample', function () { return (React.createElement(Router, { history: createBrowserHistory() },
    React.createElement(PageRenderer, { page: config.pages[1] }))); })
    .add('PageRenderer: Page sample', function () { return (React.createElement(PageRenderer, { page: config.pages[0] })); })
    .add('Application', function () { return React.createElement(Application, { config: config }); });
