/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import {
  IEntityProps,
  ENTITY_ERRORS,
  ENTITY_SORT_DIRS,
} from '~/application/types/entity';
import { Page } from '~/application/modules/Page';
import { EntityList } from '../../../containers/pages/EntityList';
import { EntityHead } from '../../../containers/pages/EntityHead';
import { EntityFooter } from '../../../containers/pages/EntityFooter';
import { computed, observable, action, reaction, flow, toJS } from 'mobx';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EntityViewer } from '../../../containers/pages/EntityViewer';
import { Unwrap } from '~/application/types/common';

export class Entity extends Page {
  // Props
  @observable api: IEntityProps['api'] = {
    list: { url: '/', method: 'get' },
  };
  @observable fields: IEntityProps['fields'] = [];
  @observable filters: IEntityProps['filters'] = {
    current: '',
    value: '',
    fields: [],
  };
  @observable editable: IEntityProps['editable'] = false;
  @observable viewable: IEntityProps['viewable'] = false;
  @observable fetchItemsFn: IEntityProps['fetchItemsFn'] = undefined;
  @observable updateItemsFn: IEntityProps['updateItemsFn'] = undefined;
  @observable createItemsFn: IEntityProps['createItemsFn'] = undefined;
  @observable getItemsFn: IEntityProps['getItemsFn'] = undefined;

  // Built-in
  @observable isLoading: boolean = true;
  @observable itemsPerPage: number[] = [5, 10, 15, 25, 50];
  @observable items: number = this.itemsPerPage[this.itemsPerPage.length] || 50;
  @observable totalCount: number = 0;
  @observable page: number = 0;
  @observable data: Record<string, any>[] = [];
  @observable error?: string | null;
  @observable sortBy: string = '';
  @observable sortDir: 'asc' | 'desc' = ENTITY_SORT_DIRS.ASC;
  @observable editorFieldErrors: Record<string, string> = {};
  @observable editorData: Record<string, any> = {};

  constructor(fields?: Partial<IEntityProps>) {
    super();

    if (fields) {
      Object.assign(this, fields);
    }

    reaction(
      () => [this.page, this.items, this.sortBy, this.sortDir],
      this.fetchItems
    );
  }

  @action
  setFilters = (filters: IEntityProps['filters']) => {
    this.filters = filters;
  };

  @action
  setPage = (page: number) => {
    this.page = page;
  };

  @action
  setPerPage = (items: number) => {
    this.items = items;
  };

  @action
  setSort = (field: string) => {
    if (field !== this.sortBy && this.sortDir !== ENTITY_SORT_DIRS.ASC) {
      this.sortDir = ENTITY_SORT_DIRS.ASC;
    }

    if (field === this.sortBy) {
      this.sortDir =
        this.sortDir === ENTITY_SORT_DIRS.ASC
          ? ENTITY_SORT_DIRS.DESC
          : ENTITY_SORT_DIRS.ASC;
    }

    this.sortBy = field;
  };

  fetchItemsInstance?: CancellablePromise<any>;

