import { action, extendObservable, observable, toJS } from 'mobx';
import {
  CrudlGetListProps,
  CrudlGetListResult,
  IBaseEntityApiHost,
  IBaseEntityApiMethods,
  IBaseEntityApiUrls,
} from '~/application/modules/pages/CrudlEntity/types/api';
import { UNAUTHORIZED, WithTokenFunction } from '~/application';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlController } from '~/application/modules/pages/CrudlEntity/items/CrudlController';
import { keys } from 'ramda';
import { getReferenceAll } from '~/application/modules/pages/CrudlEntity/items/CrudlApi/references';

export class CrudlApi<
  Fields extends Record<string, any> = Record<string, any>
> {
  constructor(
    protected methods: IBaseEntityApiMethods<Fields>,
    protected urls: IBaseEntityApiUrls,
    protected host: IBaseEntityApiHost
  ) {
    extendObservable(this, { methods, urls, host });
  }

  @observable entity?: CrudlEntity<Fields>;

  @observable
  public withToken: WithTokenFunction = async () => {
    throw new Error('WithToken not attached to api');
  };

  @action
  useEntity = (entity: CrudlEntity<Fields>) => {
    this.withToken = entity.parent?.auth?.withToken || this.withToken;
    this.entity = entity;
  };

  getList = async (
    entity: CrudlEntity<Fields>
  ): Promise<CrudlGetListResult<Fields>> => {
    const { sortBy, sortDir, page, rows, valuesForList } = entity.filters;
    const url = `${this.host}/${this.urls.list || ''}`;

    const result: CrudlGetListResult<Fields> = await this.withToken(
      this.methods.list,
      {
        url,
        filters: toJS(valuesForList),
        sortBy,
        sortDir,
        limit: rows,
        offset: page * rows,
      } as CrudlGetListProps
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
  async getReferencesAll<Fields>(controller: CrudlController<Fields>) {
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
        entity.data.references[ref] = {
          ...entity.data.references[ref],
          isLoadingAll: true,
        };

        entity.data.references[ref] = {
          ...entity.data.references[ref],
          all: await getReferenceAll(entity, ref, this.host),
          isLoadingAll: false,
        };
      })
    );
  }
}
