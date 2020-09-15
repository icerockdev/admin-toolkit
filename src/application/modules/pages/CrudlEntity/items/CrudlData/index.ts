import { observable } from 'mobx';
import { SortDir } from '~/application/modules/pages/CrudlEntity/types';

export class CrudlData<Fields = Record<string, any>> {
  @observable isLoading: boolean = true;

  @observable list?: Fields[];
  @observable count: number = 0;
  @observable rows: number = 25;
  @observable rowsSelectOptions: number[] = [10, 25, 50, 100, 200];
  @observable page: number = 0;
  @observable sortBy?: string;
  @observable sortDir?: SortDir;

  @observable editor?: Record<number, Fields>;
}
