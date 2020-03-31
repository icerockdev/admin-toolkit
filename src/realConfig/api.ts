/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import {
  IEntityFetchFunction,
  ENTITY_ERRORS,
  IEntityGetFunction,
  IEntityUpdateFunction,
  IEntityCreateFunction,
} from '~/application';
import axios from 'axios';

export const fetchItemsFn: IEntityFetchFunction = async ({
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

    if (!result.data || !(result.data.success || result.data.isSuccess)) {
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

export const getItemsFn: IEntityGetFunction = async ({ url, token, id }) => {
  try {
    const result = await axios
      .get(`${url}/${id}`, { headers: { Authorization: token } })
      .catch((e) => e);

    if (!result.data || !(result.data.success || result.data.isSuccess)) {
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

export const updateItemsFn: IEntityUpdateFunction = async ({
  url,
  token,
  data,
}) => {
  try {
    const result = await axios
      .put(`${url}/${data.id}`, data, { headers: { Authorization: token } })
      .catch((e) => e);

    if (!result.data || !(result.data.success || result.data.isSuccess)) {
      throw new Error(
        result.response?.data?.dataList[0]?.message ||
          result.response?.data?.message ||
          ENTITY_ERRORS.CANT_UPDATE_ITEM
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

export const createItemsFn: IEntityCreateFunction = async ({
  url,
  token,
  data,
}) => {
  try {
    const result = await axios
      .post(`${url}`, data, { headers: { Authorization: token } })
      .catch((e) => e);

    if (!result.data || !(result.data.success || result.data.isSuccess)) {
      throw new Error(
        result.response?.data?.dataList[0]?.message ||
          result.response?.data?.message ||
          ENTITY_ERRORS.CANT_UPDATE_ITEM
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
