import { observable } from 'mobx';

export class CrudlData<Fields = Record<string, any>> {
  @observable isLoading: boolean = true;

  @observable list?: Fields[];

  @observable editor?: Record<number, Fields>;
}
