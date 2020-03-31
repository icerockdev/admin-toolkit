/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import {
  Config,
  AuthProvider,
  Page,
  Entity,
  ENTITY_FILTER_TYPES,
  IEntityUpdateFunctionProps,
  IEntityCreateFunctionProps,
  IEntityGetFunctionProps,
} from './application';
import logo from '~/assets/logo512.png';

const SAMPLE_ENTITY_1 = {
  id: 1,
  type: 'text',
  phone: '+7 000 000 000',
  title: 'First one',
  created: new Date().toISOString(),
  visible: true,
};

const SAMPLE_ENTITY_2 = {
  id: 2,
  type: 'text',
  phone: '+7 000 000 000',
  title: 'First one',
  created: new Date().toISOString(),
  visible: true,
};

export default new Config({
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
    new Entity({
      title: 'Sample entity',
      editable: true,
      viewable: true,
      api: {
        list: { url: '/list', method: 'get' },
        update: { url: '/update', method: 'patch' },
        create: { url: '/create', method: 'post' },
        get: { url: '/get', method: 'get' },
      },
      menu: {
        enabled: true,
        label: 'Sample entity',
        url: '/entity',
      },
      filters: {
        current: '',
        value: '',
      },
      fields: [
        {
          name: 'type',
          label: 'Тип',
          sortable: true,
          type: 'string',
          required: true,
        },
        {
          name: 'phone',
          label: 'Телефон',
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
          setTimeout(resolve, 500, {
            data: {
              list: [SAMPLE_ENTITY_1, SAMPLE_ENTITY_2],
              totalPages: 10,
            },
          });
        }),
      updateItemsFn: ({ data }: IEntityUpdateFunctionProps) => {
        return Promise.resolve({ error: '', data });
      },
      createItemsFn: ({ data }: IEntityCreateFunctionProps) => {
        return Promise.resolve({ error: '', data });
      },
      getItemsFn: ({ id }: IEntityGetFunctionProps) => {
        return new Promise((resolve) =>
          setTimeout(resolve, 500, {
            data: SAMPLE_ENTITY_2,
          })
        );
      },
    }),
    new Page({
      title: 'Sample page',
      menu: {
        enabled: true,
        url: '/test',
        label: 'Sample page',
      },
    }),
  ],
});
