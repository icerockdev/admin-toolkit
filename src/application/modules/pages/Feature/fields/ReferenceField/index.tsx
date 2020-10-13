import React from 'react';
import {
  SelectField,
  SelectFieldOptions,
} from '~/application/modules/pages/Feature/fields/SelectField';
import { action, computed, observable, reaction } from 'mobx';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { observer } from 'mobx-react';
import { SelectInput } from '~/application/modules/pages/Feature/components/inputs/SelectInput';

export type ReferenceFieldOptions<
  T,
  V extends string | number = string
> = SelectFieldOptions<T, V> & {
  dependencies?: Array<string>;
};

export class ReferenceField<
  T extends Record<string, any> = Record<string, any>,
  V extends string | number = string
> extends SelectField<T, V> {
  constructor(
    public name: string,
    public options: ReferenceFieldOptions<T, V>
  ) {
    super(name, options);

    if (options.dependencies) {
      reaction(() => this.dependencyValues, this.updateRefs.bind(this));
    }
  }

  @observable autocomplete = true;

  @computed
  get isLoading() {
    return this.feature?.data.references[this.name]?.isLoadingAll || false;
  }

  @computed
  get listVariants() {
    return this.feature?.data.references[this.name]?.all || {};
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
        value={this.editValue}
        autocomplete={this.autocomplete}
        isLoadingReference={this.isLoading}
        isLoading={this.feature?.data.isLoading}
        error={this.editError}
        disabled={this.disabledByDependencies}
      />
    );
  }

  @computed
  get disabledByDependencies() {
    return this.options.dependencies?.some(
      (field) => !this.feature?.data.editor[field]
    );
  }

  @action
  updateRefs() {
    if (!this.options.dependencies || !this.feature?.api) return;
    this.feature.api.getReference(this.name);
  }

  @computed
  get dependencyValues() {
    return this.options.dependencies?.map(
      (field) => this.feature?.data.editor[field]
    );
  }
}
