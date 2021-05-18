/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureField } from '../../../application/modules/pages/Feature/fields/FeatureField';
import { IFields } from './index';
import { DateField } from '../../../application/modules/pages/Feature/fields/DateField';
import { IntegerField } from '../../../application/modules/pages/Feature/fields/IntegerField';
import { SelectField } from '../../../application/modules/pages/Feature/fields/SelectField';
import { ReferenceField } from '../../../application/modules/pages/Feature/fields/ReferenceField';
import { StringField } from '../../../application';

export const FEATURE_FIELDS = [
  new FeatureField<IFields, string>('name', {
    label: 'Имя',
    features: {
      sort: true,
      filter: false,
    },
  }),
  new IntegerField<IFields>('age', {
    label: 'Возраст',
    accuracy: 2,
    features: {
      sort: true,
      filter: true,
    },
    defaultValue: 21,
  }),
  new ReferenceField<IFields, number>('role', {
    label: 'Роль',
    features: {
      sort: true,
      filter: true,
    },
    dependencies: ['age'],
  }),
  new SelectField<IFields, number>('status', {
    label: 'Статус',
    options: {
      10: 'Активен',
      20: 'Неактивен',
      30: 'Заблокирован',
    },
    features: {
      sort: true,
      filter: true,
    },
  }),
  new DateField<IFields>('birthDate', {
    label: 'Дата рождения',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new FeatureField<IFields, string>('description', {
    label: 'Описание',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new IntegerField<IFields>('index', {
    path: ['nested'],
    label: 'Nested index',
  }),
  new StringField<IFields>('value', {
    path: ['nested'],
    label: 'Nested value',
  }),
];
