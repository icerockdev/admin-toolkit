/// <reference types="react" />
import { SelectField } from '../SelectField';
export declare class ReferenceField<T extends Record<string, any> = Record<string, any>, V extends string | number = string> extends SelectField<T, V> {
    autocomplete: boolean;
    get isLoading(): boolean;
    get listVariants(): Record<any, any>;
    get List(): ({ value }: {
        value: any;
    }) => JSX.Element;
    get Update(): JSX.Element;
}
