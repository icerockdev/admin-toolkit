/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { Entity } from '../../application';
import { ADMIN_ROLE_ADMIN, ADMIN_ROLE_MANAGER } from '../roles';
import { fetchItemsFn, getItemsFn, updateItemsFn, createItemsFn } from '../api';
import { RegionSelectField } from '../components/RegionSelectField';
import { CitySelectField } from '../components/CitySelectField';
export var TYPE_OFFER = 10;
export var TYPE_NEWS = 20;
export var CUSTOMER_STATUS_ACTIVE = 10;
export var CUSTOMER_STATUS_BLOCKED = 20;
export var CUSTOMER_STATUS_REGISTRATION = 30;
export default (function (host) {
    var _a;
    return new Entity({
        title: 'Клиенты',
        editable: true,
        viewable: true,
        roles: {
            list: [ADMIN_ROLE_ADMIN.toString(), ADMIN_ROLE_MANAGER.toString()],
            update: [ADMIN_ROLE_ADMIN.toString()],
            create: [ADMIN_ROLE_ADMIN.toString()],
        },
        api: {
            list: {
                url: host + "/admin/v1/customer",
                method: 'get',
            },
            update: {
                url: host + "/admin/v1/customer",
                method: 'put',
            },
            create: {
                url: host + "/admin/v1/customer",
                method: 'post',
            },
            get: {
                url: host + "/admin/v1/customer",
                method: 'get',
            },
        },
        menu: {
            enabled: true,
            label: 'Клиенты',
            url: '/customer',
        },
        fields: [
            {
                name: 'name',
                type: 'string',
                label: 'Ф.И.О.',
                hideInEdit: true,
                hideInList: true,
                filterable: true,
            },
            {
                name: 'firstName',
                type: 'string',
                label: 'Имя',
                required: true,
                filterable: false,
            },
            {
                name: 'lastName',
                type: 'string',
                label: 'Фамилия',
                required: true,
                filterable: false,
            },
            {
                name: 'middleName',
                type: 'string',
                label: 'Отчество',
                required: true,
                filterable: false,
            },
            {
                name: 'status',
                type: 'select',
                label: 'Статус',
                required: true,
                sortable: true,
                filterable: false,
                options: (_a = {},
                    _a[CUSTOMER_STATUS_ACTIVE] = 'Активен',
                    _a[CUSTOMER_STATUS_BLOCKED] = 'Заблокирован',
                    _a[CUSTOMER_STATUS_REGISTRATION] = 'Не подтвержден',
                    _a),
            },
            {
                name: 'phone',
                type: 'phone',
                label: 'Телефон',
                required: true,
                filterable: true,
            },
            {
                name: 'email',
                type: 'string',
                label: 'E-mail',
                required: true,
                filterable: true,
            },
            {
                name: 'birthday',
                type: 'date',
                label: 'Дата рождения',
                filterable: false,
                hideInList: true,
            },
            {
                name: 'company',
                type: 'string',
                label: 'Компания',
                filterable: false,
                hideInList: true,
            },
            {
                name: 'website',
                type: 'string',
                label: 'WWW',
                filterable: false,
                hideInList: true,
            },
            {
                name: 'regionId',
                type: 'custom',
                label: 'Область/Край',
                hideInList: true,
                component: RegionSelectField,
                options: {
                    getRegionsUrl: host + "/admin/v1/location/region",
                },
            },
            {
                name: 'cityId',
                type: 'custom',
                label: 'Город',
                hideInList: true,
                component: CitySelectField,
                options: {
                    getRegionsUrl: host + "/admin/v1/location/region",
                },
            },
        ],
        fetchItemsFn: fetchItemsFn,
        getItemsFn: getItemsFn,
        updateItemsFn: updateItemsFn,
        createItemsFn: createItemsFn,
    });
});
