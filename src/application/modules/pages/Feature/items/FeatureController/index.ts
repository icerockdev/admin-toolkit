import { action, extendObservable, flow, observable } from 'mobx';
import { Feature } from '~/application/modules/pages/Feature';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { controllerGetList } from '~/application/modules/pages/Feature/items/FeatureController/list';
import { FeatureAction } from '~/application/modules/pages/Feature/types';
import { useMemo } from 'react';

export class FeatureController<
  T extends Record<string, any> = Record<string, any>
> {
  @observable instances: Record<string, CancellablePromise<any>> = {};

  constructor(public entity: Feature<T>) {
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
      case FeatureAction.read:
        const id = this.getIdFromUrl();
        return this.loadRead(id);
      case FeatureAction.list:
        return this.loadList();
      default:
        return;
    }
  };
}
