/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { createElement } from 'react';
import { Page } from '~/application/modules/pages/Page';
import { computed, extendObservable, observable } from 'mobx';
import { CrudlApi } from './items/CrudlApi';
import { CrudlRenderer } from './items/CrudlRenderer';
import { CrudlEntityOptions } from '~/application/modules/pages/CrudlEntity/types';
import { Provider } from 'mobx-react';
import {
  CRUDL_DEFAULT_FEATURES,
  CRUDL_DEFAULT_RENDERER,
} from '~/application/modules/pages/CrudlEntity/defaults';

export class CrudlEntity<Fields = {}> extends Page {
  @observable
  options: CrudlEntityOptions<Fields>;
  @observable
  renderer: CrudlRenderer<CrudlEntity<Fields>> = CRUDL_DEFAULT_RENDERER;

  constructor(
    public title: string,
    public url: string,
    protected api: CrudlApi,

    options: Partial<CrudlEntityOptions<Fields>> = {}
  ) {
    super({
      title,
      roles: options?.roles,
      menu: {
        enabled: options?.menu?.enabled || true,
        label: options?.menu?.label || title,
        url,
      },
    });

    this.options = {
      renderer: CRUDL_DEFAULT_RENDERER,
      fields: [],
      title: '',
      ...options,
      features: {
        // TODO: create: this.api.createItem and so on for all features instead of CRUDL_DEFAULT
        ...CRUDL_DEFAULT_FEATURES,
        ...options.features,
      },
    };

    extendObservable(this, { api });
  }

  @computed
  get output() {
    return () => (
      <Provider entity={this}>{this.options.renderer.output}</Provider>
    );
  }
}
