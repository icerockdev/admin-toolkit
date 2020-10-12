import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';

/**
 * Fills features' editor data with default values
 */
export function controllerSeedData<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  const initialData = controller.feature.fieldsOfCurrentMode.reduce(
    (acc, field) =>
      typeof field.defaultValue === 'undefined'
        ? acc
        : { ...acc, [field.name]: field.defaultValue },
    {}
  );

  controller.feature.data.editor = initialData;
}
