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
  constructor(public feature: Feature<T>) {
    extendObservable(this, { feature });
  }

  /**
   * Map for all currently running async fetchers
   */
  @observable instances: Record<string, CancellablePromise<any>> = {};

  /**
   * Loads list of items
   */
  @action
  loadList = () => {
    this.instances.listLoader?.cancel();
    this.instances.listLoader = flow(controllerGetList)(this);
  };

  /**
   * Loads data of currently viewing item
   */
  @action
  loadRead = () => {
    this.cancelAll();
    this.instances.readLoader = flow(controllerGetRead)(this);
  };

  /**
   * Loads data of currently editing item
   */
  @action
  loadUpdate = () => {
    this.cancelAll();
    this.feature.data.clearErrors();
    this.instances.readLoader = flow(controllerGetRead)(this);
    this.instances.readLoader.then(() => this.feature.data.copyReadToEditor());
  };

  /**
   * Clears current data and loading references on create form
   */
  @action
  loadCreate = () => {
    this.cancelAll();

    this.feature.data.clearReadData();
    this.feature.data.clearEditorData();
    this.feature.data.clearErrors();

    this.feature.data.isLoading = false;

    this.instances.createLoader = flow(controllerGetReferences)(this);
  };

  /**
   * Cancels all currently loading functions
   */
  cancelAll = () => {
    Object.values(this.instances).forEach((instance) => {
      if (instance.cancel) instance.cancel();
    });
  };

  /**
   * Returns id of currently editing / viewing item
   */
  getIdFromUrl = () => {
    const re = new RegExp(
      `${this.feature.url.replace(/\//gim, '\\/')}\\\/([^/]+)`
    );

    const match = window.location.pathname.match(re);

    return parseInt(match && match.length > 0 ? match[1] : '', 10);
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

  @action
  submitItem = () => {
    if (this.feature.data.isLoading) return;

    this.cancelAll();

    const validation = this.validateFields();

    if (validation) {
      this.feature.data.errors = validation;
    }

    // TODO: call update / create method
  };

  validateFields = (): Partial<Record<keyof T, string>> | undefined => {
    const fields = this.feature.fieldsOfCurrentMode
      .filter((field) => field.validator)
      .reduce((acc, field) => {
        if (!field.validator) return acc;

        const error = field.validator(field.editValue, field);

        if (!error) return acc;

        return { ...acc, [field.name]: error };
      }, {});

    return Object.keys(fields).length > 0 ? fields : undefined;
  };
}
