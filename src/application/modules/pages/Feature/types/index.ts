import { FeatureRenderer } from '~/application/modules/pages/Feature/items/FeatureRenderer';
import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { IPageProps } from '~/application';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import { FeatureApiProps } from '~/application/modules/pages/Feature/types/api';

export * from './api';

export enum FeatureMode {
  list = 'list',
  read = 'read',
  update = 'update',
  create = 'create',
}

export enum FeatureFeature {
  list = 'list',
  read = 'read',
  update = 'update',
  create = 'create',
  delete = 'delete',
  export = 'export',
}

export type FeatureFeatures = Partial<Record<FeatureFeature, boolean>>;

export interface FeatureOptions<
  Fields extends Record<string, any> = Record<string, any>
> extends Partial<IPageProps> {
  getItemTitle?: (fields: Fields) => string;

  fields: FeatureField<Fields>[];
  features: FeatureFeatures;
  containers?: FeatureRendererProps['containers'];
  components?: FeatureRendererProps['components'];

  renderer: FeatureRenderer<Feature<Fields>>;
  api?: FeatureApiProps<Fields>;

  rows?: number;
}

export enum SortDir {
  ASC = 'asc',
  DESC = 'desc',
}
