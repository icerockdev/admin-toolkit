import React, { FC } from 'react';
import { action, computed, extendObservable, observable } from 'mobx';
import {
  CrudlFieldListProps,
  CrudlFieldProps,
} from '~/application/modules/pages/CrudlEntity/types/field';
import { StringFilter } from '~/application/modules/pages/CrudlEntity/components/renderers/filters/StringFilter';
import { CrudlFilterComponentProps } from '~/application/modules/pages/CrudlEntity/types/filters';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';

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

  @observable protected entity?: CrudlEntity<T>;

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

  @action
  public useEntity(entity: CrudlEntity<T>) {
    this.entity = entity;
  }

  public asString(val: any) {
    return val.toString();
  }

  @observable
  public List: FC<CrudlFieldListProps> = ({ value }) => <div>{value}</div>;

  @observable
  public ListHead: FC = () => <div>{this.label}</div>;

  @observable
  public Filter: FC<
    Pick<CrudlFilterComponentProps, 'value' | 'onReset' | 'onChange'>
  > = ({ value, onReset, onChange }) => (
    <StringFilter
      value={value}
      name={this.name}
      label={this.label}
      onChange={onChange}
      onReset={onReset}
    />
  );
}
