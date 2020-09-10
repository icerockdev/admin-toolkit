import { extendObservable } from 'mobx';
import { CrudlFieldProps } from '~/application/modules/pages/CrudlEntity/types/field';

export class CrudlField<Fields, T extends keyof Fields> {
  constructor(
    public name: keyof Fields,
    public options: CrudlFieldProps<Fields[T]>
  ) {
    extendObservable(this, { name, options });
  }
}
