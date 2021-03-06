/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { Page } from '~/application/modules/pages/Page';
import { action, computed, extendObservable, observable, reaction } from 'mobx';
import { FeatureApi } from './items/FeatureApi';
import { FeatureRenderer } from './items/FeatureRenderer';
import {
  FeatureFeature,
  FeatureMode,
  FeatureOptions,
} from '~/application/modules/pages/Feature/types';
import { Provider } from 'mobx-react';
import { FEATURE_DEFAULT_FEATURES } from '~/application/modules/pages/Feature/defaults';
import { FeatureField } from '~/application/modules/pages/Feature/fields/FeatureField';
import { FeatureData } from '~/application/modules/pages/Feature/items/FeatureData';
import { FeatureController } from '~/application/modules/pages/Feature/items/FeatureController';
import { FeatureFilters } from '~/application/modules/pages/Feature/items/FeatureFilters';
import { debounce } from 'throttle-debounce';
import { has } from 'ramda';

export class Feature<
  Fields extends Record<string, any> = Record<string, any>
> extends Page {
  constructor(
    public title: string,
    public url: string,
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

    extendObservable(this, { title, url, options });

    if (options) this.options = options;
    if (options.fields) this.fieldsList = options.fields;
    if (options.features) this.features = options.features;
    if (options.rows) this.filters.rows = options.rows;
    if (options.getItemTitle) this.getItemTitle = options.getItemTitle;
    if (options.permissions) this.permissions = options.permissions;

    // Initialize renderer
    this.renderer =
      options.renderer ||
      new FeatureRenderer({
        containers: options?.containers,
        components: options?.components,
      });

    // Initialize ref fields storage
    this.data.createReferenceData(this.api.references);

    // Get filters from url
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
      ],
      debounce(200, this.onFilterChange)
    );

    reaction(() => [this.filters.value], debounce(400, this.onFilterChange));
  }

  @observable permissions?: FeatureOptions['permissions'];
  @observable options: Partial<FeatureOptions<Fields>> = {};
  @observable features: FeatureOptions['features'] = FEATURE_DEFAULT_FEATURES;
  @observable renderer: FeatureRenderer = new FeatureRenderer();
  @observable data: FeatureData<Fields> = new FeatureData(this);
  @observable mode?: FeatureMode;
  @observable filters: FeatureFilters<Fields> = new FeatureFilters(this);
  @observable controller = new FeatureController<Fields>(this);
  @observable api = new FeatureApi(this);

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
   * Custom function, that returns single item's id, can be overriden by
   * Feature's props
   * TODO: use it everywhere (currently not using)
   */
  getItemId: (fields: Fields) => any = (fields) => fields.id;

  /**
   * Custom function, that returns single item's title, can be overriden by
   * Feature's props
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
    return this.fieldsList.filter(
      (field) => this.mode && field.featuresOfCurrentUser[this.mode]
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
   * Redirects to specific item editor
   */
  goToUpdate = (id: any) => {
    this.history?.push(`${this.url}/${id}/${FeatureMode.update}/`);
  };

  /**
   * Redirects to specific item editor
   */
  goToCreate = () => {
    this.history?.push(`${this.url}/${FeatureMode.create}`);
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

  /**
   * Called when page, count, sort or filter changed.
   */
  private onFilterChange = () => {
    this.filters.persistFilters();
    this.controller.beforeListMode();
  };

  /**
   * Features, available for current user
   */
  @computed
  get availableFeatures() {
    const auth = this.parent?.auth;
    const role = auth?.userRole;

    return Object.values(FeatureFeature).reduce((acc, feature) => {
      const byRole = !this.roles || (role && this.roles.includes(role));

      const byPermission =
        !this.permissions ||
        !has(feature, this.permissions) ||
        (role && this.permissions[feature]!!.includes(role));

      return { ...acc, [feature]: byRole && byPermission };
    }, {} as Record<FeatureFeature, boolean>);
  }
}
