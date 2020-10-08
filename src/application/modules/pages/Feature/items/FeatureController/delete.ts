import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';

export function* controllerDelete<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  try {
    controller.feature.data.isLoading = true;
    const id = controller.getIdFromUrl();
    yield controller.feature.api.delete(id);
    controller.feature.data.isLoading = false;
    controller.feature.goToList();
  } catch (e) {
    controller.feature.data.isLoading = false;
    controller.feature.parent?.notifications.showError(e.toString());
  }
}
