import { CrudlRenderer } from '~/application/modules/pages/CrudlEntity/items/CrudlRenderer';
import { CrudlEntityFeatures } from '~/application/modules/pages/CrudlEntity/types';

export const CRUDL_DEFAULT_RENDERER = new CrudlRenderer();
export const CRUDL_DEFAULT_FEATURES: CrudlEntityFeatures = {
  create: true,
  read: true,
  update: true,
  delete: true,
  list: true,
  export: false,
  select: false,
};
