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
  IAuthProviderProps,
} from './application';
import logo from '~/assets/logo512.png';
import axios from 'axios';
import { JWTAuthProvider } from './application/modules/JWTAuthProvider';

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

const authRequestFn = async (
  email: string,
  password: string
): Promise<{
  user: IAuthProviderProps['user'];
  tokens: Record<string, string>;
  error: string;
}> => {
  try {
    const auth = await axios
      .post('http://localhost:8080/admin/v1/auth/signin', { email, password })
      .catch((e) => e);

    if (!auth.data || !auth.data.success) {
      console.log({ auth });
      throw new Error(auth.response?.data?.message);
    }

    const profile = await axios
      .get('http://localhost:8080/admin/v1/user/profile', {
        headers: { authorization: `Bearer ${auth.data.data.accessToken}` },
      })
      .catch((e) => e);

    if (!profile.data || !profile.data.success) {
      throw new Error(profile.response?.data?.message);
    }

    return {
      user: {
        id: profile.data.data.id,
        email: profile.data.data.email,
        username: profile.data.data.name,
        role: profile.data.data.role,
      },
      tokens: {
        access: auth.data.data.accessToken,
        refresh: auth.data.data.refreshToken,
      },
      error: '',
    };
  } catch (error) {
    console.log({ error });

    return {
      user: {},
      tokens: {},
      error: error.message,
    };
  }
};

export default new Config({
  logo,
  auth: new JWTAuthProvider({
    authRequestFn,
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
          required: true,
        },
        {
          name: 'phone',
          label: 'Телефон',
          sortable: true,
          type: 'phone',
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
              list: [SAMPLE_ENTITY_1, SAMPLE_ENTITY_2],
              totalPages: 10,
            },
          });
        }),
      updateItemsFn: ({ data }: IEntityUpdateFunctionProps) => {
        console.log('update', { data });
        return Promise.resolve({ error: '', data });
      },
      createItemsFn: ({ data }: IEntityCreateFunctionProps) => {
        console.log('create', { data });
        return Promise.resolve({ error: '', data });
      },
      getItemsFn: ({ id }: IEntityGetFunctionProps) => {
        console.log('get', { id });
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