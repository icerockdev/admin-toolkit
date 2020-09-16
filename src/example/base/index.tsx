import React from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import api, { getRolesAll } from '~/example/base/api';
import { BASE_FIELDS } from '~/example/base/fields';

export type IFields = {
  id: number;
  name: string;
  age: number;
  role: string;
  status: number;
  birthDate: string;
  description: string;
};

export default new CrudlEntity<IFields>('Base', '/base', api, {
  fields: BASE_FIELDS,
  references: {
    roles: {
      url: '/test/',
      all: getRolesAll,
    },
  },
});
