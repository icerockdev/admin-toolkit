/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature } from '..';
import { FeatureFeature } from './index';
import { FeatureReferenceProps } from './reference';
export declare type FeatureApiUrls = Partial<Record<FeatureFeature, string>>;
export declare type FeatureApiHost = string;
export declare type FeatureApiReferences<T> = Partial<Record<keyof T, FeatureReferenceProps>>;
export declare type FeatureApiProps<T> = {
    urls?: FeatureApiUrls;
    methods?: FeatureApiMethods<T>;
    references?: FeatureApiReferences<T>;
};
export declare type FeatureApiMethodProps = {
    feature: Feature;
    url: string;
    authorization: string;
};
export declare type FeatureGetListProps = FeatureApiMethodProps & {
    filters: Record<string, string>;
    sortBy: string;
    sortDir: string;
    limit: number;
    offset: number;
};
export declare type FeatureGetReadProps = FeatureApiMethodProps & {
    id: any;
};
export declare type FeaturePostCreateProps<Fields> = FeatureApiMethodProps & {
    data: Fields;
};
export declare type FeaturePostUpdateProps<Fields> = FeaturePostCreateProps<Fields> & {
    id: any;
};
export declare type FeatureDeleteProps = FeatureGetReadProps;
export declare type FeatureGetListResult<Fields> = {
    data: Fields[];
    count: number;
    status?: number;
};
export declare type FeatureGetReadResult<Fields> = {
    data: Fields;
    status?: number;
};
export declare type FeaturePostCreateResult<Fields> = {
    data: Fields;
    status?: number;
    errors?: Record<keyof Fields, string>;
};
export declare type FeaturePostUpdateResult<T> = FeaturePostCreateResult<T>;
export declare type FeatureApiMethodList<T> = (props: FeatureGetListProps) => Promise<FeatureGetListResult<T>>;
export declare type FeatureApiMethodGet<T> = (props: FeatureGetReadProps) => Promise<FeatureGetReadResult<T>>;
export declare type FeatureApiMethodCreate<T> = (props: FeaturePostCreateProps<T>) => Promise<FeaturePostCreateResult<T>>;
export declare type FeatureApiMethodUpdate<T> = (props: FeaturePostUpdateProps<T>) => Promise<FeaturePostUpdateResult<T>>;
export declare type FeatureApiMethodDelete<T> = (props: FeatureDeleteProps) => Promise<void>;
export interface FeatureApiMethods<T> {
    list?: FeatureApiMethodList<T>;
    read?: FeatureApiMethodGet<T>;
    create?: FeatureApiMethodCreate<T>;
    update?: FeatureApiMethodUpdate<T>;
    delete?: FeatureApiMethodDelete<T>;
}
