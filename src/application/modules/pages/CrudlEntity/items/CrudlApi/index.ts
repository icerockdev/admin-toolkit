import { extendObservable } from 'mobx';
import {
  IBaseEntityApiHost,
  IBaseEntityApiMethods,
  IBaseEntityApiUrls,
} from '~/application/modules/pages/CrudlEntity/types/api';

export class CrudlApi {
  constructor(
    protected methods: IBaseEntityApiMethods,
    protected urls: IBaseEntityApiUrls,
    protected host: IBaseEntityApiHost
  ) {
    extendObservable(this, { methods, urls, host });
  }
}
