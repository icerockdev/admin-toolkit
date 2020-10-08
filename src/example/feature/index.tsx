import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';
import {
  createFeature,
  getFeature,
  getFeatureList,
  getRolesAll,
  updateFeature,
} from '~/example/feature/api';
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

export default new Feature<IFields>('Feature', '/feature', {
  getItemTitle: (data) => data.name,
  fields: FEATURE_FIELDS,
  api: {
    methods: {
      list: getFeatureList,
      read: getFeature,
      create: createFeature,
      update: updateFeature,
    },
    urls: {
      list: '/test',
      read: '/test',
      create: '/test',
      update: '/test',
    },
    references: {
      role: {
        url: '/test/',
        all: getRolesAll,
      },
    },
  },
});
