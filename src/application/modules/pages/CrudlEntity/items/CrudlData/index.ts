import { extendObservable, observable } from 'mobx';
import { CrudlDataReference } from '~/application/modules/pages/CrudlEntity/types/reference';

type CrudlDataRead<T> = {
  id: any;
  data: Partial<T>;
};

export class CrudlData<
  Fields extends Record<string, any> = Record<string, any>
> {
  @observable references: Record<string, CrudlDataReference> = {};

  @observable isLoading: boolean = true;

  @observable list: Fields[] = [];
  @observable read: Partial<Fields> = {};

  @observable editor?: Record<number, Fields>;

  createReferenceData(refs: Record<string, any>) {
    Object.keys(refs).forEach((ref) => {
      extendObservable(this.references, {
        [ref]: observable(new CrudlDataReference()),
      });
    });
  }
}
