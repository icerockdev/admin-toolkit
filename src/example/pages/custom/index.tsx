/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { Entity } from '~/application';
import { observer } from 'mobx-react';
import { SAMPLE_ENTITY_FIELDS } from '../entity/fields';
import {
  fetchEntityItemsFn,
  getEntityFn,
  updateEntityFn,
  createEntityFn,
} from '../entity/api';
import { computed } from 'mobx';

class CustomEntity extends Entity {
  @computed
  get output() {
    return observer(() => (
      <div>
        <h1>{this.title}</h1>
        <div>This is cutom output. Btw, items count is {this.data.length}.</div>
      </div>
    ));
  }
}

export default new CustomEntity({
  title: 'Custom entity',
  editable: true,
  viewable: true,
  creatable: true,
  exportable: true,
  selectable: false,
  api: {
    list: { url: '/custom/list', method: 'get' },
    update: { url: '/custom/update', method: 'patch' },
    create: { url: '/custom/create', method: 'post' },
    get: { url: '/custom/get', method: 'get' },
  },
  menu: {
    enabled: true,
    label: 'Custom',
    url: '/custom',
  },
  fields: SAMPLE_ENTITY_FIELDS,

  fetchItemsFn: ({ url, page, count, token, filter, sortBy, sortDir }) =>
    fetchEntityItemsFn({ url, page, count, token, filter, sortBy, sortDir }),

  getItemsFn: ({ id, url, token }) => getEntityFn({ id, url, token }),

  updateItemsFn: ({ id, data, url, token }) =>
    updateEntityFn({ id, data, url, token }),

  createItemsFn: ({ data, url, token }) => createEntityFn({ data, url, token }),
});
