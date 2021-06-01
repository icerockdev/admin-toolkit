/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureField } from '../FeatureField';
export declare type SelectFieldOptions<T, V extends string | number> = FeatureField<T, V>['options'] & {
    options?: Record<V, any>;
    autocomplete?: boolean;
};
export declare class SelectField<T extends Record<string, any> = Record<string, any>, V extends string | number = string> extends FeatureField<T, V> {
    name: FeatureField['name'];
    options: SelectFieldOptions<T, V>;
    constructor(name: FeatureField['name'], options?: SelectFieldOptions<T, V>);
    variants: Record<any, any>;
    autocomplete: boolean;
    get listVariants(): Record<any, any>;
    get filterVariants(): Record<any, any>;
    formatValue(val: any): any;
    asString(val: string): any;
    get List(): ({ value }: {
        value: any;
    }) => JSX.Element;
    get Update(): JSX.Element;
    Filter: FeatureField['Filter'];
}
