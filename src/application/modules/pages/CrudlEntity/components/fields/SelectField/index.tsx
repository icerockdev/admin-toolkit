import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { computed, observable } from 'mobx';
import React from 'react';
import { SelectFilter } from '~/application/modules/pages/CrudlEntity/components/renderers/filters/SelectFilter';

export type SelectFieldOptions = CrudlField['options'] & {
  options?: Record<any, any>;
  autocomplete?: boolean;
};

export class SelectField<
  T extends Record<string, any> = Record<string, any>
> extends CrudlField<T> {
  constructor(
    name: CrudlField['name'],
    { options, autocomplete, ...props }: SelectFieldOptions
  ) {
    super(name, props);

    if (options) this.variants = options;
    if (!autocomplete) this.autocomplete = false;
  }

  @observable variants: Record<any, any> = {};
  @observable autocomplete = true;

  @computed
  get listVariants() {
    return this.variants;
  }

  @computed
  get filterVariants() {
    return this.listVariants;
  }

  formatValue(val: any): any {
    return Object.prototype.hasOwnProperty.call(this.listVariants, val)
      ? this.listVariants[val]
      : val;
  }

  asString(val: string) {
    return this.formatValue(val);
  }

  @observable
  List: CrudlField['List'] = ({ value }) => (
    <div>{this.listVariants[value]}</div>
  );

  @observable
  Filter: CrudlField['Filter'] = ({ value, onReset, onChange }) => (
    <SelectFilter
      label={this.label}
      name={this.name}
      value={value}
      onChange={onChange}
      onReset={onReset}
      variants={this.filterVariants}
      autocomplete={this.autocomplete}
    />
  );
}
