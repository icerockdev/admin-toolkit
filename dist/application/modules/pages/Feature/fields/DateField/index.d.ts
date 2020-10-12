/// <reference types="react" />
import { FeatureField } from '../FeatureField';
export declare type DateFieldParser = (val: string) => Date;
export declare type DateFieldFormatter = (val: Date) => string;
export declare type DateFieldOptions<T> = FeatureField<T, string>['options'] & {
    parser?: DateFieldParser;
    formatter?: DateFieldFormatter;
    format?: string;
    filterExact?: boolean;
};
export declare class DateField<T extends Record<string, any> = Record<string, any>> extends FeatureField<T, string> {
    constructor(name: FeatureField['name'], { parser, format: dateFormat, formatter, filterExact, ...options }: DateFieldOptions<T>);
    filterExact: boolean;
    dateFormat: string;
    parser: DateFieldParser;
    formatter: DateFieldFormatter;
    formatValue(val: string): string;
    asString(val: string): string;
    List: FeatureField['List'];
    get Update(): JSX.Element;
    Filter: FeatureField['Filter'];
}
