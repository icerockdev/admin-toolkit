import { FeatureField } from '../fields/FeatureField';
import { UserRole } from '../../../..';
export declare enum FeatureFieldFeature {
    create = "create",
    read = "read",
    update = "update",
    list = "list",
    filter = "filter",
    sort = "sort"
}
export declare type FeatureFieldProps<T, V> = {
    label?: string;
    required?: boolean;
    roles?: UserRole[];
    permissions?: Partial<Record<FeatureFieldFeature, UserRole[]>>;
    validator?: (val: V, field: FeatureField<T, V>) => string | null | undefined;
    features?: Partial<Record<FeatureFieldFeature, boolean>>;
    listColumnSize?: string;
    allowEmptyFilter?: boolean;
    defaultValue?: V;
    path?: string[];
};
export declare type FeatureFieldListProps<T extends any = any> = {
    value: T;
};
export declare type FeatureInputProps<T extends any = any> = {
    value?: T;
    label: string;
    onChange: (val?: T) => void;
    disabled?: boolean;
    error?: string;
    isLoading?: boolean;
};
