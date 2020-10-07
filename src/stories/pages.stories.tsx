/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { Application, PageRenderer } from '~/application';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import config from '~/example';

storiesOf('Pages', module)
  .add('PageRenderer: Entity sample', () => (
    <Router history={createBrowserHistory()}>
      <PageRenderer page={config.pages[1]} />
    </Router>
  ))
  .add('PageRenderer: Page sample', () => (
    <PageRenderer page={config.pages[0]} />
  ))
  .add('Application', () => <Application config={config} />);
