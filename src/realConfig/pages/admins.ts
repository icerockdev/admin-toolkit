import axios from 'axios';
import {
  Entity,
  ENTITY_FILTER_TYPES,
  IEntityFetchFunction,
  ENTITY_ERRORS,
  IEntityGetFunction,
  IEntityUpdateFunction,
  IEntityCreateFunction,
} from '~/application';

export const CUSTOMER_STATUS_ACTIVE = 10;
export const CUSTOMER_STATUS_BLOCKED = 20;

export const ADMIN_ROLE_ADMIN = 10;
export const ADMIN_ROLE_MANAGER = 20;
export const ADMIN_ROLE_EDITOR = 30;

const fetchItemsFn: IEntityFetchFunction = async ({
  url,
  token,
  page,
  count: limit,
  sortBy,
  sortDir: orderBy,
}) => {
  try {
    const offset = (page && limit && page * limit) || 0;
    const result = await axios
      .get(url, {
        headers: { Authorization: token },
        params: {
          offset,
          limit,
          sortBy,
          orderBy,
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
  title: 'Администраторы',
  editable: true,
  viewable: true,
  api: {
    list: {
      url: 'http://localhost:8080/admin/v1/user',
      method: 'get',
    },
    update: {
      url: 'http://localhost:8080/admin/v1/user',
      method: 'put',
    },
    create: {
      url: 'http://localhost:8080/admin/v1/user',
      method: 'post',
    },
    get: {
      url: 'http://localhost:8080/admin/v1/user',
      method: 'get',
    },
  },
  menu: {
    enabled: true,
    label: 'Администраторы',
    url: '/user',
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
      name: 'name',
      type: 'string',
      label: 'Ф.И.О.',
      required: true,
      title: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      sortable: true,
      hideInEdit: true,
      availableVariants: {
        [CUSTOMER_STATUS_ACTIVE]: 'Активен',
        [CUSTOMER_STATUS_BLOCKED]: 'Заблокирован',
      },
    },
    {
      name: 'phone',
      type: 'string',
      label: 'Рабочий тел.',
      required: true,
    },
    {
      name: 'personalPhone',
      type: 'string',
      label: 'Личный тел.',
      required: true,
      hideInList: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Роль',
      sortable: true,
      required: true,
      availableVariants: {
        [ADMIN_ROLE_ADMIN]: 'Главный Администратор',
        [ADMIN_ROLE_EDITOR]: 'Редактор Контента',
        [ADMIN_ROLE_MANAGER]: 'Менеджер Заявок',
      },
    },
    {
      name: 'email',
      type: 'string',
      label: 'E-mail',
      required: true,
      hideInList: true,
    },
  ],
  fetchItemsFn,
  getItemsFn,
  updateItemsFn,
  createItemsFn,
});
