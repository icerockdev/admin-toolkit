/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/// <reference types="react" />
/// <reference types="styled-jsx" />
/// <reference types="@emotion/core" />
import { IPageProps } from './page';
export declare const ENTITY_FIELD_RENDERS: {
    string: import("react").FC<{
        value: any;
        isEditing?: boolean | undefined;
        handler?: ((val: any) => void) | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
    date: import("react").FC<{
        value: any;
        isEditing?: boolean | undefined;
        handler?: ((val: any) => void) | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
    boolean: import("react").FC<{
        value: any;
        isEditing?: boolean | undefined;
        handler?: ((val: any) => void) | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & Record<string, any>>;
};
export declare const getEntityFieldRenderer: (type?: string) => import("react").FC<{
    value: any;
    isEditing?: boolean | undefined;
    handler?: ((val: any) => void) | undefined;
    onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
} & Record<string, any>> | import("react").FC<{
    value: any;
    isEditing?: boolean | undefined;
    handler?: ((val: any) => void) | undefined;
    onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
} & Record<string, any>> | import("react").FC<{
    value: any;
    isEditing?: boolean | undefined;
    handler?: ((val: any) => void) | undefined;
    onClick?: ((event: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
} & Record<string, any>>;
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
    CANT_LOAD_ITEMS: string;
};
export interface IEntityField {
    name: string;
    label?: string;
    title?: boolean;
    type: string;
    sortable?: boolean;
    editor?: {
        enabled?: boolean;
        required?: boolean;
    };
    viewer?: {
        enabled?: boolean;
    };
}
export interface IEntityFilterField {
    name: string;
    label?: string;
    type: typeof ENTITY_FILTER_TYPES[keyof typeof ENTITY_FILTER_TYPES];
    variants?: {
        label: string | number;
        value: string;
    }[];
}
export interface IEntityProps extends IPageProps {
    fields: IEntityField[];
    editable: boolean;
    viewable: boolean;
    creatable: boolean;
    filters: {
        current: string;
        value: any;
        fields: IEntityFilterField[];
    };
    api?: Record<typeof ENTITY_ACTIONS[keyof typeof ENTITY_ACTIONS], {
        url: string;
        method: string;
    }>;
    fetchItemsFn?: IEntityFetchFunction;
    updateItemsFn?: IEntityUpdateFunction;
    createItemsFn?: IEntityCreateFunction;
}
export interface IEntityFetchFunctionProps {
    url: string;
    page?: number;
    filter?: {
        name?: string;
        value?: any;
    } | null;
    sortBy: string;
    sortDir: string;
    count?: number;
}
export interface IEntityFetchFunctionResult {
    data: {
        list: Record<string, any>[];
        totalCount?: number;
    };
    error?: string;
}
export declare type IEntityFetchFunction = (props: IEntityFetchFunctionProps) => Promise<IEntityFetchFunctionResult>;
export interface IEntityUpdateFunctionProps {
    url: string;
    id: any;
    data: Record<string, any>;
}
export interface IEntityUpdateFunctionResult {
    data: Record<string, any>;
    error?: string;
}
export declare type IEntityUpdateFunction = (props: IEntityUpdateFunctionProps) => Promise<IEntityUpdateFunctionResult>;
export interface IEntityCreateFunctionProps {
    url: string;
    id: any;
    data: Record<string, any>;
}
export interface IEntityCreateFunctionResult {
    data: Record<string, any>;
    error?: string;
}
export declare type IEntityCreateFunction = (props: IEntityUpdateFunctionProps) => Promise<IEntityUpdateFunctionResult>;
