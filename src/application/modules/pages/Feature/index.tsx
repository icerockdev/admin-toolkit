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
import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
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
        containers: options?.containers,
        components: options?.components,
      });

    // Initialize ref fields storage
    this.data.createReferenceData(this.references);

    // Get filters from url
    // TODO: if filters isn't empty, but url is, persist them here:
    this.filters.restoreFilters();

    // Update withToken for api
    this.api.useFeature(this);

    // Pass current feature to fields
    this.attachFeatureToFields();

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
  @observable filters = new FeatureFilters(this);
  @observable controller = new FeatureController<Fields>(this);

  /**
   * Array of fields, coming from props
   */
  @observable fieldsList: FeatureField<Fields>[] = [];

  /**
   * Sets this feature in each field
   */
  @action
  attachFeatureToFields() {
    this.fieldsList.forEach((field) => field.useFeature(this));
  }

  @computed
  get isEditing() {
    return this.mode === FeatureMode.create || this.mode === FeatureMode.update;
  }

  /**
   * Custom function, that returns single item's id
   * TODO: use it (currently not using)
   */
  getItemId: (fields: Fields) => any = (fields) => fields.id;

  /**
   * Custom function, that returns single item's title
   */
  getItemTitle: (fields: Fields) => string = () => '';

  /**
   * Record<name, field> of fields
   */
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

  /**
   * Returns only fields, that should be displayed / validated on current mode
   */
  @computed
  get fieldsOfCurrentMode() {
    // TODO: filter by role here (or make and filter this.fieldsOfCurrentUser)

    return this.fieldsList.filter(
      (field) => this.mode && field.features[this.mode]
    );
  }

  /**
   * Main renderer
   */
  @computed
  get output() {
    return () => <Provider feature={this}>{this.renderer.output}</Provider>;
  }

  /**
   * Proper react-router history
   */
  @computed
  get history() {
    return this.parent?.history;
  }

  /**
   * Redirects to list of items
   */
  goToList = () => {
    this.history?.push(this.filters.queryString);
  };

  /**
   * Redirects to specific item
   */
  goToRead = (id: any) => {
    this.history?.push(`${this.url}/${id}/`);
  };

  /**
   * Clears data on editing cancel
   */
  @action
  cancelEditing = () => {
    switch (this.mode) {
      case FeatureMode.create:
        this.goToList();
        break;
      case FeatureMode.update:
        const id = this.controller.getIdFromUrl();
        this.goToRead(id);
        break;
      default:
        this.history?.goBack();
    }

    this.data.clearEditorData();
  };

  @action
  submitEditor() {
    this.controller.submitItem();
    // TODO: actually submit editor form
  }
}
