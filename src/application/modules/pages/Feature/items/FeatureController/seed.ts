/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';
import { assocPath, hasPath } from 'ramda';

/**
 * Fills features' editor data with default values
 */
export function controllerSeedData<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  const initialData = controller.feature.fieldsOfCurrentMode.reduce(
    (acc, field) => {
      // Set default value
      if (typeof field.defaultValue !== 'undefined')
        return <T>assocPath(field.fieldPath, field.defaultValue)(acc);

      const path = field.fieldPath.slice(0, field.fieldPath.length - 1);

      // Reacreate empty path structure
      if (field.fieldPath.length > 1 && !hasPath(path, acc))
        return <T>assocPath(path, {})(acc);

      // Don't change anything
      return acc;
    },
    {} as T
  );

  controller.feature.data.editor = initialData;
}
