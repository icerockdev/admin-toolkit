import { observable } from 'mobx';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlDataReference } from '~/application/modules/pages/CrudlEntity/types/reference';

export class CrudlData<
  Fields extends Record<string, any> = Record<string, any>
> {
  @observable references: Record<string, CrudlDataReference> = {};

  @observable isLoading: boolean = true;

  @observable list?: Fields[];
  @observable editor?: Record<number, Fields>;

  createReferenceData(refs: Record<string, any>) {
    Object.keys(refs).map(
      (ref) => (this.references[ref] = new CrudlDataReference())
    );
  }
}
