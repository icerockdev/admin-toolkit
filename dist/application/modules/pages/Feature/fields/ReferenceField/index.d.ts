/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/// <reference types="react" />
import { SelectField, SelectFieldOptions } from '../SelectField';
export declare type ReferenceFieldOptions<T, V extends string | number = string> = SelectFieldOptions<T, V> & {
    dependencies?: Array<string>;
};
export declare class ReferenceField<T extends Record<string, any> = Record<string, any>, V extends string | number = string> extends SelectField<T, V> {
    name: string;
    options: ReferenceFieldOptions<T, V>;
    constructor(name: string, options: ReferenceFieldOptions<T, V>);
    autocomplete: boolean;
    get isLoading(): boolean;
    get listVariants(): Record<any, any>;
    get List(): ({ value }: {
        value: any;
    }) => JSX.Element;
    get Update(): JSX.Element;
    get disabledByDependencies(): boolean | undefined;
    updateRefs(): void;
    get dependencyValues(): (Record<keyof T, T[keyof T]>[string] | undefined)[] | undefined;
}
