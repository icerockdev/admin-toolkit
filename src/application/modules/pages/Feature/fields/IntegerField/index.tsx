import { FeatureField } from '~/application/modules/pages/Feature/fields/FeatureField';
import { observable } from 'mobx';
import React from 'react';

export type IntegerFieldOptions<T, V> = FeatureField<T, V>['options'] & {
  filterExact?: boolean;
  accuracy?: number;
  preserveZero?: boolean;
};

export class IntegerField<
  T extends Record<string, any> = Record<string, any>
> extends FeatureField<T, number> {
  constructor(
    name: FeatureField['name'],
    {
      filterExact,
      accuracy,
      preserveZero,
      ...options
    }: IntegerFieldOptions<T, number>
  ) {
    super(name, options);

    if (filterExact) this.filterExact = filterExact;
    if (accuracy) this.accuracy = accuracy;
    if (preserveZero) this.preserveZero = preserveZero;
  }

  @observable filterExact = false;
  @observable accuracy = 1;
  @observable preserveZero = false;
  @observable defaultValue: number = 0;

  formatValue(val: any): number {
    return this.preserveZero
      ? val.toFixed(this.accuracy)
      : parseFloat(val.toFixed(this.accuracy));
  }

  asString(val: string) {
    return this.formatValue(val);
  }

  @observable
  List: FeatureField['List'] = ({ value }) => (
    <div>{(value && this.formatValue(value)) || ''}</div>
  );
}
