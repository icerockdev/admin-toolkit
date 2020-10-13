import { FC } from 'react';
import { FeatureFieldFeature, FeatureFieldListProps, FeatureFieldProps } from '../../types/field';
import { Feature } from '../..';
import { FeatureFeature } from '../../types';
export declare class FeatureField<T extends Record<string, any> = Record<string, any>, V extends any = any> {
    name: string;
    options: FeatureFieldProps<T, V>;
    constructor(name: string, options?: FeatureFieldProps<T, V>);
    path: string[];
    protected feature?: Feature<T>;
    roles?: FeatureFieldProps<T, V>['roles'];
    permissions?: FeatureFieldProps<T, V>['permissions'];
    listColumnSize: string;
    allowEmptyFilter: boolean;
    features: Record<FeatureFieldFeature, boolean>;
    validator?: FeatureFieldProps<T, V>['validator'];
    defaultValue?: V;
    get label(): string;
    get key(): string;
    useFeature(feature: Feature<T>): void;
    onChange: (val: any) => void;
    List: FC<FeatureFieldListProps>;
    ListHead: FC;
    get Read(): JSX.Element;
    get Update(): JSX.Element;
    get Create(): JSX.Element;
    Filter: FC<{
        inline?: boolean;
    }>;
    onFilterChange: (value: any) => void;
    onFilterReset: () => void;
    get filterValue(): unknown;
    get readValue(): V;
    get editValue(): V;
    get editError(): string;
    /**
     * List of features, available for current user role by field.features,
     * field.roles and field.permissions
     */
    get featuresOfCurrentUser(): Record<FeatureFeature, boolean>;
    resetErrorIfAny(): void;
    get fieldPath(): string[];
}
