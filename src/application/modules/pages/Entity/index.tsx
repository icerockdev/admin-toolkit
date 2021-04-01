/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { Fragment, ReactElement } from 'react';
import {
  ENTITY_ERRORS,
  ENTITY_REFERENCE_FIELDS,
  ENTITY_SORT_DIRS,
  IEntityCreateFunctionResult,
  IEntityFetchFunctionResult,
  IEntityField,
  IEntityGetFunctionResult,
  IEntityProps,
  IEntityUpdateFunctionResult,
  IFilterValue,
} from '~/application';
import { action, computed, flow, observable, reaction, toJS } from 'mobx';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import { EntityViewer } from '~/application/modules/pages/Entity/components/EntityViewer';
import { EntityBreadcrumbs } from '~/application/modules/pages/Entity/components/EntityBreadcrumbs';
import { Typography } from '@material-ui/core';
import { saveAs } from 'file-saver';
import { parseQuery } from '~/utils/query';
import { Page } from '~/application/modules/pages/Page';
import { EntityList } from '~/application/modules/pages/Entity/components/EntityList';
import { EntityHead } from '~/application/modules/pages/Entity/components/EntityHead';
import { EntityFooter } from '~/application/modules/pages/Entity/components/EntityFooter';
import { EntityListWrapper } from '~/application/modules/pages/Entity/components/EntityListWrapper';

