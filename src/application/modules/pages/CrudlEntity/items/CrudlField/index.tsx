import React, { FC } from 'react';
import { computed, extendObservable, observable } from 'mobx';
import {
  CrudlFieldListProps,
  CrudlFieldProps,
} from '~/application/modules/pages/CrudlEntity/types/field';
import { StringFilter } from '~/application/modules/pages/CrudlEntity/components/renderers/filters/StringFilter';
import { CrudlFilterComponentProps } from '~/application/modules/pages/CrudlEntity/types/filters';

export class CrudlField<T extends Record<string, any> = Record<string, any>> {
  constructor(
    public name: string,
    public options: CrudlFieldProps<T[keyof T]>
  ) {
    extendObservable(this, { name, options });

    if (options.features?.list) this.showInList = options.features.list;
    if (options.allowEmptyFilter)
      this.allowEmptyFilter = options.allowEmptyFilter;
  }

  @observable public showInList = true;
  @observable public listColumnSize = '10%';
  @observable public allowEmptyFilter = false;

  @computed
  get label() {
    return this.options.label || this.name;
  }

  @computed
  get key() {
    return this.name;
  }

  public asString(val: any) {
    return val.toString();
  }

  @observable
  public List: FC<CrudlFieldListProps> = ({ value }) => <div>{value}</div>;

  @observable
  public ListHead: FC = () => <div>{this.label}</div>;

  @observable
  public Filter: FC<CrudlFilterComponentProps> = StringFilter;
}
