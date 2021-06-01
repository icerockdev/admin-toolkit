/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ReactElement } from 'react';
import { ENTITY_SORT_DIRS, IEntityField, IEntityProps } from '../../..';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Page } from '../Page';
export declare class Entity extends Page {
    api: IEntityProps['api'];
    fields: IEntityProps['fields'];
    filters: IEntityProps['filters'];
    editable: IEntityProps['editable'];
    viewable: IEntityProps['viewable'];
    creatable: IEntityProps['creatable'];
    exportable: IEntityProps['exportable'];
    selectable: IEntityProps['selectable'];
    getItemsFn: IEntityProps['getItemsFn'];
    fetchItemsFn: IEntityProps['fetchItemsFn'];
    updateItemsFn: IEntityProps['updateItemsFn'];
    createItemsFn: IEntityProps['createItemsFn'];
    references: IEntityProps['references'];
    referenceData: Record<string, any>;
    itemsPerPage: number[];
    items: IEntityProps['items'];
    permissions: IEntityProps['permissions'];
    isLoading: boolean;
    totalCount: number;
    page: number;
    data: Record<string, any>[];
    error?: string | null;
    sortBy: string;
    sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
    editorFieldErrors: Record<string, string>;
    editorData: Record<string, any>;
    selected: any[];
    filterData: Record<string, any>;
    constructor(fields?: Partial<IEntityProps>);
    setFilters: (filters: IEntityProps['filters']) => void;
    setPage: (page: number) => void;
    setPerPage: (items: number) => void;
    setSelected: (selected: any[]) => void;
    setSort: (field: string) => void;
    fetchItemsInstance?: CancellablePromise<any>;
    getFilters: () => IEntityProps['filters'];
    applyFilter: () => void;
    fetchItems: () => void;
    fetchItemsCancel: () => void;
    updateItemInstance?: CancellablePromise<any>;
    updateItem: () => void;
    onEditCancel: () => void;
    createItem: () => void;
    resetFieldError: (field: string) => void;
    isValidField: (field: IEntityField, value: any) => boolean;
    validateSubmitFields: (data: Record<string, any>, isCreating?: boolean) => boolean;
    getItemsInstance?: CancellablePromise<any>;
    getItem: (id: any) => void;
    getItemsCancel: () => void;
    setEditorData: (data: Record<string, any>) => void;
    createEmptyItem: () => void;
    get canList(): boolean;
    get canView(): boolean;
    get canCreate(): boolean;
    get canEdit(): boolean;
    get canExport(): boolean;
    onMount: () => void;
    onUnmount: () => void;
    exportData: () => Promise<void>;
    get ListHeadTitle(): () => JSX.Element;
    get ListHeadButtons(): () => JSX.Element;
    get ListHead(): () => JSX.Element;
    get ListExtra(): (({ id, onClose, }: {
        id: any;
        onClose: (id: any) => void;
    }) => JSX.Element) | null;
    get ListBody(): () => JSX.Element;
    get ListFooter(): () => JSX.Element;
    get List(): () => JSX.Element;
    get Breadcrumbs(): ({ id, isEditing, isCreating, buttons, }: {
        id?: any;
        isEditing?: boolean | undefined;
        isCreating?: boolean | undefined;
        buttons?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    }) => JSX.Element;
    get ViewerHeadButtons(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get ViewerHead(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get ViewerFooter(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get ViewerBody(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get Viewer(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get EditorHeadButtons(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get EditorHead(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get EditorFooter(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get EditorBody(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get Editor(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get CreatorHeadButtons(): () => JSX.Element;
    get CreatorHead(): () => JSX.Element;
    get CreatorFooter(): () => JSX.Element;
    get CreatorBody(): () => JSX.Element;
    get Creator(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get output(): () => JSX.Element;
    setFiltersWindowHash: () => void;
    getFiltersFromHash: () => void;
}
