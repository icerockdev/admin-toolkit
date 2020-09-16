import { CrudlRenderer } from '~/application/modules/pages/CrudlEntity/items/CrudlRenderer';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { IPageProps } from '~/application';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import { CrudlEntityReferenceProps } from '~/application/modules/pages/CrudlEntity/types/reference';
import { CrudlApi } from '~/application/modules/pages/CrudlEntity/items/CrudlApi';

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

export interface CrudlEntityOptions<
  Fields extends Record<string, any> = Record<string, any>
> extends Partial<IPageProps> {
  renderer: CrudlRenderer<CrudlEntity<Fields>>;
  fields: CrudlField<Fields>[];
  features: CrudlEntityFeatures;
  rows?: number;
  list?: Partial<CrudlListRendererProps>;
  references?: Record<string, CrudlEntityReferenceProps>;
  api?: typeof CrudlApi;
}

export enum SortDir {
  ASC = 'asc',
  DESC = 'desc',
}
