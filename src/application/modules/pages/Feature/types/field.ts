import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { UserRole } from '~/application';

export enum FeatureFieldFeature {
  create = 'create',
  read = 'read',
  update = 'update',
  list = 'list',
  filter = 'filter',
  sort = 'sort',
}

export type FeatureFieldProps<T> = {
  label?: string;
  required?: boolean;
  roles?: UserRole[]; // Who can access field
  permissions?: Partial<Record<FeatureFieldFeature, UserRole[]>>; // More specific

  validator?: (
    val: T[keyof T],
    field: FeatureField<T>
  ) => string | null | undefined;
  features?: Partial<Record<FeatureFieldFeature, boolean>>;
  listColumnSize?: string;
  allowEmptyFilter?: boolean;
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
