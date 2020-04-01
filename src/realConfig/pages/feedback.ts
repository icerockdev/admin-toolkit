/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity } from '~/application';

import { fetchItemsFn, getItemsFn, updateItemsFn, createItemsFn } from '../api';

import { ADMIN_ROLE_ADMIN, ADMIN_ROLE_MANAGER } from '../roles';
import { InquiryStatusField } from '../components/InquiryStatusField';

export const VEHICLE_INQUIRY_TYPE_BUY = 10;
export const VEHICLE_INQUIRY_TYPE_DRIVE = 20;

export const VEHICLE_INQUIRY_STATUS_NEW = 10;
export const VEHICLE_INQUIRY_STATUS_IN_PROGRESS = 20;
export const VEHICLE_INQUIRY_STATUS_TEST_DRIVE_ASSIGNED = 30;
export const VEHICLE_INQUIRY_STATUS_TEST_DRIVE_COMPLETED = 40;
export const VEHICLE_INQUIRY_STATUS_SENT_KP = 50;
export const VEHICLE_INQUIRY_STATUS_CLOSED_SUCCESSFULLY = 60;
export const VEHICLE_INQUIRY_STATUS_CLOSED_NOT_SUCCESSFULLY = 70;
export const VEHICLE_INQUIRY_STATUS_CLOSED = 80;

export const VEHICLE_INQUIRY_STATUSES = {
  [VEHICLE_INQUIRY_TYPE_BUY]: [
    VEHICLE_INQUIRY_STATUS_NEW,
    VEHICLE_INQUIRY_STATUS_IN_PROGRESS,
    VEHICLE_INQUIRY_STATUS_SENT_KP,
    VEHICLE_INQUIRY_STATUS_CLOSED_SUCCESSFULLY,
    VEHICLE_INQUIRY_STATUS_CLOSED_NOT_SUCCESSFULLY,
  ],
  [VEHICLE_INQUIRY_TYPE_DRIVE]: [
    VEHICLE_INQUIRY_STATUS_NEW,
    VEHICLE_INQUIRY_STATUS_IN_PROGRESS,
    VEHICLE_INQUIRY_STATUS_TEST_DRIVE_ASSIGNED,
    VEHICLE_INQUIRY_STATUS_TEST_DRIVE_COMPLETED,
  ],
};

export const VEHICLE_INQUIRY_STATUS_TITLES = {
  [VEHICLE_INQUIRY_STATUS_NEW]: 'Новая',
  [VEHICLE_INQUIRY_STATUS_IN_PROGRESS]: 'Обрабатывается менеджером',
  [VEHICLE_INQUIRY_STATUS_TEST_DRIVE_ASSIGNED]: 'Назначен тест-драйв',
  [VEHICLE_INQUIRY_STATUS_TEST_DRIVE_COMPLETED]: 'Тест-драйв завершен',
  [VEHICLE_INQUIRY_STATUS_SENT_KP]: 'Отправлено КП',
  [VEHICLE_INQUIRY_STATUS_CLOSED_SUCCESSFULLY]: 'Закрыта успешно',
  [VEHICLE_INQUIRY_STATUS_CLOSED_NOT_SUCCESSFULLY]: 'Закрыта неуспешно',
  [VEHICLE_INQUIRY_STATUS_CLOSED]: 'Закрыта',
};

export default (host: string) =>
  new Entity({
    title: 'Обратная связь',
    editable: true,
    viewable: true,
    roles: {
      list: [ADMIN_ROLE_ADMIN.toString(), ADMIN_ROLE_MANAGER.toString()],
      update: [ADMIN_ROLE_ADMIN.toString(), ADMIN_ROLE_MANAGER.toString()],
    },
    api: {
      list: {
        url: `${host}/admin/v1/inquiry/feedback`,
        method: 'get',
      },
      update: {
        url: `${host}/admin/v1/inquiry/feedback`,
        method: 'put',
      },
      create: {
        url: `${host}/admin/v1/inquiry/feedback`,
        method: 'post',
      },
      get: {
        url: `${host}/admin/v1/inquiry/feedback`,
        method: 'get',
      },
    },
    menu: {
      enabled: true,
      label: 'Обратная связь',
      url: '/feedback',
    },
    fields: [
      {
        name: 'type',
        label: 'Тип',
        type: 'select',
        filterable: true,
        sortable: true,
        options: {
          [VEHICLE_INQUIRY_TYPE_BUY]: 'Покупка А/М',
          [VEHICLE_INQUIRY_TYPE_DRIVE]: 'Тест-драйв',
        },
      },
      {
        name: 'name',
        label: 'Имя',
        type: 'string',
        filterable: true,
        sortable: true,
      },
      {
        name: 'status',
        type: 'custom',
        label: 'Статус',
        required: true,
        sortable: true,
        component: InquiryStatusField,
        options: {
          types: VEHICLE_INQUIRY_STATUSES,
          titles: VEHICLE_INQUIRY_STATUS_TITLES,
        },
      },
      {
        name: 'email',
        label: 'E-mail',
        type: 'string',
        required: true,
      },
      {
        name: 'phone',
        label: 'Телефон',
        type: 'phone',
        required: true,
      },
      {
        name: 'date',
        label: 'Дата/Время',
        type: 'date',
        sortable: true,
      },
      {
        name: 'manager',
        label: 'Менеджер',
        type: 'string', // TODO: Should be reference field
        hideInEdit: true,
      },
      {
        name: 'createdAt',
        label: 'Дата заявки',
        type: 'date',
        hideInEdit: true,
        sortable: true,
      },
    ],
    fetchItemsFn,
    getItemsFn,
    updateItemsFn,
    createItemsFn,
  });
