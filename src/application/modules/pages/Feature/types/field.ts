import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';

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
  title?: boolean;
  required?: boolean;

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
};
