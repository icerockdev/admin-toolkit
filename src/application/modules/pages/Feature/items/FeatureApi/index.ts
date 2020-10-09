import { action, computed, toJS } from 'mobx';
import {
  FeatureApiHost,
  FeatureApiMethods,
  FeatureApiReferences,
  FeatureApiUrls,
  FeatureDeleteProps,
  FeatureGetListProps,
  FeatureGetListResult,
  FeatureGetReadProps,
  FeatureGetReadResult,
  FeaturePostCreateProps,
  FeaturePostCreateResult,
  FeaturePostUpdateProps,
  FeaturePostUpdateResult,
} from '~/application/modules/pages/Feature/types/api';
import { UNAUTHORIZED } from '~/application';
import { Feature } from '~/application/modules/pages/Feature';
import { has, keys } from 'ramda';
import { getReferenceAll } from '~/application/modules/pages/Feature/items/FeatureApi/references';
import { FeatureData } from '~/application/modules/pages/Feature/items/FeatureData';
import {
  FeatureFeature,
  FeatureMode,
} from '~/application/modules/pages/Feature/types';

export class FeatureApi<
  Fields extends Record<string, any> = Record<string, any>
> {
  constructor(private feature: Feature<Fields>) {}

  @computed
  get methods(): FeatureApiMethods<Fields> | undefined {
    return this.feature.options?.api?.methods;
  }

  @computed
  get host(): FeatureApiHost {
    return this.feature.parent?.host || 'http://localhost';
  }

  @computed
  get urls(): Required<FeatureApiUrls> {
    const urls = this.feature.options?.api?.urls;

    const list = urls?.list || '';
    const read = urls?.read || list;
    const update = urls?.update || read;
    const create = urls?.create || read;
    const del = urls?.delete || read;
    const ex = urls?.export || read;

    return {
      list,
      read,
      update,
      create,
      delete: del,
      export: ex,
    };
  }

  @computed
  get data(): FeatureData {
    return this.feature.data;
  }

  @computed
  get references(): FeatureApiReferences<Fields> | undefined {
    return this.feature.options.api?.references;
  }

  @computed
  get request() {
    if (!this.feature?.parent?.auth?.withToken) {
      return (cb: any, props: any) => cb(props);
    }

    return this.feature?.parent.auth.withToken;
  }

  @action
  useFeature = (feature: Feature<Fields>) => {
    this.feature = feature;
  };

  @computed
  get availableApiFeatures(): Record<FeatureFeature, boolean> {
    return Object.values(FeatureFeature).reduce(
      (acc, mode) => ({
        ...acc,
        [mode]: !!(
          this.host &&
          has(mode, this.methods) &&
          this.feature.availableFeatures[mode]
        ),
      }),
      {} as Record<FeatureFeature, boolean>
    );
  }

  @action
  list = async (
    feature: Feature<Fields>
  ): Promise<FeatureGetListResult<Fields>> => {
    if (!this.availableApiFeatures.list) {
      throw new Error('Specify feature api host, methods and urls first.');
    }

    const { sortBy, sortDir, page, rows, valuesForList } = feature.filters;

    const url = new URL(this.urls.list || '', this.host).href;

    const result: FeatureGetListResult<Fields> = await this.request(
      this.methods!!.list!!,
      {
        feature,
        url,
        filters: toJS(valuesForList),
        sortBy,
        sortDir,
        limit: rows,
        offset: page * rows,
      } as FeatureGetListProps
    );

    if (result.status === 401) {
      throw new Error(UNAUTHORIZED);
    }

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  };

  @action
  read = async (id: any): Promise<FeatureGetReadResult<Fields>> => {
    if (!this.availableApiFeatures.read) {
      throw new Error('Specify feature api host, methods and urls first.');
    }

    const feature = this.feature;
    const url = new URL(this.urls.read, this.host).href;

    const result: FeatureGetReadResult<Fields> = await this.request(
      this.methods!!.read!!,
      { url, feature, id } as FeatureGetReadProps
    );

    if (result.status === 401) {
      throw new Error(UNAUTHORIZED);
    }

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  };

  @action
  create = async (
    data: FeatureData['editor']
  ): Promise<FeaturePostCreateResult<Fields>> => {
    if (!this.availableApiFeatures.create) {
      throw new Error('Specify feature api host, methods and urls first.');
    }

    const feature = this.feature;
    const url = new URL(this.urls.create, this.host).href;

    const result: FeaturePostCreateResult<Fields> = await this.request(
      this.methods!!.create!!,
      { url, feature, data } as FeaturePostCreateProps<Fields>
    );

    if (result.status === 401) {
      throw new Error(UNAUTHORIZED);
    }

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  };

  @action
  update = async (
    id: any,
    data: FeatureData['editor']
  ): Promise<FeaturePostUpdateResult<Fields>> => {
    if (!this.availableApiFeatures.update) {
      throw new Error('Specify feature api host, methods and urls first.');
    }
    const feature = this.feature;
    const url = new URL(this.urls.update, this.host).href;

    const result: FeaturePostUpdateResult<Fields> = await this.request(
      this.methods!!.update!!,
      { url, feature, data, id } as FeaturePostUpdateProps<Fields>
    );

    if (result.status === 401) {
      throw new Error(UNAUTHORIZED);
    }

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  };

  @action
  delete = async (id: any) => {
    if (!this.availableApiFeatures.delete) {
      throw new Error('Specify feature api host, methods and urls first.');
    }

    const url = new URL(this.urls.delete, this.host).href;

    await this.request(this.methods!!.delete!!, {
      url,
      feature: this.feature,
      id,
    } as FeatureDeleteProps);
  };

  @action
  async getReferencesAll<Fields>() {
    if (!keys(this.references).length || !this.feature) return;

    const refs = keys(this.references);

    await Promise.all(
      refs.map(async (ref) => {
        this.data.references[ref].isLoadingAll = true;
        this.data.references[ref].all = await this.request(getReferenceAll, {
          feature: this.feature,
          name: ref,
          host: this.host,
        });

        this.feature.data.references[ref].isLoadingAll = false;
      })
    );
  }
}
