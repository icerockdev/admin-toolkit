/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var _a, _b;
import { Entity } from '../../application';
import { fetchItemsFn, getItemsFn, updateItemsFn, createItemsFn } from '../api';
import { ADMIN_ROLE_ADMIN, ADMIN_ROLE_MANAGER } from '../roles';
import { VehicleSelectField } from '../components/VehicleSelectField';
import { InquiryStatusField } from '../components/InquiryStatusField';
export var VEHICLE_INQUIRY_TYPE_BUY = 10;
export var VEHICLE_INQUIRY_TYPE_DRIVE = 20;
export var VEHICLE_INQUIRY_STATUS_NEW = 10;
export var VEHICLE_INQUIRY_STATUS_IN_PROGRESS = 20;
export var VEHICLE_INQUIRY_STATUS_TEST_DRIVE_ASSIGNED = 30;
export var VEHICLE_INQUIRY_STATUS_TEST_DRIVE_COMPLETED = 40;
export var VEHICLE_INQUIRY_STATUS_SENT_KP = 50;
export var VEHICLE_INQUIRY_STATUS_CLOSED_SUCCESSFULLY = 60;
export var VEHICLE_INQUIRY_STATUS_CLOSED_NOT_SUCCESSFULLY = 70;
export var VEHICLE_INQUIRY_STATUS_CLOSED = 80;
export var VEHICLE_INQUIRY_STATUSES = (_a = {},
    _a[VEHICLE_INQUIRY_TYPE_BUY] = [
        VEHICLE_INQUIRY_STATUS_NEW,
        VEHICLE_INQUIRY_STATUS_IN_PROGRESS,
        VEHICLE_INQUIRY_STATUS_SENT_KP,
        VEHICLE_INQUIRY_STATUS_CLOSED_SUCCESSFULLY,
        VEHICLE_INQUIRY_STATUS_CLOSED_NOT_SUCCESSFULLY,
    ],
    _a[VEHICLE_INQUIRY_TYPE_DRIVE] = [
        VEHICLE_INQUIRY_STATUS_NEW,
        VEHICLE_INQUIRY_STATUS_IN_PROGRESS,
        VEHICLE_INQUIRY_STATUS_TEST_DRIVE_ASSIGNED,
        VEHICLE_INQUIRY_STATUS_TEST_DRIVE_COMPLETED,
    ],
    _a);
export var VEHICLE_INQUIRY_STATUS_TITLES = (_b = {},
    _b[VEHICLE_INQUIRY_STATUS_NEW] = 'Новая',
    _b[VEHICLE_INQUIRY_STATUS_IN_PROGRESS] = 'Обрабатывается менеджером',
    _b[VEHICLE_INQUIRY_STATUS_TEST_DRIVE_ASSIGNED] = 'Назначен тест-драйв',
    _b[VEHICLE_INQUIRY_STATUS_TEST_DRIVE_COMPLETED] = 'Тест-драйв завершен',
    _b[VEHICLE_INQUIRY_STATUS_SENT_KP] = 'Отправлено КП',
    _b[VEHICLE_INQUIRY_STATUS_CLOSED_SUCCESSFULLY] = 'Закрыта успешно',
    _b[VEHICLE_INQUIRY_STATUS_CLOSED_NOT_SUCCESSFULLY] = 'Закрыта неуспешно',
    _b[VEHICLE_INQUIRY_STATUS_CLOSED] = 'Закрыта',
    _b);
export default (function (host) {
    var _a;
    return new Entity({
        title: 'Заявки',
        editable: true,
        viewable: true,
        roles: {
            list: [ADMIN_ROLE_ADMIN.toString(), ADMIN_ROLE_MANAGER.toString()],
            update: [ADMIN_ROLE_ADMIN.toString(), ADMIN_ROLE_MANAGER.toString()],
        },
        api: {
            list: {
                url: host + "/admin/v1/inquiry/vehicle",
                method: 'get',
            },
            update: {
                url: host + "/admin/v1/inquiry/vehicle",
                method: 'put',
            },
            create: {
                url: host + "/admin/v1/inquiry/vehicle",
                method: 'post',
            },
            get: {
                url: host + "/admin/v1/inquiry/vehicle",
                method: 'get',
            },
        },
        menu: {
            enabled: true,
            label: 'Заявки',
            url: '/inquiry',
        },
        fields: [
            {
                name: 'type',
                label: 'Тип',
                type: 'select',
                filterable: true,
                sortable: true,
                options: (_a = {},
                    _a[VEHICLE_INQUIRY_TYPE_BUY] = 'Покупка А/М',
                    _a[VEHICLE_INQUIRY_TYPE_DRIVE] = 'Тест-драйв',
                    _a),
            },
            {
                name: 'name',
                label: 'Ф.И.О.',
                type: 'string',
                hideInEdit: true,
                hideInList: true,
                filterable: true,
                sortable: true,
            },
            {
                name: 'firstName',
                type: 'string',
                label: 'Имя',
                required: true,
                filterable: false,
                sortable: true,
            },
            {
                name: 'lastName',
                type: 'string',
                label: 'Фамилия',
                required: true,
                filterable: false,
                sortable: true,
            },
            {
                name: 'middleName',
                type: 'string',
                label: 'Отчество',
                required: true,
                filterable: false,
                sortable: true,
            },
            {
                name: 'status',
                type: 'custom',
                label: 'Статус',
                component: InquiryStatusField,
                required: true,
                sortable: true,
                options: {
                    types: VEHICLE_INQUIRY_STATUSES,
                    titles: VEHICLE_INQUIRY_STATUS_TITLES,
                },
            },
            {
                name: 'date',
                label: 'Дата/Время',
                type: 'date',
                sortable: true,
            },
            {
                name: 'phone',
                label: 'Телефон',
                type: 'phone',
                required: true,
            },
            {
                name: 'vehicleId',
                label: 'А/М',
                type: 'custom',
                component: VehicleSelectField,
                options: {
                    getVehiclesUrl: host + "/admin/v1/vehicle/",
                },
            },
            {
                name: 'manager',
                label: 'Менеджер',
                type: 'string',
                hideInEdit: true,
            },
            {
                name: 'dealer',
                label: 'Дилерский центр',
                type: 'string',
            },
            {
                name: 'createdAt',
                label: 'Дата заявки',
                type: 'date',
                hideInEdit: true,
                sortable: true,
            },
            {
                name: 'notificationsEnabled',
                label: 'Посылать уведомления клиенту об изменениях',
                type: 'boolean',
                hideInList: true,
            },
        ],
        fetchItemsFn: fetchItemsFn,
        getItemsFn: getItemsFn,
        updateItemsFn: updateItemsFn,
        createItemsFn: createItemsFn,
    });
});