  @action
  fetchItems = () => {
    this.fetchItemsCancel();

    this.fetchItemsInstance = flow(function* (this: Entity) {
      this.isLoading = true;
      this.error = '';

      try {
        if (!this.api?.list?.url || !this.fetchItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const filter =
          this.filters.current && this.filters.value
            ? { name: this.filters.current, value: this.filters.value }
            : null;

        const result: Unwrap<typeof this.fetchItemsFn> = yield this.parent?.auth?.withToken(
          this.fetchItemsFn,
          {
            url: this.api?.list?.url || '',
            filter,
            page: this.page,
            count: this.items,
            sortBy: this.sortBy,
            sortDir: this.sortDir,
          }
        );

        if (!result || result.error)
          throw new Error(result?.error || ENTITY_ERRORS.CANT_LOAD_ITEMS);

        this.data = result?.data?.list || [];
        this.totalCount = result?.data?.totalCount || 0;
        this.isLoading = false;
      } catch (e) {
        this.error = e;
        this.isLoading = false;
      }
    }).bind(this)();
  };

  fetchItemsCancel = () => {
    if (this.fetchItemsInstance && this.fetchItemsInstance.cancel) {
      this.fetchItemsInstance.cancel();
    }
  };

  updateItemInstance?: CancellablePromise<any>;

  @action
  updateItem = () => {
    this.updateItemInstance = flow(function* (this: Entity) {
      this.isLoading = true;
      this.error = '';

      try {
        const data = toJS(this.editorData);

        if (!this.validateSubmitFields(data)) {
          throw new Error(ENTITY_ERRORS.INCORRECT_INPUT);
        }

        if (!this.api?.update?.url || !this.updateItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result: Unwrap<typeof this.updateItemsFn> = yield this.parent?.auth?.withToken(
          this.updateItemsFn,
          {
            url: this.api?.update?.url || '',
            data,
          }
        );

        if (!result || result.error)
          throw new Error(result?.error || ENTITY_ERRORS.CANT_LOAD_ITEMS);

        this.fetchItems();
        this.parent?.history.push(this.menu.url);
      } catch (e) {
        this.error = e;
        this.isLoading = false;
      }
    }).bind(this)();
  };

  @action
  createItem = () => {
    this.updateItemInstance = flow(function* (this: Entity) {
      this.isLoading = true;
      this.error = '';

      try {
        const data = toJS(this.editorData);

        if (!this.validateSubmitFields(data)) {
          throw new Error(ENTITY_ERRORS.INCORRECT_INPUT);
        }

        if (!this.api?.create?.url || !this.createItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result: Unwrap<typeof this.createItemsFn> = yield this.parent?.auth?.withToken(
          this.createItemsFn,
          {
            url: this.api?.create?.url || '',
            data,
          }
        );

        if (!result || result.error)
          throw new Error(result?.error || ENTITY_ERRORS.CANT_LOAD_ITEMS);

        this.fetchItems();
        this.parent?.history.push(this.menu.url);
      } catch (e) {
        this.error = e;
        this.isLoading = false;
      }
    }).bind(this)();
  };

  @action
  resetFieldError = (field: string) => {
    delete this.editorFieldErrors[field];
  };

  @action
  validateSubmitFields = (data: Record<string, any>): boolean => {
    this.editorFieldErrors = this.fields.reduce(
      (obj, field) =>
        (!field.required || field.type === 'boolean' || !!data[field.name]) &&
        (!field.validator || field.validator(data[field.name]))
          ? obj
          : {
              ...obj,
              [field.name]: ENTITY_ERRORS.FIELD_IS_REQUIRED,
            },
      {}
    );

    return Object.keys(this.editorFieldErrors).length === 0;
  };

  @observable
  getItemsInstance?: CancellablePromise<any>;

  @action
  getItem = (id: any) => {
    this.getItemsInstance = flow(function* (this: Entity) {
      this.isLoading = true;
      this.error = '';

      try {
        if (!this.api?.get?.url || !this.getItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result: Unwrap<typeof this.createItemsFn> = yield this.parent?.auth?.withToken(
          this.getItemsFn,
          {
            id,
            url: this.api?.get?.url,
          }
        );

        if (!result || result.error)
          throw new Error(result?.error || ENTITY_ERRORS.CANT_LOAD_ITEMS);

        this.editorData = result.data;
        this.isLoading = false;
      } catch (e) {
        this.error = e;
        this.parent?.history.push(this.menu.url);
        this.isLoading = false;
      }
    }).bind(this)();
  };

  getItemsCancel = () => {
    if (this.getItemsInstance && this.getItemsInstance.cancel) {
      this.getItemsInstance.cancel();
    }
  };

  @action
  setEditorData = (data: Record<string, any>) => {
    this.editorData = data;
  };

  @action
  createEmptyItem = () => {
    this.editorData = {};
  };

  @action
  onMount = () => {
    this.fetchItems();
  };

  @action
  onUnmount = () => {
    this.fetchItemsCancel();
  };

  @computed
  get ListHead() {
    return observer(() => (
      <EntityHead
        title={this.title}
        filters={this.filters}
        setFilters={this.setFilters}
        url={this.menu.url}
        applyFilter={this.fetchItems}
        canCreate={this.editable}
      />
    ));
  }

  @computed
  get ListBody() {
    return observer(() => (
      <EntityList
        fields={this.fields}
        data={this.data}
        isLoading={this.isLoading}
        url={this.menu.url}
        sortBy={this.sortBy}
        sortDir={this.sortDir}
        onSortChange={this.setSort}
        canView={this.viewable}
        canEdit={this.editable}
      />
    ));
  }

  @computed
  get ListFooter() {
    return observer(() => (
      <EntityFooter
        page={this.page}
        itemsPerPage={this.itemsPerPage}
        items={this.items}
        totalCount={this.totalCount}
        setPage={this.setPage}
        setPerPage={this.setPerPage}
      />
    ));
  }

  @computed
  get List() {
    return observer(() => (
      <div>
        <this.ListHead />
        <this.ListBody />
        <this.ListFooter />
      </div>
    ));
  }

  @computed
  get Viewer() {
    return observer(
      ({
        match: {
          params: { id },
        },
      }: RouteComponentProps<{ id: string }>) => (
        <EntityViewer
          entityName={this.title}
          id={id}
          fields={this.fields}
          url={this.menu.url}
          errors={this.editorFieldErrors}
          onSave={console.log}
          onResetFieldError={this.resetFieldError}
          isEditing={false}
          isLoading={this.isLoading}
          setEditorData={this.setEditorData}
          data={this.editorData}
          getItem={this.getItem}
          cancelGetItem={this.getItemsCancel}
        />
      )
    );
  }

  @computed
  get Editor() {
    return observer(
      ({
        match: {
          params: { id },
        },
      }: RouteComponentProps<{ id: string }>) => (
        <EntityViewer
          entityName={this.title}
          id={id}
          fields={this.fields}
          errors={this.editorFieldErrors}
          url={this.menu.url}
          onSave={this.updateItem}
          onResetFieldError={this.resetFieldError}
          isLoading={this.isLoading}
          setEditorData={this.setEditorData}
          data={this.editorData}
          getItem={this.getItem}
          cancelGetItem={this.getItemsCancel}
          isEditing
        />
      )
    );
  }

  @computed
  get Creator() {
    return observer(
      ({
        match: {
          params: { id },
        },
      }: RouteComponentProps<{ id: string }>) => (
        <EntityViewer
          entityName={this.title}
          fields={this.fields}
          errors={this.editorFieldErrors}
          url={this.menu.url}
          onSave={this.createItem}
          onResetFieldError={this.resetFieldError}
          isEditing
          isLoading={this.isLoading}
          setEditorData={this.setEditorData}
          data={this.editorData}
          getItem={this.createEmptyItem}
          cancelGetItem={this.getItemsCancel}
        />
      )
    );
  }

  @computed
  get output() {
    return observer(() => (
      <Switch>
        <Route path={`${this.menu.url}/create`} component={this.Creator} />
        <Route path={`${this.menu.url}/:id/edit`} component={this.Editor} />
        <Route path={`${this.menu.url}/:id/`} component={this.Viewer} />
        <Route path={this.menu.url} component={this.List} />
      </Switch>
    ));
  }
}
