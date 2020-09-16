import { action, extendObservable, flow, observable } from 'mobx';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { controllerGetList } from '~/application/modules/pages/CrudlEntity/items/CrudlController/list';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types';
import { useMemo } from 'react';

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
  loadRead = (id: any) => {
    this.instances.readLoader?.cancel();
    this.instances.readLoader = flow(controllerGetList)(this);
  };

  cancelAll = () => {
    Object.values(this.instances).forEach((instance) => {
      if (instance.cancel) instance.cancel();
    });
  };

  getIdFromUrl = () => {
    const re = new RegExp(
      `${this.entity.url.replace(/\//gim, '\\/')}\\\/([^/]+)`
    );
    const match = window.location.pathname.match(re);

    return parseInt((match && match[1]) || '', 10) || null;
  };

  @action
  onActionChange = () => {
    this.cancelAll();

    switch (this.entity.mode) {
      case CrudlActionEnum.read:
        const id = this.getIdFromUrl();
        return this.loadRead(id);
      case CrudlActionEnum.list:
        return this.loadList();
      default:
        return;
    }
  };
}
