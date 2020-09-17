import React, { FC } from 'react';
import { action, computed, extendObservable, observable } from 'mobx';
import {
  FeatureFieldListProps,
  FeatureFieldProps,
} from '~/application/modules/pages/Feature/types/field';
import { StringFilter } from '~/application/modules/pages/Feature/components/renderers/filters/StringFilter';
import { FeatureFilterComponentProps } from '~/application/modules/pages/Feature/types/filters';
import { Feature } from '~/application/modules/pages/Feature';
import { has } from 'ramda';
import { StringInput } from '~/application/modules/pages/Feature/components/inputs/StringInput';

export class FeatureField<T extends Record<string, any> = Record<string, any>> {
  constructor(
    public name: string,
    public options: FeatureFieldProps<T[keyof T]>
  ) {
    extendObservable(this, { name, options });

    if (has('read', options.features))
      this.showInRead = !!options.features?.read;

    if (has('list', options.features))
      this.showInList = !!options.features?.list;

    if (options.allowEmptyFilter)
      this.allowEmptyFilter = options.allowEmptyFilter;
  }

  @observable protected feature?: Feature<T>;

  @observable public showInList = true;
  @observable public showInRead = true;

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
  public useFeature(feature: Feature<T>) {
    this.feature = feature;
  }

  public asString(val: any) {
    return val.toString();
  }

  public asFilter(val: any) {
    return val;
  }

  public onChange = (val: any) => {
    if (!this.feature?.data.read) return;

    this.feature.data.read[this.name] = val;
  };

  @observable
  public List: FC<FeatureFieldListProps> = ({ value }) => <div>{value}</div>;

  @observable
  public ListHead: FC = () => <div>{this.label}</div>;

  @computed
  public get Read() {
    return this.List;
  }

  public Update = ({ value }: { value: any }) => (
    <StringInput value={value} onChange={this.onChange} label={this.label} />
  );

  @computed get Create() {
    return this.Update;
  }

  @observable
  public Filter: FC<
    Pick<FeatureFilterComponentProps, 'value' | 'onReset' | 'onChange'>
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
