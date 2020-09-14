import { action, extendObservable, observable } from 'mobx';
import {
  CrudlGetListProps,
  CrudlGetListResult,
  IBaseEntityApiHost,
  IBaseEntityApiMethods,
  IBaseEntityApiUrls,
} from '~/application/modules/pages/CrudlEntity/types/api';
import { UNAUTHORIZED, WithTokenFunction } from '~/application';

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

  getList = async (): Promise<CrudlGetListResult<Fields>> => {
    const result = await this.withToken(this.methods.list, {
      url: this.urls.list,
    } as CrudlGetListProps);

    if (result.status === 401) {
      throw new Error(UNAUTHORIZED);
    }

    if (result.error) {
      throw new Error(result.error);
    }

    return result.data;
  };
}
