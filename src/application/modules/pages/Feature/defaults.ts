/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureRenderer } from '~/application/modules/pages/Feature/items/FeatureRenderer';
import { FeatureFeatures } from '~/application/modules/pages/Feature/types';

export const FEATURE_DEFAULT_RENDERER = new FeatureRenderer();
export const FEATURE_DEFAULT_FEATURES: FeatureFeatures = {
  create: true,
  read: true,
  update: true,
  delete: true,
  list: true,
  export: false,
};
