import { FeatureField } from '~/application/modules/pages/Feature/fields';

export class StringField<
  T extends Record<string, any> = Record<string, any>
> extends FeatureField<T, string> {}
