/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity } from '../../application';
import { createEntityFn, fetchEntityItemsFn, getEntityFn, getEntityTypeVariants, updateEntityFn, } from './api';
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
    fetchItemsFn: function (_a) {
        var url = _a.url, page = _a.page, count = _a.count, token = _a.token, filter = _a.filter, sortBy = _a.sortBy, sortDir = _a.sortDir;
        return fetchEntityItemsFn({ url: url, page: page, count: count, token: token, filter: filter, sortBy: sortBy, sortDir: sortDir });
    },
    getItemsFn: function (_a) {
        var id = _a.id, url = _a.url, token = _a.token;
        return getEntityFn({ id: id, url: url, token: token });
    },
    updateItemsFn: function (_a) {
        var id = _a.id, data = _a.data, url = _a.url, token = _a.token;
        return updateEntityFn({ id: id, data: data, url: url, token: token });
    },
    createItemsFn: function (_a) {
        var data = _a.data, url = _a.url, token = _a.token;
        return createEntityFn({ data: data, url: url, token: token });
    },
    references: {
        type: {
            getMany: function (entity) { return getEntityTypeVariants(entity); },
        },
    },
});
