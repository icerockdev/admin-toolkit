/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureField } from '~/application/modules/pages/Feature/fields';
import { observable } from 'mobx';

export class StringField<
  T extends Record<string, any> = Record<string, any>
> extends FeatureField<T, string> {
  @observable defaultValue = '';
}
