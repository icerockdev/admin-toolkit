import { action, extendObservable, flow, observable } from 'mobx';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { controllerGetList } from '~/application/modules/pages/CrudlEntity/items/CrudlController/list';

export class CrudlController<
  T extends Record<string, any> = Record<string, any>
> {
  @observable instances: Record<string, CancellablePromise<any>> = {};

  constructor(public entity: CrudlEntity<T>) {
    extendObservable(this, { entity });
  }

  @action
  loadList = () => {
    this.instances.listLoader?.cancel();
    this.instances.listLoader = flow(controllerGetList)(this);
  };

  @action
  onActionChange = () => {
    this.loadList();
  };
}
