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
    name: FeatureField['name'];
    options: DateFieldOptions<T>;
    constructor(name: FeatureField['name'], options?: DateFieldOptions<T>);
    filterExact: boolean;
    dateFormat: string;
    parser: DateFieldParser;
    formatter: DateFieldFormatter;
    formatValue(val: string): string;
    asString(val: string): string;
    get List(): FeatureField['List'];
    get Update(): JSX.Element;
    Filter: FeatureField['Filter'];
}
