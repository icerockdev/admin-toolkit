/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/// <reference types="react" />
import { Feature } from '../..';
import { FeatureField } from '../../fields/FeatureField';
import { SortDir } from '../../types';
export declare class FeatureFilters<F extends Record<string, any> = Record<string, any>> {
    feature: Feature<F>;
    constructor(feature: Feature<F>);
    value: Record<string, any>;
    selected: string[];
    count: number;
    rows: number;
    rowsSelectOptions: number[];
    page: number;
    sortBy?: string;
    sortDir?: SortDir;
    get fields(): Record<string, FeatureField<F>>;
    get fieldsList(): FeatureField<F>[];
    get valuesForList(): Record<string, string>;
    get Filters(): JSX.Element;
    /**
     * Makes url for current set of filters for current feature
     */
    get queryString(): string;
    /**
     * Gets filters from url
     */
    restoreFilters: () => void;
    /**
     * Changes current url to has parseable filters
     */
    persistFilters: () => void;
}
