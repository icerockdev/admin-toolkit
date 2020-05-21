/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/// <reference types="styled-jsx" />
/// <reference types="@emotion/core" />
import { IPageProps } from './page';
import { FC } from 'react';
import { Entity } from '../modules';
export declare const ENTITY_FIELD_RENDERS: {
    string: FC<{
        label: string;
        value: any;
        error?: string | undefined;
        isEditing?: boolean | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        handler?: ((val: any) => void) | undefined;
    } & Record<string, any>>;
    date: FC<{
        label: string;
        value: any;
        isEditing?: boolean | undefined;
        error?: string | undefined;
        handler?: ((val: any) => void) | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
    datetime: FC<{
        label: string;
        value: any;
        isEditing?: boolean | undefined;
        error?: string | undefined;
        handler?: ((val: any) => void) | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
    boolean: FC<{
        label: string;
        value: any;
        isEditing?: boolean | undefined;
        error?: string | undefined;
        handler?: ((val: any) => void) | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
    select: FC<{
        label: string;
        value: any;
        isEditing?: boolean | undefined;
        handler?: ((val: any) => void) | undefined;
        error?: string | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        options?: Record<any, any> | undefined;
    } & Record<string, any>>;
    phone: FC<{
        label: string;
        value: any;
        isEditing?: boolean | undefined;
        handler?: ((val: any) => void) | undefined;
        error?: string | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
    richtext: FC<{
        label: string;
        value: any;
        isEditing?: boolean | undefined;
        handler?: ((val: any) => void) | undefined;
        error?: string | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
    base64image: import("react").ComponentType<Pick<{
        classes: Record<"label" | "image" | "formControl" | "outlinedInput" | "preview", string>;
    } & {
        label: string;
        value: any;
        error?: string | undefined;
        isEditing?: boolean | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        handler?: ((val: any) => void) | undefined;
        options?: Record<any, any> | undefined;
    } & Record<string, any>, string> & import("@material-ui/styles").StyledComponentProps<"label" | "image" | "formControl" | "outlinedInput" | "preview">>;
    number: FC<{
        label: string;
        value: any;
        error?: string | undefined;
        isEditing?: boolean | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        handler?: ((val: any) => void) | undefined;
        options?: {
            accuracy?: number | undefined;
        } | undefined;
    } & Record<string, any>>;
    referenceSelect: FC<{
        label: string;
        value: any;
        isEditing?: boolean | undefined;
        handler?: ((val: any) => void) | undefined;
        error?: string | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        options?: Record<any, any> | undefined;
    } & Record<string, any>>;
};
export declare const ENTITY_REFERENCE_FIELDS: {
    referenceSelect: boolean;
};
export declare const getEntityFieldRenderer: (type?: string) => FC<any>;
export declare const ENTITY_SORT_DIRS: Record<string, 'asc' | 'desc'>;
export declare const ENTITY_FILTER_TYPES: {
    TEXT: string;
    SELECT: string;
    NUMBER: string;
    DATE: string;
};
export declare const ENTITY_ACTIONS: {
    CREATE: string;
    GET: string;
    LIST: string;
    DELETE: string;
    UPDATE: string;
};
export declare const ENTITY_ERRORS: {
    CANT_UPDATE_ITEM: string;
    CANT_LOAD_ITEMS: string;
    FIELD_IS_REQUIRED: string;
    INCORRECT_INPUT: string;
};
export interface IEntityField {
    name: string;
    label?: string;
    title?: boolean;
    type: keyof typeof ENTITY_FIELD_RENDERS | 'custom';
    sortable?: boolean;
    filterable?: boolean;
    required?: boolean;
    validator?: (val: any) => string;
    options?: Record<any, any>;
    component?: FC<any>;
    hideInList?: boolean;
    hideInEdit?: boolean;
    hideInCreate?: boolean;
    hideInExport?: boolean;
}
export interface IFilterValue {
    name: string;
    value: any;
}
export interface IEntityProps extends IPageProps {
    fields: IEntityField[];
    editable: boolean;
    viewable: boolean;
    creatable: boolean;
    selectable: boolean;
    exportable: boolean;
    items: number;
    filters: IFilterValue[];
    references: Record<string, IEntityReferenceProps>;
    api?: Record<typeof ENTITY_ACTIONS[keyof typeof ENTITY_ACTIONS], {
        url: string;
        method: string;
    }>;
    fetchItemsFn?: IEntityFetchFunction;
    updateItemsFn?: IEntityUpdateFunction;
    createItemsFn?: IEntityCreateFunction;
    getItemsFn?: IEntityGetFunction;
}
export interface IEntityFetchFunctionProps {
    url: string;
    page?: number;
    filter?: IFilterValue[];
    sortBy: string;
    sortDir: string;
    count?: number;
    token?: string;
}
export interface IEntityFetchFunctionResult {
    data: {
        list: Record<string, any>[];
        totalCount?: number;
    };
    filterData?: Record<string, any>;
    error?: string;
}
export declare type IEntityFetchFunction = (props: IEntityFetchFunctionProps) => Promise<IEntityFetchFunctionResult>;
export interface IEntityUpdateFunctionProps {
    url: string;
    id: any;
    token?: string;
    data: Record<string, any>;
}
export interface IEntityUpdateFunctionResult {
    data: Record<string, any>;
    error?: string;
}
export declare type IEntityUpdateFunction = (props: IEntityUpdateFunctionProps) => Promise<IEntityUpdateFunctionResult>;
export interface IEntityCreateFunctionProps {
    url: string;
    token?: string;
    data: Record<string, any>;
}
export interface IEntityCreateFunctionResult {
    data: Record<string, any>;
    error?: string;
}
export declare type IEntityCreateFunction = (props: IEntityCreateFunctionProps) => Promise<IEntityCreateFunctionResult>;
export interface IEntityGetFunctionProps {
    url: string;
    token?: string;
    id: any;
}
export interface IEntityGetFunctionResult {
    data: Record<string, any>;
    error?: string;
}
export declare type IEntityGetFunction = (props: IEntityGetFunctionProps) => Promise<IEntityGetFunctionResult>;
export declare type IEntityReferenceProps = {
    getMany: (entity: Entity) => Promise<Record<string, any>>;
    getOne?: (id: any) => Promise<Record<string, any>>;
};
