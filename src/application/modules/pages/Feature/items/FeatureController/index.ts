import { action, extendObservable, flow, observable } from 'mobx';
import { Feature } from '~/application/modules/pages/Feature';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { controllerGetList } from '~/application/modules/pages/Feature/items/FeatureController/list';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { controllerGetRead } from '~/application/modules/pages/Feature/items/FeatureController/read';
import { controllerGetReferences } from '~/application/modules/pages/Feature/items/FeatureController/references';
import { controllerPostCreate } from '~/application/modules/pages/Feature/items/FeatureController/create';
import { controllerPostUpdate } from '~/application/modules/pages/Feature/items/FeatureController/update';
import { controllerDelete } from '~/application/modules/pages/Feature/items/FeatureController/delete';

export class FeatureController<
  T extends Record<string, any> = Record<string, any>
> {
  constructor(public feature: Feature<T>) {
    extendObservable(this, { feature });
  }

  /**
   * Map for all currently running async fetchers, that can be cancelled by
   * calling item.cancel() or this.cancelAll()
   */
  @observable
  instances: Record<string, CancellablePromise<any>> = {};

  /**
   * Loads list of items
   */
  @action
  list = () => {
    this.cancelAll();
    this.instances.listLoader = flow(controllerGetList)(this);
  };

  /**
   * Loads data of currently viewing item
   */
  @action
  read = () => {
    this.cancelAll();
    this.instances.read = flow(controllerGetRead)(this);
  };

  /**
   * Loads data of currently editing item
   */
  @action
  update = () => {
    this.cancelAll();
    this.feature.data.clearErrors();
    this.instances.update = flow(controllerGetRead)(this);
    this.instances.update.then(() => this.feature.data.copyReadToEditor());
  };

  /**
   * Clears current data and loading references on create form
   */
  @action
  create = () => {
    this.cancelAll();

    this.feature.data.clearReadData();
    this.feature.data.clearEditorData();
    this.feature.data.clearErrors();

    this.feature.data.isLoading = false;

    this.instances.create = flow(controllerGetReferences)(this);
  };

  /**
   * Deletes current item
   */
  @action
  delete = () => {
    flow(controllerDelete)(this);
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

  /**
   * Called on action (list, read, update, create) change
   */
  @action
  onActionChange = () => {
    this.cancelAll();

    switch (this.feature.mode) {
      case FeatureMode.read:
        return this.read();
      case FeatureMode.list:
        return this.list();
      case FeatureMode.update:
        return this.update();
      case FeatureMode.create:
        return this.create();
      default:
        return;
    }
  };

  /**
   * Called on submit of editor / creator. Handles validation and launching submitting function for each mode
   */
  @action
  submitItem = () => {
    if (this.feature.data.isLoading) return;

    this.cancelAll();

    const validation = this.validateFields();

    if (validation) {
      this.feature.data.errors = validation;
    }

    switch (this.feature.mode) {
      case FeatureMode.create:
        this.instances.create = flow(controllerPostCreate)(this);
        break;
      case FeatureMode.update:
        this.instances.create = flow(controllerPostUpdate)(this);
        break;
    }
  };

  /**
   * Returns list of validation errors for currently visible fields
   */
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
