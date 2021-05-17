/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { Entity } from '~/application';
import {
  createEntityFn,
  fetchEntityItemsFn,
  getEntityFn,
  getEntityTypeVariants,
  updateEntityFn,
} from './api';
import { SAMPLE_ENTITY_FIELDS } from './fields';

export default new Entity({
  title: 'Entity',
  editable: true,
  viewable: true,
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
  fields: SAMPLE_ENTITY_FIELDS,
  permissions: {
    create: ['admin'],
    update: ['admin'],
  },

  fetchItemsFn: ({ url, page, count, token, filter, sortBy, sortDir }) =>
    fetchEntityItemsFn({ url, page, count, token, filter, sortBy, sortDir }),

  getItemsFn: ({ id, url, token }) => getEntityFn({ id, url, token }),

  updateItemsFn: ({ id, data, url, token }) =>
    updateEntityFn({ id, data, url, token }),

  createItemsFn: ({ data, url, token }) => createEntityFn({ data, url, token }),

  references: {
    type: {
      getMany: (entity) => getEntityTypeVariants(entity),
    },
  },
});
