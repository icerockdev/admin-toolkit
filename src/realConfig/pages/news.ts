import axios from 'axios';
import {
  Entity,
  IEntityFetchFunction,
  ENTITY_ERRORS,
  IEntityGetFunction,
  IEntityUpdateFunction,
  IEntityCreateFunction,
} from '~/application';

export const TYPE_OFFER = 10;
export const TYPE_NEWS = 20;

const fetchItemsFn: IEntityFetchFunction = async ({
  url,
  token,
  page,
  count: limit,
  sortBy,
  sortDir,
  filter,
}) => {
  try {
    const offset = (page && limit && page * limit) || 0;
    const orderBy = sortDir.toUpperCase();
    const result = await axios
      .get(url, {
        headers: { Authorization: token },
        params: {
          offset,
          limit,
          sortBy,
          orderBy,
          ...(filter?.name ? { [filter.name]: filter?.value } : {}),
        },
      })
      .catch((e) => e);

    const totalCount = parseInt(result.headers['x-total-count'] || 0);

    if (!result.data || !result.data.success) {
      throw new Error(
        result.response?.data?.message || ENTITY_ERRORS.CANT_LOAD_ITEMS
      );
    }

    return Promise.resolve({
      data: { list: result.data.data, totalCount },
      error: '',
    });
  } catch (error) {
    return {
      data: { list: [], totalCount: 0 },
      error: error.message,
    };
  }
};

const getItemsFn: IEntityGetFunction = async ({ url, token, id }) => {
  try {
    const result = await axios
      .get(`${url}/${id}`, { headers: { Authorization: token } })
      .catch((e) => e);

    if (!result.data || !result.data.success) {
      throw new Error(
        result.response?.data?.message || ENTITY_ERRORS.CANT_LOAD_ITEMS
      );
    }

    return Promise.resolve({
      data: result.data.data,
      error: '',
    });
  } catch (error) {
    return {
      data: {},
      error: error.message,
    };
  }
};

const updateItemsFn: IEntityUpdateFunction = async ({ url, token, data }) => {
  try {
    const result = await axios
      .put(`${url}/${data.id}`, data, { headers: { Authorization: token } })
      .catch((e) => e);

    if (!result.data || !result.data.success) {
      throw new Error(
        result.response?.data?.message || ENTITY_ERRORS.CANT_UPDATE_ITEM
      );
    }

    return Promise.resolve({
      data: result.data.data,
      error: '',
    });
  } catch (error) {
    return {
      data: {},
      error: error.message,
    };
  }
};

const createItemsFn: IEntityCreateFunction = async ({ url, token, data }) => {
  try {
    const result = await axios
      .post(`${url}`, data, { headers: { Authorization: token } })
      .catch((e) => e);

    if (!result.data || !result.data.success) {
      throw new Error(
        result.response?.data?.message || ENTITY_ERRORS.CANT_UPDATE_ITEM
      );
    }

    return Promise.resolve({
      data: result.data.data,
      error: '',
    });
  } catch (error) {
    return {
      data: {},
      error: error.message,
    };
  }
};

export default new Entity({
  title: 'Акции/Новости',
  editable: true,
  viewable: true,
  api: {
    list: {
      url: 'http://localhost:8080/admin/v1/news',
      method: 'get',
    },
    update: {
      url: 'http://localhost:8080/admin/v1/news',
      method: 'put',
    },
    create: {
      url: 'http://localhost:8080/admin/v1/news',
      method: 'post',
    },
    get: {
      url: 'http://localhost:8080/admin/v1/news',
      method: 'get',
    },
  },
  menu: {
    enabled: true,
    label: 'Акции/Новости',
    url: '/news',
  },
  filters: {
    current: '',
    value: '',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      required: true,
      filterable: true,
      availableVariants: {
        [TYPE_OFFER]: 'Акция',
        [TYPE_NEWS]: 'Новость',
      },
    },
    {
      name: 'title',
      type: 'string',
      label: 'Заголовок',
      required: true,
      title: true,
      filterable: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Дата публикации',
      sortable: true,
      hideInEdit: true,
    },
    {
      name: 'description',
      type: 'richtext',
      label: 'Описание',
      required: true,
      hideInList: true,
    },
    {
      name: 'img',
      type: 'string',
      label: 'Изображение',
      required: false,
      hideInList: true,
    },
    {
      name: 'visible',
      type: 'boolean',
      label: 'Видимость',
      sortable: true,
    },
  ],
  fetchItemsFn,
  getItemsFn,
  updateItemsFn,
  createItemsFn,
});
