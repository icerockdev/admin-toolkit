import React, { FC } from 'react';
import { computed, extendObservable, observable } from 'mobx';
import {
  CrudlFieldListProps,
  CrudlFieldProps,
} from '~/application/modules/pages/CrudlEntity/types/field';

export class CrudlField<T extends Record<string, any> = Record<string, any>> {
  @observable
  public showInList = true;

  @observable
  public listColumnSize = '10%';

  constructor(
    public name: string,
    public options: CrudlFieldProps<T[keyof T]>
  ) {
    extendObservable(this, { name, options });

    if (options.features?.list) this.showInList = options.features.list;
  }

  @computed
  get label() {
    return this.options.label || this.name;
  }

  @computed
  get key() {
    return this.name;
  }

  @observable
  public List: FC<CrudlFieldListProps> = ({ value }) => <div>{value}</div>;

  @observable
  public ListHead: FC = () => <div>{this.label}</div>;

  public asString(val: any) {
    return val.toString();
  }
}
