import React, { FC } from 'react';
import { action, computed, extendObservable, observable } from 'mobx';
import {
  FeatureFieldFeature,
  FeatureFieldListProps,
  FeatureFieldProps,
} from '~/application/modules/pages/Feature/types/field';
import { StringFilter } from '~/application/modules/pages/Feature/filters/StringFilter';
import { Feature } from '~/application/modules/pages/Feature';
import {
  assocPath,
  dissocPath,
  equals,
  has,
  lensPath,
  omit,
  reject,
  view,
} from 'ramda';
import { StringInput } from '~/application/modules/pages/Feature/components/inputs/StringInput';
import { observer } from 'mobx-react';
import { FeatureFeature } from '~/application/modules/pages/Feature/types';

export class FeatureField<
  T extends Record<string, any> = Record<string, any>,
  V extends any = any
> {
  constructor(
    public name: string,
    public options: FeatureFieldProps<T, V> = {}
  ) {
    extendObservable(this, { name, options });

    if (options.features) {
      this.features = {
        ...this.features,
        ...options.features,
      };
    }

    if (options.validator) {
      this.validator = options.validator;
    }

    if (options.allowEmptyFilter)
      this.allowEmptyFilter = options.allowEmptyFilter;

    if (options.roles) this.roles = options.roles;
    if (options.permissions) this.permissions = options.permissions;
    if (options.defaultValue) this.defaultValue = options.defaultValue;
    if (options.path) this.path = options.path;
  }

  @observable public path: string[] = [];
  @observable protected feature?: Feature<T>;

  @observable roles?: FeatureFieldProps<T, V>['roles'];
  @observable permissions?: FeatureFieldProps<T, V>['permissions'];

  @observable public listColumnSize = '200px';
  @observable public allowEmptyFilter = false;
  @observable public features: Record<FeatureFieldFeature, boolean> = {
    list: true,
    create: true,
    update: true,
    read: true,
    filter: false,
    sort: true,
  };
  @observable validator?: FeatureFieldProps<T, V>['validator'];
  @observable defaultValue?: V;

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

  @action
  public onChange = (val: any) => {
    if (!this.feature) return;

    this.resetErrorIfAny();

    this.feature.data.editor = assocPath(
      this.fieldPath,
      val
    )(this.feature.data.editor) as T;
  };

  @observable
  get List(): FC<FeatureFieldListProps> {
    return ({ value }) => <div>{value}</div>;
  }

  @observable
  get ListHead(): FC {
    return () => <div>{this.label}</div>;
  }

  @computed
  public get Read() {
    return <this.List value={this.readValue} />;
  }

  @computed
  get Update() {
    const value = String(this.editValue);

    return (
      <StringInput
        value={value}
        onChange={this.onChange}
        label={this.label}
        error={this.editError}
        isLoading={this.feature?.data.isLoading}
      />
    );
  }

  @computed get Create() {
    return this.Update;
  }

  @observable
  public Filter: FC<{ inline?: boolean }> = observer(({ inline }) => (
    <StringFilter
      value={this.filterValue}
      name={this.name}
      label={this.label}
      onChange={this.onFilterChange}
      onReset={this.onFilterReset}
      inline={inline}
    />
  ));

  @action
  public onFilterChange = (value: any) => {
    if (!this.feature?.filters.value) return;

    this.feature.filters.value = assocPath(
      this.fieldPath,
      value
    )(this.feature.filters.value) as any;
  };

  @action
  onFilterReset = () => {
    if (!this.feature?.filters) return;

    this.feature.filters.value = omit([this.name], this.feature.filters.value);
    this.feature.filters.selected = dissocPath(
      this.fieldPath,
      this.feature.filters.selected
    );
  };

  @computed
  get filterValue() {
    return view(lensPath(this.fieldPath), this.feature?.filters.value);
  }

  @computed
  get readValue(): V {
    return view(lensPath(this.fieldPath), this.feature?.data.read);
  }

  @computed
  get editValue(): V {
    return view(lensPath(this.fieldPath), this.feature?.data.editor) as V;
  }

  @computed
  get editError(): string {
    return view(lensPath(this.fieldPath), this.feature?.data.errors);
  }

  /**
   * List of features, available for current user role by field.features,
   * field.roles and field.permissions
   */
  @computed
  get featuresOfCurrentUser() {
    const auth = this.feature?.parent?.auth;
    const role = auth?.userRole;

    return Object.values(FeatureFieldFeature).reduce((acc, feature) => {
      const byFeature = this.features[feature];

      const byRole = !this.roles || (role && this.roles.includes(role));

      const byPermission =
        !this.permissions ||
        !has(feature, this.permissions) ||
        (role && this.permissions[feature]!!.includes(role));

      return { ...acc, [feature]: byFeature && byRole && byPermission };
    }, {} as Record<FeatureFeature, boolean>);
  }

  @action
  resetErrorIfAny() {
    if (this.feature && this.editError) {
      this.feature.data.errors = dissocPath(
        this.fieldPath,
        this.feature.data.errors
      );
    }
  }

  @computed
  get fieldPath() {
    return [...this.path, this.name];
  }
}
