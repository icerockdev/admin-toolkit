import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController/index';
import { FeaturePostCreateResult } from '~/application/modules/pages/Feature/types';
import { toJS } from 'mobx';

export function* controllerPostCreate<
  T extends Record<string, any> = Record<string, any>
>(controller: FeatureController<T>) {
  const { feature } = controller;

  try {
    feature.data.isLoading = true;

    const {
      data,
      errors,
    }: FeaturePostCreateResult<T> = yield feature.api.create(
      toJS(feature.data.editorDataForCurrentMode)
    );

    if (errors) {
      feature.data.errors = errors;
      return;
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
