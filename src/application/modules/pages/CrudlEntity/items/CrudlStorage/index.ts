import { observable } from 'mobx';

export class CrudlStorage<Fields = {}> {
  @observable
  isLoading: boolean = true;

  @observable
  list?: Fields;

  @observable
  editor?: Record<number, Fields>;
}
