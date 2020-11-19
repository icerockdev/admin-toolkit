/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/// <reference types="react" />
import { Page } from '../Page';
import { FeatureApi } from './items/FeatureApi';
import { FeatureRenderer } from './items/FeatureRenderer';
import { FeatureFeature, FeatureMode, FeatureOptions } from './types';
import { FeatureField } from './fields/FeatureField';
import { FeatureData } from './items/FeatureData';
import { FeatureController } from './items/FeatureController';
import { FeatureFilters } from './items/FeatureFilters';
export declare class Feature<Fields extends Record<string, any> = Record<string, any>> extends Page {
    title: string;
    url: string;
    constructor(title: string, url: string, options?: Partial<FeatureOptions<Fields>>);
    permissions?: FeatureOptions['permissions'];
    options: Partial<FeatureOptions<Fields>>;
    features: FeatureOptions['features'];
    renderer: FeatureRenderer;
    data: FeatureData<Fields>;
    mode?: FeatureMode;
    filters: FeatureFilters<Fields>;
    controller: FeatureController<Fields>;
    api: FeatureApi<Fields>;
    /**
     * Array of fields, coming from props
     */
    fieldsList: FeatureField<Fields>[];
    /**
     * Sets this feature in each field
     */
    attachFeatureToFields(): void;
    get isEditing(): boolean;
    /**
     * Custom function, that returns single item's id, can be overriden by
     * Feature's props
     * TODO: use it everywhere (currently not using)
     */
    getItemId: (fields: Fields) => any;
    /**
     * Custom function, that returns single item's title, can be overriden by
     * Feature's props
     */
    getItemTitle: (fields: Fields) => string;
    /**
     * Record<name, field> of fields
     */
    get fields(): Record<keyof Fields, FeatureField<Fields, any>>;
    /**
     * Returns only fields, that should be displayed / validated on current mode
     */
    get fieldsOfCurrentMode(): FeatureField<Fields, any>[];
    /**
     * Main renderer
     */
    get output(): () => JSX.Element;
    /**
     * Proper react-router history
     */
    get history(): import("history").History<import("history").History.PoorMansUnknown> | undefined;
    /**
     * Redirects to list of items
     */
    goToList: () => void;
    /**
     * Redirects to specific item
     */
    goToRead: (id: any) => void;
    /**
     * Redirects to specific item editor
     */
    goToUpdate: (id: any) => void;
    /**
     * Redirects to specific item editor
     */
    goToCreate: () => void;
    /**
     * Clears data on editing cancel
     */
    cancelEditing: () => void;
    /**
     * Called when page, count, sort or filter changed.
     */
    private onFilterChange;
    /**
     * Features, available for current user
     */
    get availableFeatures(): Record<FeatureFeature, boolean>;
}
