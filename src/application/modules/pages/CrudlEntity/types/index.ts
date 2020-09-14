import { CrudlRenderer } from '~/application/modules/pages/CrudlEntity/items/CrudlRenderer';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { IPageProps } from '~/application';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';

export * from './api';

export enum CrudlActionEnum {
  list = 'list',
  read = 'read',
  update = 'update',
  create = 'create',
}

export type CrudlEntityFeatures = Partial<Record<CrudlActionEnum, boolean>> & {
  delete?: boolean;
  select?: boolean;
  export?: boolean;
};

export interface CrudlEntityOptions<Fields = {}> extends Partial<IPageProps> {
  renderer: CrudlRenderer<CrudlEntity<Fields>>;
  fields: CrudlField<Fields>[];
  features: CrudlEntityFeatures;
  rows?: number;
  list?: Partial<CrudlListRendererProps>;
}
