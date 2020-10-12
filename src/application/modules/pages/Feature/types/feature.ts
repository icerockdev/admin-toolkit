import { Feature, IPageProps, UserRole } from '~/application';
import { FeatureField } from '~/application/modules/pages/Feature/fields';
import { FeatureRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import { FeatureRenderer } from '~/application/modules/pages/Feature/items';
import { FeatureApiProps } from '~/application/modules/pages/Feature/types/api';

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

  permissions?: Partial<Record<FeatureFeature, UserRole[]>>;
  rows?: number;
}

export enum SortDir {
  ASC = 'asc',
  DESC = 'desc',
}
