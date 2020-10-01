import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';
import api, { getRolesAll } from '~/example/feature/api';
import { FEATURE_FIELDS } from '~/example/feature/fields';

export type IFields = {
  id: number;
  name: string;
  age: number;
  role: number;
  status: number;
  birthDate: string;
  description: string;
};

export default new Feature<IFields>('Feature', '/feature', api, {
  getItemTitle: (data) => data.name,
  fields: FEATURE_FIELDS,
  references: {
    role: {
      url: '/test/',
      all: getRolesAll,
    },
  },
});
