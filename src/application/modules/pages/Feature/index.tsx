/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { Page } from '~/application/modules/pages/Page';
import { action, computed, extendObservable, observable, reaction } from 'mobx';
import { FeatureApi } from './items/FeatureApi';
import { FeatureRenderer } from './items/FeatureRenderer';
import {
  FeatureMode,
  FeatureOptions,
} from '~/application/modules/pages/Feature/types';
import { Provider } from 'mobx-react';
import { FEATURE_DEFAULT_FEATURES } from '~/application/modules/pages/Feature/defaults';
import { FeatureField } from '~/application/modules/pages/Feature/items/FeatureField';
import { FeatureData } from '~/application/modules/pages/Feature/items/FeatureData';
import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController';
import { FeatureFilters } from '~/application/modules/pages/Feature/items/FeatureFilters';
import { FeatureReferenceProps } from '~/application/modules/pages/Feature/types/reference';

export class Feature<
  Fields extends Record<string, any> = Record<string, any>
> extends Page {
  constructor(
    public title: string,
    public url: string,
    public api: FeatureApi<Fields>,

    options: Partial<FeatureOptions<Fields>> = {}
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

    extendObservable(this, { api, title, url });

    if (options.fields) this.fieldsList = options.fields;
    if (options.features) this.features = options.features;
    if (options.references) this.references = options.references;
    if (options.rows) this.filters.rows = options.rows;
    if (options.getItemTitle) this.getItemTitle = options.getItemTitle;

    // Initialize renderer
    this.renderer =
      options.renderer ||
      new FeatureRenderer({
        list: options.list,
        read: options.read,
        // TODO: create options,
        // TODO: update options
      });

    // Initialize ref fields storage
    this.data.createReferenceData(this.references);

    // Get filters from url
    this.filters.restoreFilters();

    // Update withToken for api
    this.api.useFeature(this);

    // Pass current feature to fields
    this.attachEntityToFields();

    // React on changes of mode
    reaction(() => this.mode, this.controller.onActionChange);

    // React on changes of list props
    reaction(
      () => [
        this.filters.sortBy,
        this.filters.sortDir,
        this.filters.page,
        this.filters.rows,
        this.filters.value,
      ],
      () => {
        this.filters.persistFilters();
        this.controller.loadList();
      }
    );
  }

  @observable features: FeatureOptions['features'] = FEATURE_DEFAULT_FEATURES;
  @observable references: Record<string, FeatureReferenceProps> = {};

  @observable renderer: FeatureRenderer = new FeatureRenderer();
  @observable data: FeatureData = new FeatureData();
  @observable mode?: FeatureMode;
  @observable fieldsList: FeatureField<Fields>[] = [];
  @observable filters = new FeatureFilters(this);
  @observable controller = new FeatureController<Fields>(this);

  @action
  attachEntityToFields() {
    this.fieldsList.forEach((field) => field.useFeature(this));
  }

  getItemTitle: (fields: Fields) => string = () => '';

  @computed
  get fields() {
    return this.fieldsList.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field,
      }),
      {} as Record<keyof Fields, FeatureField<Fields>>
    );
  }

  @computed
  get fieldsOrder() {
    return this.fieldsList.map((field) => field.name);
  }

  @computed
  get output() {
    return () => <Provider feature={this}>{this.renderer.output}</Provider>;
  }
}
