import { FeatureField } from '../FeatureField';
export declare type IntegerFieldOptions<T, V> = FeatureField<T, V>['options'] & {
    filterExact?: boolean;
    accuracy?: number;
    preserveZero?: boolean;
};
export declare class IntegerField<T extends Record<string, any> = Record<string, any>> extends FeatureField<T, number> {
    name: FeatureField['name'];
    options: IntegerFieldOptions<T, number>;
    constructor(name: FeatureField['name'], options?: IntegerFieldOptions<T, number>);
    filterExact: boolean;
    accuracy: number;
    preserveZero: boolean;
    defaultValue: number;
    formatValue(val: any): number;
    asString(val: string): number;
    List: FeatureField['List'];
}
