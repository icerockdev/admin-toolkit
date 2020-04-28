/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import {
  Config,
  AuthProvider,
  Page,
  Entity,
  IEntityUpdateFunctionProps,
  IEntityCreateFunctionProps,
  IEntityGetFunctionProps,
} from './application';
import logo from '~/assets/logo512.png';

const SAMPLE_ENTITY_1 = {
  id: 1,
  type: 1,
  phone: '+7 000 000 000',
  title: 'First one',
  created: new Date().toISOString(),
  createdTime: new Date().toISOString(),
  number: '0.123123123',
  visible: true,
};

const SAMPLE_ENTITY_2 = {
  id: 2,
  type: 2,
  phone: '+7 000 000 000',
  title: 'First one',
  created: new Date().toISOString(),
  createdTime: new Date().toISOString(),
  number: 0.123123123,
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
      viewable: false,
      creatable: true,
      exportable: true,
      selectable: false,
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
      fields: [
        {
          name: 'type',
          label: 'Тип',
          sortable: true,
          filterable: true,
          type: 'referenceSelect',
          required: true,
        },
        {
          name: 'another',
          label: 'Проверка лейбла',
          type: 'select',
          filterable: true,
          options: {
            1: 'asdasdasd adsasd',
            2: 'asdasd asdasdasd',
          },
        },
        {
          name: 'phone',
          label: 'Телефон',
          sortable: true,
          type: 'string',
          filterable: true,
        },
        {
          name: 'title',
          label: 'Заголовок',
          sortable: true,
          type: 'string',
          title: true,
          hideInCreate: true,
        },
        {
          name: 'created',
          label: 'Дата публикации',
          sortable: true,
          type: 'date',
        },
        {
          name: 'createdTime',
          label: 'Дата и время',
          sortable: true,
          type: 'datetime',
        },
        {
          name: 'visible',
          label: 'Видимость',
          sortable: false,
          type: 'boolean',
        },
        {
          type: 'number',
          name: 'number',
          label: 'Количество',
          sortable: true,
          options: {
            accuracy: 4,
          },
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

      references: {
        type: {
          getMany: async () => {
            return {
              1: 'variant 1',
              2: 'variant 2',
              3: 'variant 3',
            };
          },
        },
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
