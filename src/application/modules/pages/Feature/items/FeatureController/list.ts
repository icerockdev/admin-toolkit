import { FeatureGetListResult } from '~/application/modules/pages/Feature/types';
import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';

export function* controllerGetList<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  const { entity } = controller;

  try {
    entity.data.isLoading = true;

    const result: FeatureGetListResult<T> = yield entity.api.getList(entity);

    entity.data.list = result.data;
    entity.filters.count = result.count;

    controller.entity.data.isLoading = false;

    // TODO: make controllerGetReferencesList to fetch values based on actual data
    yield entity.api.getReferencesAll(controller);
  } catch (e) {
    controller.entity.data.isLoading = false;
    controller.entity.parent?.notifications.showError(e.toString());
  }
}
