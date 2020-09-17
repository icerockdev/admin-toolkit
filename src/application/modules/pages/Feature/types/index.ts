import { FeatureRenderer } from '~/application/modules/pages/Feature/items/FeatureRenderer';
import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { IPageProps } from '~/application';
import { Feature } from '~/application/modules/pages/Feature';
import {
  FeatureListRendererProps,
  FeatureReadRendererProps,
} from '~/application/modules/pages/Feature/types/renderer';
import { FeatureReferenceProps } from '~/application/modules/pages/Feature/types/reference';
import { FeatureApi } from '~/application/modules/pages/Feature/items/FeatureApi';

export * from './api';

export enum FeatureMode {
  list = 'list',
  read = 'read',
  update = 'update',
  create = 'create',
}

export type FeatureFeatures = Partial<Record<FeatureMode, boolean>> & {
  delete?: boolean;
  select?: boolean;
  export?: boolean;
};

export interface FeatureOptions<
  Fields extends Record<string, any> = Record<string, any>
> extends Partial<IPageProps> {
  renderer: FeatureRenderer<Feature<Fields>>;
  fields: FeatureField<Fields>[];
  features: FeatureFeatures;
  rows?: number;
  references?: Record<string, FeatureReferenceProps>;
  api?: typeof FeatureApi;
  getItemTitle?: (fields: Fields) => string;

  list?: Partial<FeatureListRendererProps>;
  read?: Partial<FeatureReadRendererProps>;
}

export enum SortDir {
  ASC = 'asc',
  DESC = 'desc',
}
