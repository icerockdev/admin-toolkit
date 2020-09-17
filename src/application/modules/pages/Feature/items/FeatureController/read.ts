import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';
import { FeatureGetReadResult } from '~/application/modules/pages/Feature/types';

export function* controllerGetRead<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  console.log('getting read?!!');

  const { feature } = controller;
  const id = controller.getIdFromUrl();

  try {
    feature.data.read = {};
    feature.data.isLoading = true;

    const result: FeatureGetReadResult<T> = yield feature.api.getRead(
      feature,
      id
    );

    feature.data.read = result.data;

    controller.feature.data.isLoading = false;

    // TODO: make controllerGetReferencesList to fetch values based on actual data
    yield feature.api.getReferencesAll(controller);
  } catch (e) {
    controller.feature.data.isLoading = false;
    controller.feature.parent?.notifications.showError(e.toString());
  }
}