export class Entity extends Page {
  // Props
  @observable api: IEntityProps['api'] = {
    list: { url: '/', method: 'get' },
  };
  @observable fields: IEntityProps['fields'] = [];
  @observable filters: IEntityProps['filters'] = [];
  @observable editable: IEntityProps['editable'] = false;
  @observable viewable: IEntityProps['viewable'] = false;
  @observable creatable: IEntityProps['creatable'] = false;
  @observable exportable: IEntityProps['exportable'] = false;
  @observable selectable: IEntityProps['selectable'] = false;
  @observable getItemsFn: IEntityProps['getItemsFn'] = undefined;
  @observable fetchItemsFn: IEntityProps['fetchItemsFn'] = undefined;
  @observable updateItemsFn: IEntityProps['updateItemsFn'] = undefined;
  @observable createItemsFn: IEntityProps['createItemsFn'] = undefined;
  @observable references: IEntityProps['references'] = {};
  @observable referenceData: Record<string, any> = {};
  @observable itemsPerPage: number[] = [5, 10, 15, 25, 50];
  @observable items: IEntityProps['items'] =
    this.itemsPerPage[this.itemsPerPage.length] || 50;
  @observable permissions: IEntityProps['permissions'] = {};
  // Built-in
  @observable isLoading: boolean = true;
  @observable totalCount: number = 0;
  @observable page: number = 0;
  @observable data: Record<string, any>[] = [];
  @observable error?: string | null;
  @observable sortBy: string = '';
  @observable sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS] =
    ENTITY_SORT_DIRS.ASC;
  @observable editorFieldErrors: Record<string, string> = {};
  @observable editorData: Record<string, any> = {};
  @observable selected: any[] = [];
  @observable filterData: Record<string, any> = {};

  constructor(fields?: Partial<IEntityProps>) {
    super();

    if (fields) {
      Object.assign(this, fields);
    }
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
  setSelected = (selected: any[]) => {
    this.selected = selected;
  };

  @action
  setSort = (field: string) => {
    if (field !== this.sortBy && this.sortDir !== ENTITY_SORT_DIRS.DESC) {
      this.sortDir = ENTITY_SORT_DIRS.DESC;
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

  getFilters = (): IEntityProps['filters'] =>
    (this.filters.length > 0 &&
      toJS(this.filters).filter((el) => el.name && el.value !== '')) ||
    [];

  applyFilter = () => {
    this.page = 0;
    this.fetchItems();
  };

  @action
  fetchItems = () => {
    this.fetchItemsCancel();

    this.fetchItemsInstance = flow(function* (this: Entity) {
      this.isLoading = true;
      this.error = '';
      this.selected = [];

      try {
        // loading entity
        if (!this.api?.list?.url || !this.fetchItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const filter = this.getFilters();

        const result: IEntityFetchFunctionResult = yield this.parent?.auth?.withToken(
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
        this.filterData = result?.filterData || {};
        this.totalCount = result?.data?.totalCount || 0;

        // Loading references (if any)
        const references = this.fields
          .filter(
            (field) =>
              field.type &&
              Object.prototype.hasOwnProperty.call(
                ENTITY_REFERENCE_FIELDS,
                field.type
              ) &&
              this.references[field.name]?.getMany
          )
          .map(async (field) => ({
            [field.name]: await this.references[field.name].getMany(this),
          }));

        const refResults = yield Promise.all(references);

        this.referenceData = refResults.reduce(
          (obj: Record<string, any>, res: Record<string, any>) => ({
            ...obj,
            ...res,
          }),
          {}
        );

        // updating field reference data
        this.fields = this.fields.map((field) =>
          this.referenceData[field.name]
            ? {
                ...field,
                options: { referenceData: this.referenceData[field.name] },
              }
            : field
        );

        // finished
        this.isLoading = false;
      } catch (e) {
        this.parent?.notifications.showError(e.message);
        this.isLoading = false;
      }
    }).bind(this)();
  };

  fetchItemsCancel = () => {
    try {
      if (this.fetchItemsInstance && this.fetchItemsInstance.cancel) {
        this.fetchItemsInstance.cancel();
      }
    } catch (e) {}
  };

  updateItemInstance?: CancellablePromise<any>;

  @action
  updateItem = () => {
    this.updateItemInstance = flow(function* (this: Entity) {
      this.isLoading = true;
      this.error = '';

      try {
        const data = toJS(this.editorData);

        if (!this.validateSubmitFields(data, false)) {
          throw new Error(ENTITY_ERRORS.INCORRECT_INPUT);
        }

        if (!this.api?.update?.url || !this.updateItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result: IEntityUpdateFunctionResult = yield this.parent?.auth?.withToken(
          this.updateItemsFn,
          {
            url: this.api?.update?.url || '',
            data,
          }
        );

        if (!result || result.error)
          throw new Error(result?.error || ENTITY_ERRORS.CANT_LOAD_ITEMS);

        this.fetchItems();

        if (this.parent?.history?.length && this.parent?.history.goBack) {
          this.parent?.history.goBack();
        } else if (this.parent?.history?.push) {
          this.parent?.history.push(this.menu.url);
        }
      } catch (e) {
        this.parent?.notifications.showError(e.message);
        this.isLoading = false;
      }
    }).bind(this)();
  };

  @action
  onEditCancel = () => {
    if (this.parent?.history?.length && this.parent?.history.goBack) {
      this.parent?.history.goBack();
    } else if (this.parent?.history?.push) {
      this.parent?.history.push(this.menu.url);
    }
  };

  @action
  createItem = () => {
    this.updateItemInstance = flow(function* (this: Entity) {
      this.isLoading = true;
      this.error = '';

      try {
        const data = toJS(this.editorData);

        if (!this.validateSubmitFields(data, true)) {
          throw new Error(ENTITY_ERRORS.INCORRECT_INPUT);
        }

        if (!this.api?.create?.url || !this.createItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result: IEntityCreateFunctionResult = yield this.parent?.auth?.withToken(
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
        this.parent?.notifications.showError(e.message);
        this.isLoading = false;
      }
    }).bind(this)();
  };

  @action
  resetFieldError = (field: string) => {
    delete this.editorFieldErrors[field];
  };

  isValidField = (field: IEntityField, value: any) =>
    (!field.required || field.type === 'boolean' || value === 0 || !!value) &&
    (!field.validator || !field.validator(value, this));

  @action
  validateSubmitFields = (
    data: Record<string, any>,
    isCreating = false
  ): boolean => {
    this.editorFieldErrors = this.fields
      .filter(
        (field) =>
          (isCreating && !field.hideInCreate) ||
          (!isCreating && !field.hideInEdit)
      )
      .reduce(
        (obj, field) =>
          this.isValidField(field, data[field.name])
            ? obj
            : {
                ...obj,
                [field.name]:
                  (field.validator && field.validator(data[field.name], this)) ||
                  ENTITY_ERRORS.FIELD_IS_REQUIRED,
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

      if (Object.keys(this.editorFieldErrors).length) {
        this.editorFieldErrors = {};
      }

      try {
        if (!this.api?.get?.url || !this.getItemsFn) {
          throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
        }

        const result: IEntityGetFunctionResult = yield this.parent?.auth?.withToken(
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
        this.parent?.notifications.showError(e.message);
        this.parent?.history.push(this.menu.url);
        this.isLoading = false;
      }
    }).bind(this)();
  };

  getItemsCancel = () => {
    try {
      if (this.getItemsInstance && this.getItemsInstance.cancel) {
        this.getItemsInstance.cancel();
      }
    } catch (e) {}
  };

  @action
  setEditorData = (data: Record<string, any>) => {
    this.editorData = data;
  };

  @action
  createEmptyItem = () => {
    this.editorData = {};
  };

  @computed
  get canEdit() {
    return (
      this.editable &&
      !!(
        !this.roles ||
        !this.permissions.update ||
        (this.parent?.auth?.user?.role &&
          this.permissions?.update?.includes(this.parent.auth?.user?.role))
      )
    );
  }

  @computed
  get canCreate() {
    return !!(
      !this.roles ||
      !this.permissions.create ||
      (this.parent?.auth?.user?.role &&
        this.permissions?.create?.includes(this.parent.auth?.user?.role))
    );
  }

  @action
  onMount = () => {
    this.getFiltersFromHash();
    reaction(
      () => [this.filters, this.sortBy, this.sortDir, this.page, this.items],
      this.setFiltersWindowHash
    );
    reaction(() => [this.items, this.sortBy, this.sortDir], this.applyFilter);
    reaction(() => this.page, this.fetchItems);
    this.fetchItems();
  };

  @action
  onUnmount = () => {
    this.fetchItemsCancel();
  };

  @observable
  exportData = async () => {
    if (!this.fetchItemsFn) return;

    const response = await this.parent?.auth?.withToken(this.fetchItemsFn, {
      url: this.api?.list?.url,
      filter: this.getFilters(),
      page: 0,
      count: 1000,
      sortDir: 'DESC',
      sortBy: 'id',
    });

    if (!response.data?.list) return;

    const fields = this.fields
      .filter((field) => !field.hideInExport)
      .map((field) => field.name);

    const rows = [
      fields,
      ...response.data.list.map((item: Record<string, any>) =>
        fields.reduce(
          (obj, field) => [...obj, '"' + String(item[field]) + '"'],
          [] as string[]
        )
      ),
    ];

    let csv =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    var uri = encodeURI(csv);

    saveAs(uri, `${this.title}.csv`);
  };

  @computed
  get ListHeadTitle() {
    return observer(() => (
      <Typography variant="h4" style={{ flex: 1 }}>
        {this.title}
      </Typography>
    ));
  }

  @computed
  get ListHeadButtons() {
    return observer(() => <></>);
  }

  @computed
  get ListHead() {
    return observer(() => (
      <EntityHead
        filterData={this.filterData}
        title={<this.ListHeadTitle />}
        buttons={<this.ListHeadButtons />}
        filters={this.filters}
        fields={this.fields}
        setFilters={this.setFilters}
        url={this.menu.url}
        applyFilter={this.applyFilter}
        withToken={this.parent?.auth?.withToken}
        onExport={this.exportData}
        canExport={this.exportable}
        canCreate={this.creatable && this.canCreate}
        entity={this}
      />
    ));
  }

  @computed
  get ListExtra():
    | (({
        id,
        onClose,
      }: {
        id: any;
        onClose: (id: any) => void;
      }) => JSX.Element)
    | null {
    return null;
  }

  @computed
  get ListBody() {
    return observer(() => (
      <EntityList
        fields={this.fields}
        data={this.data}
        extra={this.ListExtra}
        isLoading={this.isLoading}
        url={this.menu.url}
        selected={this.selected}
        sortBy={this.sortBy}
        sortDir={this.sortDir}
        canView={this.viewable}
        canEdit={this.editable && this.canEdit}
        canSelect={this.selectable}
        setSelected={this.setSelected}
        onSortChange={this.setSort}
        withToken={this.parent?.auth?.withToken}
        entity={this}
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
      <EntityListWrapper>
        <this.ListHead />
        <this.ListBody />
        <this.ListFooter />
      </EntityListWrapper>
    ));
  }

  @computed
  get Breadcrumbs() {
    return observer(
      ({
        id,
        isEditing = false,
        isCreating = false,
        buttons,
      }: {
        id?: any;
        isEditing?: boolean;
        isCreating?: boolean;
        buttons?: ReactElement;
      }) => (
        <EntityBreadcrumbs
          data={this.editorData}
          fields={this.fields}
          id={id}
          name={this.title}
          url={this.menu.url}
          isEditing={isEditing}
          isCreating={isCreating}
          buttons={buttons}
          viewable={this.viewable}
          editable={this.canEdit}
        />
      )
    );
  }

  @computed
  get ViewerHeadButtons() {
    return observer(({ id }: { id: any }) => <Fragment />);
  }

  @computed
  get ViewerHead() {
    return observer(({ id }: { id: any }) => (
      <this.Breadcrumbs id={id} buttons={<this.ViewerHeadButtons id={id} />} />
    ));
  }

  @computed
  get ViewerFooter() {
    return observer(({ id }: { id: any }) => <Fragment />);
  }

  @computed
  get ViewerBody() {
    return observer(({ id }: { id: string }) => (
      <EntityViewer
        id={id}
        fields={this.fields}
        url={this.menu.url}
        errors={this.editorFieldErrors}
        onSave={() => {}}
        onCancel={this.onEditCancel}
        onResetFieldError={this.resetFieldError}
        isEditing={false}
        isLoading={this.isLoading}
        setEditorData={this.setEditorData}
        data={this.editorData}
        getItem={this.getItem}
        cancelGetItem={this.getItemsCancel}
        withToken={this.parent?.auth?.withToken}
        viewable={this.viewable}
        entity={this}
      />
    ));
  }

  @computed
  get Viewer() {
    return observer(({ id }: { id: string }) => (
      <>
        <this.ViewerHead id={id} />
        <this.ViewerBody id={id} />
        <this.ViewerFooter id={id} />
      </>
    ));
  }

  @computed
  get EditorHeadButtons() {
    return observer(({ id }: { id: any }) => <Fragment />);
  }

  @computed
  get EditorHead() {
    return observer(({ id }: { id: any }) => (
      <this.Breadcrumbs
        id={id}
        buttons={<this.EditorHeadButtons id={id} />}
        isEditing
      />
    ));
  }

  @computed
  get EditorFooter() {
    return observer(({ id }: { id: any }) => <Fragment />);
  }

  @computed
  get EditorBody() {
    return observer(({ id }: { id: string }) => (
      <EntityViewer
        id={id}
        fields={this.fields}
        errors={this.editorFieldErrors}
        url={this.menu.url}
        onSave={this.updateItem}
        onCancel={this.onEditCancel}
        onResetFieldError={this.resetFieldError}
        isLoading={this.isLoading}
        setEditorData={this.setEditorData}
        data={this.editorData}
        getItem={this.getItem}
        cancelGetItem={this.getItemsCancel}
        withToken={this.parent?.auth?.withToken}
        viewable={this.viewable}
        entity={this}
        isEditing
      />
    ));
  }

  @computed
  get Editor() {
    return observer(({ id }: { id: string }) => (
      <>
        <this.EditorHead id={id} />
        <this.EditorBody id={id} />
        <this.EditorFooter id={id} />
      </>
    ));
  }

  @computed
  get CreatorHeadButtons() {
    return observer(() => <Fragment />);
  }

  @computed
  get CreatorHead() {
    return observer(() => (
      <this.Breadcrumbs buttons={<this.CreatorHeadButtons />} isCreating />
    ));
  }

  @computed
  get CreatorFooter() {
    return observer(() => <Fragment />);
  }

  @computed
  get CreatorBody() {
    return observer(() => (
      <EntityViewer
        fields={this.fields}
        errors={this.editorFieldErrors}
        url={this.menu.url}
        onSave={this.createItem}
        onCancel={this.onEditCancel}
        onResetFieldError={this.resetFieldError}
        isEditing
        isLoading={this.isLoading}
        setEditorData={this.setEditorData}
        data={this.editorData}
        getItem={this.createEmptyItem}
        cancelGetItem={this.getItemsCancel}
        viewable={this.viewable}
        withToken={this.parent?.auth?.withToken}
        entity={this}
      />
    ));
  }

  @computed
  get Creator() {
    return observer(({ id }: { id: string }) => (
      <>
        <this.CreatorHead />
        <this.CreatorBody />
        <this.CreatorFooter />
      </>
    ));
  }

  @computed
  get output() {
    return observer(() => (
      <Provider entity={this}>
        <Switch>
          <Route path={`${this.menu.url}/create`} component={this.Creator} />
          <Route
            path={`${this.menu.url}/:id/edit`}
            component={({
              match: {
                params: { id },
              },
            }: RouteComponentProps<{ id: string }>) => <this.Editor id={id} />}
          />
          <Route
            path={`${this.menu.url}/:id/`}
            component={({
              match: {
                params: { id },
              },
            }: RouteComponentProps<{ id: string }>) => <this.Viewer id={id} />}
          />
          <Route path={this.menu.url} component={this.List} />
        </Switch>
      </Provider>
    ));
  }

  @action
  setFiltersWindowHash = () => {
    const filters = this.getFilters().reduce(
      (obj, filter) => ({ ...obj, [filter.name]: filter.value }),
      {}
    );

    const params = new URLSearchParams({
      ...filters,
      _page: this.page.toString(),
      _sortBy: this.sortBy.toString(),
      _sortDir: this.sortDir.toString(),
      _items: this.items.toString(),
    });

    window.location.hash = params.toString();
  };

  @action
  getFiltersFromHash = () => {
    const hash = window.location.hash.slice(1, window.location.hash.length);
    const query = parseQuery(hash);
    const filters: IFilterValue[] = this.fields
      .filter(
        (field) => field.filterable && Object.keys(query).includes(field.name)
      )
      .map((field) => ({ value: query[field.name], name: field.name }));

    this.setFilters(filters);

    if (query._page && parseInt(query._page)) {
      this.page = parseInt(query._page);
    }

    if (query._sortDir && ['asc', 'desc'].includes(query._sortDir)) {
      this.sortDir = query._sortDir === 'asc' ? 'asc' : 'desc';
    }

    if (
      query._sortBy &&
      this.fields.some((field) => field.name === query._sortBy)
    ) {
      this.sortBy = query._sortBy;
    }

    if (query._items && parseInt(query._items)) {
      this.items = parseInt(query._items);
    }
  };
}
