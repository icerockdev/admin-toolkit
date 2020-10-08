import { FeatureGetListResult } from '~/application/modules/pages/Feature/types';
import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';

export function* controllerGetList<T extends Record<string, any>>(
  controller: FeatureController<T>
) {
  const { feature } = controller;

  try {
    feature.data.isLoading = true;

    const result: FeatureGetListResult<T> = yield feature.api.getList(feature);

    feature.data.list = result.data;
    feature.filters.count = result.count;

    controller.feature.data.isLoading = false;

    // TODO: make controllerGetReferencesList to fetch values based on actual data
    yield feature.api.getReferencesAll();
  } catch (e) {
    controller.feature.data.isLoading = false;
    controller.feature.parent?.notifications.showError(e.toString());
  }
}
