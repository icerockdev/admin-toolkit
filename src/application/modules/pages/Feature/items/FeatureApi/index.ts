import { action, computed, extendObservable, observable, toJS } from 'mobx';
import {
  FeatureGetListProps,
  FeatureGetListResult,
  FeatureApiHost,
  FeatureApiMethods,
  IBaseEntityApiUrls,
  FeatureGetReadResult,
  FeatureGetReadProps,
} from '~/application/modules/pages/Feature/types/api';
import { UNAUTHORIZED } from '~/application';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController';
import { keys } from 'ramda';
import { getReferenceAll } from '~/application/modules/pages/Feature/items/FeatureApi/references';

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

  @observable entity?: Feature<Fields>;

  @computed
  get withToken() {
    if (!this.entity?.parent?.auth?.withToken) {
      throw new Error('WithToken not attached to api');
    }

    return this.entity?.parent.auth.withToken;
  }

  @action
  useEntity = (entity: Feature<Fields>) => {
    this.entity = entity;
  };

  getList = async (
    entity: Feature<Fields>
  ): Promise<FeatureGetListResult<Fields>> => {
    const { sortBy, sortDir, page, rows, valuesForList } = entity.filters;
    const url = new URL(this.urls.list || '/', this.host).href;

    const result: FeatureGetListResult<Fields> = await this.withToken(
      this.methods.list,
      {
        entity,
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

  getRead = async (
    entity: Feature<Fields>,
    id: any
  ): Promise<FeatureGetReadResult<Fields>> => {
    if (!this.methods.read) {
      throw new Error('Api getter for single item not defined');
    }

    const url = new URL(this.urls.read || '/', this.host).href;

    const result: FeatureGetReadResult<Fields> = await this.withToken(
      this.methods.read,
      { url, entity, id } as FeatureGetReadProps
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
    if (!this.entity) return;

    const {
      entity,
      entity: { references },
    } = this;

    if (!keys(references).length) return;

    const refs = keys(entity.references);

    refs.forEach((ref) => {});

    await Promise.all(
      refs.map(async (ref) => {
        entity.data.references[ref].isLoadingAll = true;
        entity.data.references[ref].all = await this.withToken(
          getReferenceAll,
          {
            entity,
            name: ref,
            host: this.host,
          }
        );
        entity.data.references[ref].isLoadingAll = false;
      })
    );
  }
}
