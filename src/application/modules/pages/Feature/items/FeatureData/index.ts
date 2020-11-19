/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { action, computed, extendObservable, observable, toJS } from 'mobx';
import { FeatureDataReference } from '~/application/modules/pages/Feature/types/reference';
import { FeatureApiReferences } from '~/application/modules/pages/Feature/types';
import { Feature } from '~/application/modules/pages/Feature';
import { assocPath, lensPath, pickBy, view } from 'ramda';

export class FeatureData<
  Fields extends Record<string, any> = Record<string, any>
> {
  constructor(private feature: Feature<Fields>) {}

  /**
   * FeatureApi's references dictionary (see this.createReferenceData)
   */
  @observable references: Partial<
    Record<keyof Fields, FeatureDataReference>
  > = {};

  @observable isLoading: boolean = true;

  /**
   * Values for list
   */
  @observable list: Fields[] = [];

  /**
   * Values for single item display
   */
  @observable read: Partial<Record<keyof Fields, Fields[keyof Fields]>> = {};

  /**
   * Current editor values, copied from read before create/update form appears
   */
  @observable editor: Partial<Record<keyof Fields, Fields[keyof Fields]>> = {};

  /**
   * Validation error dictionary
   */
  @observable errors: Partial<Record<keyof Fields, string>> = {};

  /**
   * Creates editor[fieldname] reference instance for refs from FeatureApi
   * @param refs
   */
  @action
  createReferenceData(refs: FeatureApiReferences<Fields> = {}) {
    // fills this.references with fields from Feature
    Object.keys(refs).forEach((ref) => {
      extendObservable(this.references, {
        [ref]: observable(new FeatureDataReference()),
      });
    });
  }

  @action
  clearReadData() {
    this.read = {};
  }

  @action
  clearEditorData() {
    this.editor = {};
  }

  /**
   * Sets editor data from current item data, fetched from backend
   */
  @action
  copyReadToEditor() {
    this.isLoading = true;
    this.editor = Object.assign(this.editor, this.read);
    this.isLoading = false;
  }

  @action
  clearErrors() {
    this.errors = {};
  }

  @action
  clearError(field: keyof Fields) {
    this.errors = {
      ...this.errors,
      [field]: undefined,
    };
  }

  /**
   * Data fields, only for current mode (update/create), based on field and feature
   * roles and permissions
   */
  @computed
  get editorDataForCurrentMode() {
    return this.feature.fieldsOfCurrentMode.reduce((acc, field) => {
      return assocPath(
        // changes value in acc by field.fieldPath
        field.fieldPath,
        view(lensPath(field.fieldPath), this.editor) // get value in editor by field.fieldPath
      )(acc) as Fields;
    }, {} as Fields);
  }
}
