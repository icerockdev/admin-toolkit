import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';
import api, { getRolesAll } from '~/example/base/api';
import { BASE_FIELDS } from '~/example/base/fields';

export type IFields = {
  id: number;
  name: string;
  age: number;
  role: number;
  status: number;
  birthDate: string;
  description: string;
};

export default new Feature<IFields>('Base', '/base', api, {
  getItemTitle: (data) => data.name,
  fields: BASE_FIELDS,
  references: {
    role: {
      url: '/test/',
      all: getRolesAll,
    },
  },
});
