import { action, extendObservable, flow, observable } from 'mobx';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { CrudlGetListResult } from '~/application/modules/pages/CrudlEntity/types';

export class CrudlController<Fields = {}> {
  @observable instances: Record<string, CancellablePromise<any>> = {};

  constructor(public entity: CrudlEntity<Fields>) {
    extendObservable(this, { entity });
  }

  @action
  onListLoad = () => {
    this.instances.listLoader?.cancel();
    this.instances.listLoader = flow(getList)(this);
  };

  @action
  onActionChange = () => {
    this.onListLoad();
  };
}

function* getList<T extends Record<string, any>>(
  controller: CrudlController<T>
) {
  const { entity } = controller;

  try {
    entity.data.isLoading = true;
    const result: CrudlGetListResult<T> = yield controller.entity.api.getList();
    entity.data.list = result.data;
    entity.data.count = result.count;
  } catch (e) {
    controller.entity.parent?.notifications.showError(e.toString());
  } finally {
    controller.entity.data.isLoading = false;
  }
}
