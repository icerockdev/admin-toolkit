/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity, IEntityField } from '~/application';
import i18n from "~/i18n";

export const SAMPLE_ENTITY_FIELDS: IEntityField[] = [
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
    required: true
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
    name: 'text',
    label: 'Текст',
    sortable: true,
    type: 'textarea',
    title: true,
    hideInCreate: true,
    hideInList: true,
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
    filterable: true,
    type: 'datetime',
  },
  {
    name: 'dateRange',
    label: 'Период с двумя датами (от и до)',
    sortable: true,
    filterable: true,
    type: 'daterange',
    hideInCreate: true,
    hideInEdit: true,
    hideInExport: true,
    hideInList: true,
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
    validator: (val: string) => (String(val) === '1' ? '' : i18n.t('custom:Should be 1')),
    options: {
      accuracy: 4,
    },
  },
  {
    type: 'number',
    name: 'number2',
    label: 'Количество (0-5)',
    sortable: true,
    validator: (val: number) => val < 0 || val > 5 ? i18n.t('custom:Must be between 0 and 5') : '',
    options: {
      accuracy: 4,
    },
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'string',
    title: true,
    hideInCreate: true,
  },
  {
    name: 'passwordRepeat',
    label: 'Повтор пароля',
    type: 'string',
    title: true,
    hideInCreate: true,
    validator: (val: string, entity: Entity) => (entity.editorData['password'] !== val ? i18n.t('custom:Passwords must match') : ''),
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
