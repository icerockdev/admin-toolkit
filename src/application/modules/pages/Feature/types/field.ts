/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureField } from '~/application/modules/pages/Feature/fields/FeatureField';
import { UserRole } from '~/application';

export enum FeatureFieldFeature {
  create = 'create',
  read = 'read',
  update = 'update',
  list = 'list',
  filter = 'filter',
  sort = 'sort',
}

export type FeatureFieldProps<T, V> = {
  label?: string;
  required?: boolean;
  roles?: UserRole[]; // Who can access field
  permissions?: Partial<Record<FeatureFieldFeature, UserRole[]>>; // More specific

  validator?: (val: V, field: FeatureField<T, V>) => string | null | undefined;
  features?: Partial<Record<FeatureFieldFeature, boolean>>;
  listColumnSize?: string;
  allowEmptyFilter?: boolean;
  defaultValue?: V;
  path?: string[]; // path in value object
};

export type FeatureFieldListProps<T extends any = any> = {
  value: T;
};

export type FeatureInputProps<T extends any = any> = {
  value?: T;
  label: string;
  onChange: (val?: T) => void;
  disabled?: boolean;
  error?: string;
  isLoading?: boolean;
};
