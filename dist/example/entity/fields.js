/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
export var SAMPLE_ENTITY_FIELDS = [
    {
        name: 'type',
        label: 'Тип',
        sortable: true,
        filterable: true,
        type: 'referenceSelect',
        required: true,
    },
    {
        name: 'another',
        label: 'Проверка лейбла',
        type: 'select',
        filterable: true,
        options: {
            1: 'asdasdasd adsasd',
            2: 'asdasd asdasdasd',
        },
    },
    {
        name: 'phone',
        label: 'Телефон',
        sortable: true,
        type: 'string',
        filterable: true,
    },
    {
        name: 'title',
        label: 'Заголовок',
        sortable: true,
        type: 'string',
        title: true,
        hideInCreate: true,
    },
    {
        name: 'created',
        label: 'Дата публикации начало (от)',
        filterable: true,
        sortable: true,
        type: 'date',
    },
    {
        name: 'createdTime',
        label: 'Дата и время',
        sortable: true,
        type: 'datetime',
    },
    {
        name: 'visible',
        label: 'Видимость',
        sortable: false,
        type: 'boolean',
    },
    {
        type: 'number',
        name: 'number',
        label: 'Количество (1)',
        sortable: true,
        validator: function (val) { return (String(val) === '1' ? '' : 'Должно быть 1'); },
        options: {
            accuracy: 4,
        },
    },
    {
        name: 'requiredInEdit',
        label: 'Обязательное в редакторе',
        type: 'string',
        required: true,
        hideInCreate: true,
    },
    {
        name: 'requiredInCreate',
        label: 'Обязательное при создании',
        type: 'string',
        required: true,
        hideInEdit: true,
    },
];
