/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';

import { storiesOf } from '@storybook/react';
import logo from '~/assets/logo512.png';
import { Navigation } from '~/containers/layout/Navigation';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { action } from '@storybook/addon-actions';

const LOGO = { url: logo, title: 'Logo' };
const LINKS = [
  { name: 'Link1', url: '#' },
  { name: 'Link2', url: '#' },
];
const ACCOUNT = { email: 'user@sample.org', role: 'admin' };

storiesOf('Layout', module)
  .addDecorator(storyFn => (
    <Router history={createBrowserHistory()}>{storyFn()}</Router>
  ))
  .add('Navigation', () => (
    <Navigation
      logo={LOGO}
      links={LINKS}
      account={ACCOUNT}
      onLogout={() => {
        action('logout')();
      }}
    />
  ));
