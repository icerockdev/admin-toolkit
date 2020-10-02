import { Feature } from '~/application/modules/pages/Feature';
import { FeatureMode } from '~/application/modules/pages/Feature/types/index';

export type IBaseEntityApiUrls = Partial<Record<FeatureMode, string>>;

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

export type FeaturePostUpdateResult<Fields> = FeaturePostCreateResult<Fields>;

export interface FeatureApiMethods<Fields> {
  list: (props: FeatureGetListProps) => Promise<FeatureGetListResult<Fields>>;
  read?: (props: FeatureGetReadProps) => Promise<FeatureGetReadResult<Fields>>;
  create?: (
    props: FeaturePostCreateProps<Fields>
  ) => Promise<FeaturePostCreateResult<Fields>>;
  update?: (
    props: FeaturePostUpdateProps<Fields>
  ) => Promise<FeaturePostUpdateResult<Fields>>;
}

export type FeatureApiHost = string;
