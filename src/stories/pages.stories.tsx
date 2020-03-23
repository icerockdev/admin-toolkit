/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { Page } from '~/containers/pages/Page';
import { Entity } from '~/containers/pages/Entity';
import { PageRenderer } from '~/containers/pages/PageRenderer';
import {
  ENTITY_FILTER_TYPES,
  IEntityUpdateFunctionProps,
  IEntityCreateFunctionProps,
} from '~/types/entity';
import { Config } from '~/containers/pages/Config';
import { Application } from '~/containers/pages/Application';
import { AuthProvider } from '~/containers/pages/AuthProvider';
import logo from '~/assets/logo512.png';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { action } from '@storybook/addon-actions';

const config = new Config({
  logo,
  auth: new AuthProvider({
    authRequestFn: (email, password) =>
      Promise.resolve({
        user: {
          email,
          username: email,
          token: 'SAMPLE_TOKEN',
          role: 'user',
        },
        error: '',
      }),
  }),
  pages: [
    new Page({
      title: 'Sample page',
      menu: {
        enabled: true,
        url: '/test',
        label: 'Sample page',
      },
    }),
    new Entity({
      title: 'Sample entity',
      editable: true,
      viewable: true,
      api: {
        list: { url: '/list', method: 'get' },
        update: { url: '/update', method: 'patch' },
        create: { url: '/create', method: 'post' },
      },
      menu: {
        enabled: true,
        label: 'Sample entity',
        url: '/entity',
      },
      filters: {
        current: '',
        value: '',
        fields: [
          {
            name: 'type',
            label: 'Тип',
            type: ENTITY_FILTER_TYPES.SELECT,
            variants: [
              { value: 'news', label: 'Новость' },
              { value: 'article', label: 'Статья' },
            ],
          },
        ],
      },
      fields: [
        {
          name: 'type',
          label: 'Тип',
          sortable: true,
          type: 'string',
        },
        {
          name: 'title',
          label: 'Заголовок',
          sortable: true,
          type: 'string',
          title: true,
        },
        {
          name: 'created',
          label: 'Дата публикации',
          sortable: true,
          type: 'date',
        },
        {
          name: 'visible',
          label: 'Видимость',
          sortable: false,
          type: 'boolean',
        },
      ],
      fetchItemsFn: (...props) =>
        new Promise((resolve) => {
          console.log('Fetching items', props);

          setTimeout(resolve, 500, {
            data: {
              list: [
                {
                  id: 2,
                  type: 'text',
                  title: 'First one',
                  created: new Date().toISOString(),
                  visible: true,
                },
                {
                  id: 3,
                  type: 'text',
                  title: 'Second one',
                  created: new Date().toISOString(),
                  visible: true,
                },
              ],
              totalPages: 10,
            },
          });
        }),
      updateItemsFn: (props: IEntityUpdateFunctionProps) => {
        action('update')(props);
        return Promise.resolve({ error: '', data: props.data });
      },
      createItemsFn: (props: IEntityCreateFunctionProps) => {
        action('create')(props);
        return Promise.resolve({ error: '', data: props.data });
      },
    }),
  ],
});

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
