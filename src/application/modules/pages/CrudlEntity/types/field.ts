enum CrudlFieldFeature {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
  list = 'list',
  filter = 'filter',
  sort = 'sort',
}

export type CrudlFieldProps<ValueType> = {
  label?: string;
  title?: boolean;
  required?: boolean;

  validator?: (val: ValueType) => string | null | undefined;
  features?: Partial<Record<CrudlFieldFeature, boolean>>;
  listColumnSize?: string;
  allowEmptyFilter?: boolean;
};

export type CrudlFieldListProps<T extends any = any> = {
  name: string;
  label?: string;
  value: T;
};
