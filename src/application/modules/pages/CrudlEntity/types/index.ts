import { CrudlRenderer } from '~/application/modules/pages/CrudlEntity/items/CrudlRenderer';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { IPageProps } from '~/application';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';

export * from './api';

export interface CrudlEntityFeatures {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  list: boolean;
  select?: boolean;
  export?: boolean;
}

export interface CrudlEntityOptions<Fields> extends Partial<IPageProps> {
  renderer: CrudlRenderer<CrudlEntity<Fields>>;
  fields: CrudlField<Fields, keyof Fields>[];
  features: CrudlEntityFeatures;
}
