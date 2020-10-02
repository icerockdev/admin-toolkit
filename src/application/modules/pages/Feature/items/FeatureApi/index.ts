import { action, computed, extendObservable, observable, toJS } from 'mobx';
import {
  FeatureApiHost,
  FeatureApiMethods,
  FeatureGetListProps,
  FeatureGetListResult,
  FeatureGetReadProps,
  FeatureGetReadResult,
  FeaturePostCreateProps,
  FeaturePostCreateResult,
  FeaturePostUpdateProps,
  FeaturePostUpdateResult,
  IBaseEntityApiUrls,
} from '~/application/modules/pages/Feature/types/api';
import { UNAUTHORIZED } from '~/application';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController';
import { keys } from 'ramda';
import { getReferenceAll } from '~/application/modules/pages/Feature/items/FeatureApi/references';
import { FeatureData } from '~/application/modules/pages/Feature/items/FeatureData';

export class FeatureApi<
  Fields extends Record<string, any> = Record<string, any>
> {
  constructor(
    protected methods: FeatureApiMethods<Fields>,
    protected urls: IBaseEntityApiUrls,
    protected host: FeatureApiHost
  ) {
    extendObservable(this, { methods, urls, host });
  }

  @observable
  feature?: Feature<Fields>;

  @computed
  get withToken() {
    if (!this.feature?.parent?.auth?.withToken) {
      throw new Error('WithToken not attached to api');
    }

    return this.feature?.parent.auth.withToken;
  }

  @action
  useFeature = (feature: Feature<Fields>) => {
    this.feature = feature;
  };

  getList = async (
    feature: Feature<Fields>
  ): Promise<FeatureGetListResult<Fields>> => {
    const { sortBy, sortDir, page, rows, valuesForList } = feature.filters;
    const url = new URL(this.urls.list || '/', this.host).href;

    const result: FeatureGetListResult<Fields> = await this.withToken(
      this.methods.list,
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

  getRead = async (id: any): Promise<FeatureGetReadResult<Fields>> => {
    if (!this.methods.read) {
      throw new Error('Api getter for single item not defined');
    }

    const feature = this.feature;
    const url = new URL(this.urls.read || '/', this.host).href;

    const result: FeatureGetReadResult<Fields> = await this.withToken(
      this.methods.read,
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

  postCreate = async (
    data: FeatureData['editor']
  ): Promise<FeaturePostCreateResult<Fields>> => {
    if (!this.methods.create) {
      throw new Error('Api creator method not defined');
    }

    const feature = this.feature;
    const url = new URL(this.urls.create || '/', this.host).href;

    const result: FeaturePostCreateResult<Fields> = await this.withToken(
      this.methods.create,
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

  postUpdate = async (
    id: any,
    data: FeatureData['editor']
  ): Promise<FeaturePostUpdateResult<Fields>> => {
    if (!this.methods.update) {
      throw new Error('Api updater method not defined');
    }

    const feature = this.feature;
    const url = new URL(this.urls.create || '/', this.host).href;

    const result: FeaturePostUpdateResult<Fields> = await this.withToken(
      this.methods.update,
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
  async getReferencesAll<Fields>(controller: FeatureController<Fields>) {
    if (!this.feature) return;

    const {
      feature,
      feature: { references },
    } = this;

    if (!keys(references).length) return;

    const refs = keys(feature.references);

    refs.forEach((ref) => {});

    await Promise.all(
      refs.map(async (ref) => {
        feature.data.references[ref].isLoadingAll = true;
        feature.data.references[ref].all = await this.withToken(
          getReferenceAll,
          {
            feature,
            name: ref,
            host: this.host,
          }
        );
        feature.data.references[ref].isLoadingAll = false;
      })
    );
  }
}
