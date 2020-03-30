import {
  Entity,
  ENTITY_FILTER_TYPES,
  IEntityUpdateFunctionProps,
  IEntityCreateFunctionProps,
  IEntityGetFunctionProps,
} from '~/application';

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

export default new Entity({
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
});
