import { computed, extendObservable, observable } from 'mobx';
import {
  CrudlFieldListProps,
  CrudlFieldProps,
} from '~/application/modules/pages/CrudlEntity/types/field';
import React, { FC } from 'react';

export class CrudlField<T extends Record<string, any> = Record<string, any>> {
  @observable
  showInList = true;

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

  @observable
  List: FC<CrudlFieldListProps> = ({ value }) => <div>{value}</div>;

  @observable
  ListHead: FC = () => <div>{this.label}</div>;
}
