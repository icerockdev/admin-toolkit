import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';

export function* controllerGetReferences<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  const { feature } = controller;

  try {
    feature.data.read = {};
    yield feature.api.getReferencesAll();
  } catch (e) {
    controller.feature.data.isLoading = false;
    controller.feature.parent?.notifications.showError(e.toString());
  }
}
