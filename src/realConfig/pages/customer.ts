/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity } from '~/application';
import { ADMIN_ROLE_ADMIN, ADMIN_ROLE_MANAGER } from '../roles';

import { fetchItemsFn, getItemsFn, updateItemsFn, createItemsFn } from '../api';

export const TYPE_OFFER = 10;
export const TYPE_NEWS = 20;

export const CUSTOMER_STATUS_ACTIVE = 10;
export const CUSTOMER_STATUS_BLOCKED = 20;
export const CUSTOMER_STATUS_REGISTRATION = 30;

export default (host: string) =>
  new Entity({
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
        url: `${host}/admin/v1/customer`,
        method: 'get',
      },
      update: {
        url: `${host}/admin/v1/customer`,
        method: 'put',
      },
      create: {
        url: `${host}/admin/v1/customer`,
        method: 'post',
      },
      get: {
        url: `${host}/admin/v1/customer`,
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
        filterable: false,
        availableVariants: {
          [CUSTOMER_STATUS_ACTIVE]: 'Активен',
          [CUSTOMER_STATUS_BLOCKED]: 'Заблокирован',
          [CUSTOMER_STATUS_REGISTRATION]: 'Не подтвержден',
        },
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
    ],
    fetchItemsFn,
    getItemsFn,
    updateItemsFn,
    createItemsFn,
  });
