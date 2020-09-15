import { observable } from 'mobx';
import { SortDir } from '~/application/modules/pages/CrudlEntity/types';

export class CrudlData<Fields = Record<string, any>> {
  @observable
  isLoading: boolean = true;

  @observable
  list?: Fields;

  @observable
  editor?: Record<number, Fields>;

  @observable
  sortBy?: string;

  @observable
  sortDir?: SortDir;
}
