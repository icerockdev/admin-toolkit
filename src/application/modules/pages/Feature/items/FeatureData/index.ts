import { action, extendObservable, observable } from 'mobx';
import { FeatureDataReference } from '~/application/modules/pages/Feature/types/reference';
import { FeatureApiReferences } from '~/application/modules/pages/Feature/types';

export class FeatureData<
  Fields extends Record<string, any> = Record<string, any>
> {
  @observable references: Record<string, FeatureDataReference> = {};

  @observable isLoading: boolean = true;

  @observable list: Fields[] = [];
  @observable read: Partial<Record<keyof Fields, Fields[keyof Fields]>> = {};
  @observable editor: Partial<Record<keyof Fields, Fields[keyof Fields]>> = {};

  @observable errors: Partial<Record<keyof Fields, string>> = {};

  @action
  createReferenceData(refs: FeatureApiReferences<Fields> = {}) {
    // fills this.references with fields from Feature
    Object.keys(refs).forEach((ref) => {
      extendObservable(this.references, {
        [ref]: observable(new FeatureDataReference()),
      });
    });
  }

  @action
  clearReadData() {
    this.read = {};
  }

  @action
  clearEditorData() {
    this.editor = {};
  }

  @action
  copyReadToEditor() {
    this.isLoading = true;
    this.editor = Object.assign(this.editor, this.read);
    this.isLoading = false;
  }

  @action
  clearErrors() {
    this.errors = {};
  }

  @action
  clearError(field: keyof Fields) {
    this.errors = {
      ...this.errors,
      [field]: undefined,
    };
  }
}
