import React from 'react';
import { SelectField } from '~/application/modules/pages/Feature/components/fields/SelectField';
import { computed, observable } from 'mobx';
import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { observer } from 'mobx-react';
import { SelectInput } from '~/application/modules/pages/Feature/components/inputs/SelectInput';

export class ReferenceField<T extends Record<string, any>> extends SelectField<
  T
> {
  @observable autocomplete = true;

  @computed
  get isLoading() {
    return this.feature?.data.references[this.name].isLoadingAll || false;
  }

  @computed
  get listVariants() {
    return this.feature?.data.references[this.name].all || {};
  }

  @computed
  get List() {
    return observer(({ value }: { value: any }) => (
      <Placeholder isLoading={this.isLoading}>
        <div>{this.formatValue(value)}</div>
      </Placeholder>
    ));
  }

  @computed
  get Update() {
    return (
      <SelectInput
        label={this.label}
        onChange={this.onChange}
        variants={this.filterVariants}
        value={this.readValue}
        autocomplete={this.autocomplete}
        isLoadingReference={this.isLoading}
      />
    );
  }
}
