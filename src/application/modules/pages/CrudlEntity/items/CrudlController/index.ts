import { action, extendObservable, flow, observable } from 'mobx';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { controllerGetList } from '~/application/modules/pages/CrudlEntity/items/CrudlController/list';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types';

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
  loadRead = () => {
    this.instances.readLoader?.cancel();
    this.instances.readLoader = flow(controllerGetList)(this);
  };

  cancelAll = () => {
    Object.values(this.instances).forEach((instance) => {
      if (instance.cancel) instance.cancel();
    });
  };

  @action
  onActionChange = () => {
    this.cancelAll();

    switch (this.entity.mode) {
      case CrudlActionEnum.read:
        return this.loadRead();
      case CrudlActionEnum.list:
        return this.loadList();
      default:
        return;
    }
  };
}
