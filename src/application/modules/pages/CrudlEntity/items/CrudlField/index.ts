import { extendObservable, observable } from 'mobx';
import { CrudlFieldProps } from '~/application/modules/pages/CrudlEntity/types/field';

export class CrudlField<T extends Record<string, any>> {
  @observable
  showInList = true;

  constructor(
    public name: keyof T,
    public options: CrudlFieldProps<T[keyof T]>
  ) {
    extendObservable(this, { name, options });

    if (options.features?.list) this.showInList = options.features.list;
  }
}
