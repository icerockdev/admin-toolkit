import { action, extendObservable, observable } from 'mobx';
import { FeatureDataReference } from '~/application/modules/pages/Feature/types/reference';

export class FeatureData<
  Fields extends Record<string, any> = Record<string, any>
> {
  @observable references: Record<string, FeatureDataReference> = {};

  @observable isLoading: boolean = true;

  @observable list: Fields[] = [];
  @observable read: Partial<Fields> = {};

  @observable editor?: Record<number, Fields>;

  @action
  createReferenceData(refs: Record<string, any>) {
    // fills this.references with fields from Feature
    Object.keys(refs).forEach((ref) => {
      extendObservable(this.references, {
        [ref]: observable(new FeatureDataReference()),
      });
    });
  }

  @action
  clearEditorData() {
    this.editor = {};
  }
}
