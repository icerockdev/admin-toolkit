import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { computed, observable } from 'mobx';
import React from 'react';
import { SelectFilter } from '~/application/modules/pages/Feature/components/renderers/filters/SelectFilter';
import { observer } from 'mobx-react';
import { SelectInput } from '~/application/modules/pages/Feature/components/inputs/SelectInput';

export type SelectFieldOptions<T> = FeatureField<T>['options'] & {
  options?: Record<any, any>;
  autocomplete?: boolean;
};

export class SelectField<
  T extends Record<string, any> = Record<string, any>
> extends FeatureField<T> {
  constructor(
    name: FeatureField['name'],
    { options, autocomplete, ...props }: SelectFieldOptions<T>
  ) {
    super(name, props);

    if (options) this.variants = options;
    if (autocomplete) this.autocomplete = true;
  }

  @observable variants: Record<any, any> = {};
  @observable autocomplete = false;

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

  @computed
  get List() {
    return ({ value }: { value: any }) => <div>{this.listVariants[value]}</div>;
  }

  @computed
  get Update() {
    return (
      <SelectInput
        label={this.label}
        onChange={this.onChange}
        variants={this.filterVariants}
        value={this.readValue}
        error={this.editError}
        autocomplete={
          Object.keys(this.variants).length > 10 || this.autocomplete
        }
      />
    );
  }

  @observable
  Filter: FeatureField['Filter'] = observer(() => (
    <SelectFilter
      label={this.label}
      name={this.name}
      value={this.filterValue}
      onChange={this.onFilterChange}
      onReset={this.onFilterReset}
      variants={this.filterVariants}
      autocomplete={Object.keys(this.variants).length > 10 || this.autocomplete}
    />
  ));
}
