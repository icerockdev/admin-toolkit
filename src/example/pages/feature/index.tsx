/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { Feature } from '~/application';
import {
  createFeature,
  deleteFeature,
  getFeature,
  getFeatureList,
  getRolesAll,
  updateFeature,
} from './api';
import { FEATURE_FIELDS } from './fields';

export type IFields = {
  id: number;
  name: string;
  age: number;
  role: number;
  status: number;
  birthDate: string;
  description: string;
  nested: {
    index: number;
    value: string;
  };
};

export default new Feature<IFields>('Experimental: Feature', '/feature', {
  getItemTitle: (data) => data.name,
  fields: FEATURE_FIELDS,
  api: {
    methods: {
      list: getFeatureList,
      read: getFeature,
      create: createFeature,
      update: updateFeature,
      delete: deleteFeature,
    },
    urls: {
      list: '/test',
    },
    references: {
      role: {
        url: '/test/',
        all: getRolesAll,
      },
    },
  },
});
