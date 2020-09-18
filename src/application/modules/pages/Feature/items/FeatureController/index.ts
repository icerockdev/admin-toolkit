import { action, extendObservable, flow, observable } from 'mobx';
import { Feature } from '~/application/modules/pages/Feature';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { controllerGetList } from '~/application/modules/pages/Feature/items/FeatureController/list';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { controllerGetRead } from '~/application/modules/pages/Feature/items/FeatureController/read';
import { controllerGetReferences } from '~/application/modules/pages/Feature/items/FeatureController/create';

export class FeatureController<
  T extends Record<string, any> = Record<string, any>
> {
  @observable instances: Record<string, CancellablePromise<any>> = {};

  constructor(public feature: Feature<T>) {
    extendObservable(this, { feature: feature });
  }

  @action
  loadList = () => {
    this.instances.listLoader?.cancel();
    this.instances.listLoader = flow(controllerGetList)(this);
  };

  @action
  loadRead = () => {
    this.cancelAll();
    this.instances.readLoader = flow(controllerGetRead)(this);
  };

  @action
  loadUpdate = () => {
    this.cancelAll();
    this.instances.readLoader = flow(controllerGetRead)(this);
  };

  @action
  loadCreate = () => {
    this.cancelAll();

    this.feature.data.read = {};
    this.feature.data.isLoading = false;

    // TODO: load all references here
    this.instances.createLoader = flow(controllerGetReferences)(this);
  };

  cancelAll = () => {
    Object.values(this.instances).forEach((instance) => {
      if (instance.cancel) instance.cancel();
    });
  };

  getIdFromUrl = () => {
    const re = new RegExp(
      `${this.feature.url.replace(/\//gim, '\\/')}\\\/([^/]+)`
    );

    const match = window.location.pathname.match(re);

    return parseInt(match && match.length > 0 ? match[1] : '', 10) || null;
  };

  @action
  onActionChange = () => {
    this.cancelAll();

    switch (this.feature.mode) {
      case FeatureMode.read:
        return this.loadRead();
      case FeatureMode.list:
        return this.loadList();
      case FeatureMode.update:
        return this.loadUpdate();
      case FeatureMode.create:
        return this.loadCreate();
      default:
        return;
    }
  };
}
