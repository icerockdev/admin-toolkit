/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { IEntityProps, ENTITY_SORT_DIRS } from '../../types/entity';
import { Page } from '../Page';
import { CancellablePromise } from 'mobx/lib/api/flow';
export declare class Entity extends Page {
    api: IEntityProps['api'];
    fields: IEntityProps['fields'];
    filters: IEntityProps['filters'];
    editable: IEntityProps['editable'];
    viewable: IEntityProps['viewable'];
    selectable: IEntityProps['selectable'];
    getItemsFn: IEntityProps['getItemsFn'];
    fetchItemsFn: IEntityProps['fetchItemsFn'];
    updateItemsFn: IEntityProps['updateItemsFn'];
    createItemsFn: IEntityProps['createItemsFn'];
    isLoading: boolean;
    itemsPerPage: number[];
    items: number;
    totalCount: number;
    page: number;
    data: Record<string, any>[];
    error?: string | null;
    sortBy: string;
    sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
    editorFieldErrors: Record<string, string>;
    editorData: Record<string, any>;
    selected: any[];
    constructor(fields?: Partial<IEntityProps>);
    setFilters: (filters: import("../../types/entity").IFilterValue[]) => void;
    setPage: (page: number) => void;
    setPerPage: (items: number) => void;
    setSelected: (selected: any[]) => void;
    setSort: (field: string) => void;
    fetchItemsInstance?: CancellablePromise<any>;
    fetchItems: () => void;
    fetchItemsCancel: () => void;
    updateItemInstance?: CancellablePromise<any>;
    updateItem: () => void;
    createItem: () => void;
    resetFieldError: (field: string) => void;
    validateSubmitFields: (data: Record<string, any>) => boolean;
    getItemsInstance?: CancellablePromise<any>;
    getItem: (id: any) => void;
    getItemsCancel: () => void;
    setEditorData: (data: Record<string, any>) => void;
    createEmptyItem: () => void;
    get canEdit(): boolean;
    get canCreate(): boolean;
    onMount: () => void;
    onUnmount: () => void;
    get ListHead(): () => JSX.Element;
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
    }) => null;
    get ViewerHead(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get ViewerFooter(): ({ id }: {
        id: any;
    }) => null;
    get ViewerBody(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get Viewer(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get EditorHeadButtons(): ({ id }: {
        id: any;
    }) => null;
    get EditorHead(): ({ id }: {
        id: any;
    }) => JSX.Element;
    get EditorFooter(): ({ id }: {
        id: any;
    }) => null;
    get EditorBody(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get Editor(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get CreatorHeadButtons(): () => null;
    get CreatorHead(): () => JSX.Element;
    get CreatorFooter(): () => null;
    get CreatorBody(): () => JSX.Element;
    get Creator(): ({ id }: {
        id: string;
    }) => JSX.Element;
    get output(): () => JSX.Element;
}
