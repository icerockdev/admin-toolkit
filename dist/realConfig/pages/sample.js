/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { Entity, } from '../../application';
var SAMPLE_ENTITY_1 = {
    id: 1,
    type: 'text',
    phone: '+7 000 000 000',
    title: 'First one',
    created: new Date().toISOString(),
    visible: true,
};
var SAMPLE_ENTITY_2 = {
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
    fetchItemsFn: function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            setTimeout(resolve, 500, {
                data: {
                    list: [SAMPLE_ENTITY_1, SAMPLE_ENTITY_2],
                    totalPages: 10,
                },
            });
        });
    },
    updateItemsFn: function (_a) {
        var data = _a.data;
        return Promise.resolve({ error: '', data: data });
    },
    createItemsFn: function (_a) {
        var data = _a.data;
        return Promise.resolve({ error: '', data: data });
    },
    getItemsFn: function (_a) {
        var id = _a.id;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 500, {
                data: SAMPLE_ENTITY_2,
            });
        });
    },
});
