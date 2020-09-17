import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';
import { FeatureGetReadResult } from '~/application/modules/pages/Feature/types';

export function* controllerGetRead<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  const { entity } = controller;
  const id = controller.getIdFromUrl();

  console.log('clearing');

  try {
    entity.data.read = {};
    entity.data.isLoading = true;

    const result: FeatureGetReadResult<T> = yield entity.api.getRead(
      entity,
      id
    );

    entity.data.read = result.data;

    controller.entity.data.isLoading = false;

    // TODO: make controllerGetReferencesList to fetch values based on actual data
    yield entity.api.getReferencesAll(controller);
  } catch (e) {
    controller.entity.data.isLoading = false;
    controller.entity.parent?.notifications.showError(e.toString());
  }
}
