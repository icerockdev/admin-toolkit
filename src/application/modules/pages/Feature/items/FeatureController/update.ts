import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';
import { FeaturePostUpdateResult } from '~/application/modules/pages/Feature/types';
import { toJS } from 'mobx';

export function* controllerPostUpdate<
  T extends Record<string, any> = Record<string, any>
>(controller: FeatureController<T>) {
  const { feature } = controller;

  try {
    feature.data.isLoading = true;
    const id = controller.getIdFromUrl();

    const {
      data,
      errors,
      error,
    }: FeaturePostUpdateResult<T> = yield feature.api.update(
      id,
      toJS(feature.data.editor)
    );

    if (errors) {
      feature.data.errors = errors;
      return;
    }

    if (error) {
      throw new Error(error);
    }

    feature.data.isLoading = false;

    if (typeof feature.getItemId(data) !== 'undefined') {
      feature.goToRead(feature.getItemId(data));
    } else {
      feature.goToList();
    }

    feature.data.clearEditorData();
  } catch (e) {
    controller.feature.data.isLoading = false;
    controller.feature.parent?.notifications.showError(e.toString());
  }
}