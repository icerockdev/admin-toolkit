import { FeatureDataReference } from '../../types/reference';
import { FeatureApiReferences } from '../../types';
import { Feature } from '../..';
export declare class FeatureData<Fields extends Record<string, any> = Record<string, any>> {
    private feature;
    constructor(feature: Feature<Fields>);
    /**
     * FeatureApi's references dictionary (see this.createReferenceData)
     */
    references: Partial<Record<keyof Fields, FeatureDataReference>>;
    isLoading: boolean;
    /**
     * Values for list
     */
    list: Fields[];
    /**
     * Values for single item display
     */
    read: Partial<Record<keyof Fields, Fields[keyof Fields]>>;
    /**
     * Current editor values, copied from read before create/update form appears
     */
    editor: Partial<Record<keyof Fields, Fields[keyof Fields]>>;
    /**
     * Validation error dictionary
     */
    errors: Partial<Record<keyof Fields, string>>;
    /**
     * Creates editor[fieldname] reference instance for refs from FeatureApi
     * @param refs
     */
    createReferenceData(refs?: FeatureApiReferences<Fields>): void;
    clearReadData(): void;
    clearEditorData(): void;
    /**
     * Sets editor data from current item data, fetched from backend
     */
    copyReadToEditor(): void;
    clearErrors(): void;
    clearError(field: keyof Fields): void;
    /**
     * Data fields, only for current mode (update/create), based on field and feature
     * roles and permissions
     */
    get editorDataForCurrentMode(): Fields;
}
