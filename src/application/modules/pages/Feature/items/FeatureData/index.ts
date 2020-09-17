import { extendObservable, observable } from 'mobx';
import { FeatureDataReference } from '~/application/modules/pages/Feature/types/reference';

export class FeatureData<
  Fields extends Record<string, any> = Record<string, any>
> {
  @observable references: Record<string, FeatureDataReference> = {};

  @observable isLoading: boolean = true;

  @observable list: Fields[] = [];
  @observable read: Partial<Fields> = {};

  @observable editor?: Record<number, Fields>;

  createReferenceData(refs: Record<string, any>) {
    Object.keys(refs).forEach((ref) => {
      extendObservable(this.references, {
        [ref]: observable(new FeatureDataReference()),
      });
    });
  }
}
