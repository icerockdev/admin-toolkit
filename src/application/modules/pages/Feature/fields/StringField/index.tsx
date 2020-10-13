import { FeatureField } from '~/application/modules/pages/Feature/fields';
import { observable } from 'mobx';

export class StringField<
  T extends Record<string, any> = Record<string, any>
> extends FeatureField<T, string> {
  @observable defaultValue = '';
}
