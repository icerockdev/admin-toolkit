/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { IEntityProps, ENTITY_ERRORS } from '~/types/entity';
import { Page } from '~/containers/pages/Page';
import { EntityList } from '../EntityList';
import { EntityHead } from '../EntityHead';
import { EntityFooter } from '../EntityFooter';
import { computed, observable, action, reaction, flow } from 'mobx';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EntityViewer } from '../EntityViewer';

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

  // Built-in
  @observable isLoading: boolean = true;
  @observable itemsPerPage: number[] = [5, 10, 15, 25, 50];
  @observable items: number = this.itemsPerPage[this.itemsPerPage.length] || 50;
  @observable totalCount: number = 0;
  @observable page: number = 0;
  @observable data: Record<string, any>[] = [];
  @observable error?: string | null;

  constructor(fields?: Partial<IEntityProps>) {
    super();

    if (fields) {
      Object.assign(this, fields);
    }

    reaction(() => [this.page, this.items], this.fetchItems);
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

  fetchItemsInstance?: CancellablePromise<any>;

  @action
  fetchItems = () => {
    this.fetchItemsCancel();

    this.fetchItemsInstance = flow(function* (this: Entity) {
      this.isLoading = true;

      try {
        if (!this.api?.list?.url || !this.fetchItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const filter =
          this.filters.current && this.filters.value
            ? { name: this.filters.current, value: this.filters.value }
            : null;

        const result = yield this.parent?.auth?.withToken(this.fetchItemsFn, {
          url: this.api?.list?.url || '',
          filter,
          page: this.page,
          count: this.items,
        });

        if (result.error) throw new Error(result.error);

        this.data = result?.data?.list || [];
        this.totalCount = result?.data?.totalPages || 0;
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
  updateItem = (data: Record<string, any>) => {
    this.updateItemInstance = flow(function* (this: Entity) {
      this.isLoading = true;

      try {
        if (!this.api?.update?.url || !this.updateItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result = yield this.parent?.auth?.withToken(this.updateItemsFn, {
          url: this.api?.update?.url || '',
          data,
        });

        if (result.error) throw new Error(result.error);

        if (result.data.id) {
          this.data = this.data.map((item) =>
            item.id === result.data.id ? { ...item, ...result.data } : item
          );
        }

        this.parent?.history.push(this.menu.url);

        this.isLoading = false;
      } catch (e) {
        this.error = e;
        this.isLoading = false;
      }
    }).bind(this)();
  };

  @action
  createItem = (data: Record<string, any>) => {
    this.updateItemInstance = flow(function* (this: Entity) {
      this.isLoading = true;

      try {
        if (!this.api?.create?.url || !this.createItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result = yield this.parent?.auth?.withToken(this.createItemsFn, {
          url: this.api?.create?.url || '',
          data,
        });

        if (result.error) throw new Error(result.error);

        if (result.data.id) {
          this.data = this.data.map((item) =>
            item.id === result.data.id ? { ...item, ...result.data } : item
          );
        }

        this.parent?.history.push(this.menu.url);

        this.isLoading = false;
      } catch (e) {
        this.error = e;
        this.isLoading = false;
      }
    }).bind(this)();
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
          entities={this.data}
          id={id}
          fields={this.fields}
          url={this.menu.url}
          onSave={console.log}
          isEditing={false}
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
          entities={this.data}
          id={id}
          fields={this.fields}
          url={this.menu.url}
          onSave={this.updateItem}
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
          entities={this.data}
          fields={this.fields}
          url={this.menu.url}
          isEditing
          onSave={this.createItem}
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
