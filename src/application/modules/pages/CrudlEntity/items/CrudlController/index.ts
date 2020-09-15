import { action, extendObservable, flow, observable } from 'mobx';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CancellablePromise } from 'mobx/lib/api/flow';

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
  try {
    controller.entity.data.isLoading = true;
    controller.entity.data.list = yield controller.entity.api.getList();
  } catch (e) {
    controller.entity.parent?.notifications.showError(e.toString());
  } finally {
    controller.entity.data.isLoading = false;
  }
}
