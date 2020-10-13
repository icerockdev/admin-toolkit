import React from 'react';
import { SelectField } from '~/application/modules/pages/Feature/fields/SelectField';
import { computed, observable } from 'mobx';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { observer } from 'mobx-react';
import { SelectInput } from '~/application/modules/pages/Feature/components/inputs/SelectInput';

export class ReferenceField<
  T extends Record<string, any> = Record<string, any>,
  V extends string | number = string
> extends SelectField<T, V> {
  @observable autocomplete = true;

  @computed
  get isLoading() {
    return this.feature?.data.references[this.name].isLoadingAll || false;
  }

  @computed
  get listVariants() {
    return this.feature?.data.references[this.name].all || {};
  }

  // @computed
  // get List() {
  //   return observer(({ value }: { value: any }) => (
  //     <Placeholder isLoading={this.isLoading}>
  //       <div>{this.formatValue(value)}</div>
  //     </Placeholder>
  //   ));
  // }

  @computed
  get Update() {
    return (
      <SelectInput
        label={this.label}
        onChange={this.onChange}
        variants={this.filterVariants}
        value={this.editValue}
        autocomplete={this.autocomplete}
        isLoadingReference={this.isLoading}
        isLoading={this.feature?.data.isLoading}
        error={this.editError}
      />
    );
  }
}
