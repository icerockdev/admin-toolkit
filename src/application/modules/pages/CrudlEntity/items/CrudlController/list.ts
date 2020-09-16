import { CrudlGetListResult } from '~/application/modules/pages/CrudlEntity/types';
import { CrudlController } from '~/application/modules/pages/CrudlEntity/items/CrudlController/index';

export function* controllerGetList<T extends Record<string, any>>(
  controller: CrudlController<T>
) {
  const { entity } = controller;

  try {
    entity.data.isLoading = true;

    const result: CrudlGetListResult<T> = yield entity.api.getList(entity);

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
