/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature } from '../..';
import { CancellablePromise } from 'mobx/lib/api/flow';
export declare class FeatureController<T extends Record<string, any> = Record<string, any>> {
    feature: Feature<T>;
    constructor(feature: Feature<T>);
    /**
     * Map for all currently running async fetchers, that can be cancelled by
     * calling item.cancel() or this.cancelAll()
     */
    instances: Record<string, CancellablePromise<any>>;
    /**
     * Loads list of items
     */
    beforeListMode: () => void;
    /**
     * Loads data of currently viewing item
     */
    beforeReadMode: () => void;
    /**
     * Loads data of currently editing item
     */
    beforeUpdateMode: () => void;
    /**
     * Clears current data and loading references on create form
     */
    beforeCreateMode: () => Promise<void>;
    /**
     * Deletes current item
     */
    delete: () => void;
    /**
     * Cancels all currently loading functions
     */
    cancelAll: () => void;
    /**
     * Returns id of currently editing / viewing item
     */
    getIdFromUrl: () => number;
    /**
     * Called on action (list, read, update, create) change
     */
    onActionChange: () => void | Promise<void>;
    /**
     * Called on submit of editor / creator. Handles validation and launching submitting function for each mode
     */
    submitItem: () => void;
    /**
     * Returns list of validation errors for currently visible fields
     */
    validateFields: () => Partial<Record<keyof T, string>> | undefined;
    seedData(): void;
}
