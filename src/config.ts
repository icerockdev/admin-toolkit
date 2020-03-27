import {
  Config,
  AuthProvider,
  Page,
  Entity,
  ENTITY_FILTER_TYPES,
  IEntityUpdateFunctionProps,
  IEntityCreateFunctionProps,
} from './application';
import logo from '~/assets/logo512.png';

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
      updateItemsFn: ({ data }: IEntityUpdateFunctionProps) => {
        console.log('update', { data });
        return Promise.resolve({ error: '', data });
      },
      createItemsFn: ({ data }: IEntityCreateFunctionProps) => {
        console.log('create', { data });
        return Promise.resolve({ error: '', data });
      },
    }),
  ],
});
