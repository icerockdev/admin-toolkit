enum FeatureFieldFeature {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
  list = 'list',
  filter = 'filter',
  sort = 'sort',
}

export type FeatureFieldProps<ValueType> = {
  label?: string;
  title?: boolean;
  required?: boolean;

  validator?: (val: ValueType) => string | null | undefined;
  features?: Partial<Record<FeatureFieldFeature, boolean>>;
  listColumnSize?: string;
  allowEmptyFilter?: boolean;
};

export type FeatureFieldListProps<T extends any = any> = {
  value: T;
};
