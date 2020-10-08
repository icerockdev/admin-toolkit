import { Feature } from '~/application/modules/pages/Feature';
import { FeatureFeature } from '~/application/modules/pages/Feature/types/index';
import { FeatureReferenceProps } from '~/application/modules/pages/Feature/types/reference';

export type FeatureApiUrls = Partial<Record<FeatureFeature, string>>;

export type FeatureApiHost = string;

export type FeatureApiReferences<T> = Partial<
  Record<keyof T, FeatureReferenceProps>
>;

export type FeatureApiProps<T> = {
  urls?: FeatureApiUrls;
  methods?: FeatureApiMethods<T>;
  references?: FeatureApiReferences<T>;
};

export type FeatureGetListProps = {
  feature: Feature;
  url: string;
  filters: Record<string, string>;
  sortBy: string;
  sortDir: string;
  limit: number;
  offset: number;
};

export type FeatureGetReadProps = {
  feature: Feature;
  url: string;
  id: any;
};

export type FeaturePostCreateProps<Fields> = {
  feature: Feature;
  url: string;
  data: Record<keyof Fields, Fields[keyof Fields]>;
};

export type FeaturePostUpdateProps<Fields> = FeaturePostCreateProps<Fields> & {
  id: any;
};

export type FeatureDeleteProps = FeatureGetReadProps;

export type FeatureGetListResult<Fields> = {
  data: Fields[];
  count: number;
  status?: number;
  error?: string;
};

export type FeatureGetReadResult<Fields> = {
  data: Fields;
  status?: number;
  error?: string;
};

export type FeaturePostCreateResult<Fields> = {
  data: Fields;
  status?: number;
  error?: string;
  errors?: Record<keyof Fields, string>;
};

export type FeaturePostUpdateResult<T> = FeaturePostCreateResult<T>;

export type FeatureApiMethodList<T> = (
  props: FeatureGetListProps
) => Promise<FeatureGetListResult<T>>;

export type FeatureApiMethodGet<T> = (
  props: FeatureGetReadProps
) => Promise<FeatureGetReadResult<T>>;

export type FeatureApiMethodCreate<T> = (
  props: FeaturePostCreateProps<T>
) => Promise<FeaturePostCreateResult<T>>;

export type FeatureApiMethodUpdate<T> = (
  props: FeaturePostUpdateProps<T>
) => Promise<FeaturePostUpdateResult<T>>;

export type FeatureApiMethodDelete<T> = (
  props: FeatureDeleteProps
) => Promise<void>;

export interface FeatureApiMethods<T> {
  list?: FeatureApiMethodList<T>;
  read?: FeatureApiMethodGet<T>;
  create?: FeatureApiMethodCreate<T>;
  update?: FeatureApiMethodUpdate<T>;
  delete?: FeatureApiMethodDelete<T>;
}
