/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature, IPageProps, UserRole } from '../../../..';
import { FeatureField } from '../fields';
import { FeatureRendererProps } from './renderer';
import { FeatureRenderer } from '../items';
import { FeatureApiProps } from './api';
export declare enum FeatureMode {
    list = "list",
    read = "read",
    update = "update",
    create = "create"
}
export declare enum FeatureFeature {
    list = "list",
    read = "read",
    update = "update",
    create = "create",
    delete = "delete",
    export = "export"
}
export declare type FeatureFeatures = Partial<Record<FeatureFeature, boolean>>;
export interface FeatureOptions<Fields extends Record<string, any> = Record<string, any>> extends Partial<IPageProps> {
    getItemTitle?: (fields: Fields) => string;
    fields: FeatureField<Fields>[];
    features: FeatureFeatures;
    containers?: FeatureRendererProps['containers'];
    components?: FeatureRendererProps['components'];
    renderer: FeatureRenderer<Feature<Fields>>;
    api?: FeatureApiProps<Fields>;
    permissions?: Partial<Record<FeatureFeature, UserRole[]>>;
    rows?: number;
}
export declare enum SortDir {
    ASC = "asc",
    DESC = "desc"
}
