/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';
import { FeatureGetReadResult } from '~/application/modules/pages/Feature/types';

export function* controllerGetRead<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  const { feature } = controller;
  const id = controller.getIdFromUrl();

  try {
    feature.data.read = {};
    feature.data.isLoading = true;

    const result: FeatureGetReadResult<T> = yield feature.api.read(id);

    feature.data.read = result.data;
    feature.data.isLoading = false;
  } catch (e) {
    controller.feature.data.isLoading = false;
    controller.feature.parent?.notifications.showError(e.toString());
  }
}
