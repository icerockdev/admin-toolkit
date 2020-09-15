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

export class CrudlApi<Fields = {}> {
  constructor(
    protected methods: IBaseEntityApiMethods<Fields>,
    protected urls: IBaseEntityApiUrls,
    protected host: IBaseEntityApiHost
  ) {
    extendObservable(this, { methods, urls, host });
  }

  @observable
  public withToken: WithTokenFunction = async () => {
    throw new Error('WithToken not attached to api');
  };

  @action
  useWithToken = (withToken?: WithTokenFunction) => {
    this.withToken = withToken ? withToken : this.withToken;
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
}
